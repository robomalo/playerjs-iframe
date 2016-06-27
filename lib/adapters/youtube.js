import BaseAdapter from './base';
import getScript from '../util/get-script';
import debug from '../util/debug';
import ENUMS from '../enums';

const YOUTUBE_API_SCRIPT = '//www.youtube.com/iframe_api';

const SUPPORTED_METHODS = [
  'play',
  'pause',
  'getPaused',
  'mute',
  'unmute',
  'getMuted',
  'setVolume',
  'getVolume',
  'getDuration',
  'setCurrentTime',
  'getCurrentTime'
];

const SUPPORTED_EVENTS = [
  'play',
  'paused',
  'ended',
  'error'
];

/**
 * The YouTube video adapter interface
 */
export default class YouTubeAdapter extends BaseAdapter {
  /**
   * Create a new YouTube adapter
   * @param {Object} config - the configuration
   * @param {Messenger} messenger - the messenger instance
   */
  constructor(config, messenger) {
    super(config, messenger);

    let getApi = new Promise((resolve, reject) => {
      window.onYouTubeIframeAPIReady = resolve;

      getScript(YOUTUBE_API_SCRIPT);
    });

    getApi.then(() => this.init());
  }

  init() {
    let videoContainer = document.createElement('div');
    let url = new URL(this.config.url); // TODO: REMOVE !important

    document.body.appendChild(videoContainer);

    this.player = new YT.Player(videoContainer, {
      height: '100%',
      width: '100%',
      videoId: url.searchParams.get('v'), // TODO: pass in from backend
      events: {
        onReady: () => {
          debug.log('[youtube#event:ready]');
          this.initMessenger();
        },

        onError: () => {
          this.messenger.emit({
            event: ENUMS.EVENTS.ERROR,
            value: {
              code: -1,
              msg: 'something went wrong'
            }
          });

          debug.log('[youtube#event:error]');
        },

        onStateChange: (event) => {
          let events = {
            0: ENUMS.EVENTS.ENDED,
            1: ENUMS.EVENTS.PLAY,
            2: ENUMS.EVENTS.PAUSE
          };

          if (events[event.data]) {
            this.messenger.emit(events[event.data]);

            debug.log('[youtube#event:%s]', events[event.data]);
          }
        }
      }
    });
  }

  /**
   * Supported iframe events
   * @type {Array}
   */
  supportedEvents = SUPPORTED_EVENTS;

  /**
   * Supported iframe methods
   * @type {Array}
   */
  supportedMethods = SUPPORTED_METHODS;

  // play
  play() {
    this.player.playVideo();

    debug.log('[youtube#method:play]');
  }

  // pause
  pause() {
    this.player.pauseVideo();

    debug.log('[youtube#method:pause]');
  }

  /**
   * Returns false if the video is playing, true otherwise
   * @returns {boolean}
   */
  getPaused() {
    // let isPaused = this.player.getPlayerState() === 2;
    return this.player.getPlayerState() === 2;
  }


  /**
   * Mute audio
   */
  mute() {
    this.player.mute();

    debug.log('[youtube#method:mute]');
  }

  /**
   * Unmute audio
   */
  unmute() {
    this.player.unMute();

    debug.log('[youtube#method:unmute]');
  }

  /**
   * Get video mute status
   * @return {boolean}
   */
  getMuted() {
    return this.player.isMuted();
  }

  /**
   * Set the volume between 0-100
   * @param {Number} value
   */
  setVolume(value) {
    // Vimeo API expects a value between 0-1
    this.player.setVolume();
  }

  /**
   * Get the volume between 0-100
   * @returns {number}
   */
  getVolume(data) {
    let value = this.player.getVolume();

    this.messenger.returns(data, value);
  }

  /**
   * Get the duration in seconds
   */
  getDuration(data) {
    let value = this.player.getDuration();

    // return the value
    this.messenger.returns(data, value);

    debug.log('[youtube#method:getDuration]', value);
  }

  /**
   * Seek to a time in seconds
   * @param {Object} value - time in seconds
   */
  setCurrentTime(data) {
    this.player.seekTo(data.value);

    debug.log('[youtube#method:setCurrentTime]', data.value);
  }

  /**
   * Get current time in seconds
   * @returns {Number} seconds
   */
  getCurrentTime(data) {
    let value = this.player.getDuration();

    this.messenger.returns(data, value);
  }
}
