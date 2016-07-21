import BaseAdapter from './base';
import getScript from '../util/get-script';
import { METHODS, EVENTS } from '../constants';

const YOUTUBE_API_SCRIPT = '//www.youtube.com/iframe_api';

const SUPPORTED_METHODS = [
  METHODS.PLAY,
  METHODS.PAUSE,
  METHODS.GET_PAUSED,
  METHODS.MUTE,
  METHODS.UNMUTE,
  METHODS.GET_MUTED,
  METHODS.SET_VOLUME,
  METHODS.GET_VOLUME,
  METHODS.GET_DURATION,
  METHODS.SET_CURRENT_TIME,
  METHODS.GET_CURRENT_TIME
];

const SUPPORTED_EVENTS = [
  EVENTS.PLAY,
  EVENTS.PAUSE,
  EVENTS.ENDED,
  EVENTS.ERROR
];

const PLAYER_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  VIDEO_CUED: 5
};

/**
 * The YouTube video adapter interface
 */
export default class YouTubeAdapter extends BaseAdapter {
  /**
   * Create a new YouTube adapter
   * @param {Object} config - the configuration
   * @param {Messenger} messenger - the messenger instance
   */
  constructor() {
    super(...arguments);

    let getApi = new Promise((resolve, reject) => {
      window.onYouTubeIframeAPIReady = resolve;

      getScript(YOUTUBE_API_SCRIPT).catch((message) => {
        console.warn(message);
      });
    });

    getApi.then(() => this.init());
  }

  /**
   * Initialize the player
   */
  init() {
    let videoContainer = document.createElement('div');

    document.body.appendChild(videoContainer);

    this.player = new YT.Player(videoContainer, {
      height: '100%',
      width: '100%',
      videoId: this.config.videoId,
      events: {
        onReady: () => {
          this.ready();
        },

        onError: () => {
          this.messenger.emit({
            event: EVENTS.ERROR,
            value: {
              code: -1,
              msg: 'something went wrong'
            }
          });
        },

        onStateChange: (event) => {
          let events = {
            0: EVENTS.ENDED,
            1: EVENTS.PLAY,
            2: EVENTS.PAUSE
          };

          if (events[event.data]) {
            this.messenger.emit(events[event.data]);
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

  /**
   * Play the video
   */
  play() {
    this.player.playVideo();
  }

  /**
   * Pause the video
   */
  pause() {
    this.player.pauseVideo();
  }

  /**
   * Return paused status
   * @returns {boolean}
   */
  getPaused(data) {
    this.messenger.returns(data, this.player.getPlayerState() === PLAYER_STATES.PAUSED);
  }

  /**
   * Mute the audio
   */
  mute() {
    this.player.mute();
  }

  /**
   * Unmute the audio
   */
  unmute() {
    this.player.unMute();
  }

  /**
   * Get video mute status
   * @return {boolean}
   */
  getMuted(data) {
    this.messenger.returns(data, this.player.isMuted());
  }

  /**
   * Set the volume
   * @param {Object} data
   * @param {Number} data.value - 0-100
   */
  setVolume(data) {
    this.player.setVolume(data.value);
  }

  /**
   * Get the volume
   * @returns {Number} - 0-100
   */
  getVolume(data) {
    this.messenger.returns(data, this.player.getVolume());
  }

  /**
   * Get the duration in seconds
   * @returns {Number}
   */
  getDuration(data) {
    this.messenger.returns(data,  this.player.getDuration());
  }

  /**
   * Set the current time in seconds
   * @param {Object} data
   * @param {Number} data.value - time in seconds
   */
  setCurrentTime(data) {
    this.player.seekTo(data.value);
  }

  /**
   * Get current time in seconds
   * @returns {Number} seconds
   */
  getCurrentTime(data) {
    this.messenger.returns(data, this.player.getCurrentTime());
  }
}
