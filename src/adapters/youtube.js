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
  METHODS.GET_CURRENT_TIME,
  METHODS.SET_LOOP,
  METHODS.GET_LOOP
];

const SUPPORTED_EVENTS = [
  EVENTS.PLAY,
  EVENTS.PAUSE,
  EVENTS.ENDED,
  EVENTS.ERROR,
  EVENTS.TIME_UPDATE
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

      getScript(YOUTUBE_API_SCRIPT);
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

          // Start polling for `timeupdate` changes
          this.pollForUpdates();
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

          // Loop the video if isLooping has been set true
          if (event.data === 0 && this.isLooping) {
            this.setCurrentTime(0);
            this.play();
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
  getPaused(returns) {
    returns(this.player.getPlayerState() === PLAYER_STATES.PAUSED);
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
  getMuted(returns) {
    returns(this.player.isMuted());
  }

  /**
   * Set the volume
   * @param {Number} value - 0-100
   */
  setVolume(value) {
    this.player.setVolume(value);
  }

  /**
   * Get the volume
   * @returns {Number} - 0-100
   */
  getVolume(returns) {
    returns(this.player.getVolume());
  }

  /**
   * Get the duration in seconds
   * @returns {Number}
   */
  getDuration(returns) {
    returns(this.player.getDuration());
  }

  /**
   * Set the current time in seconds
   * @param {Number} value - time in seconds
   */
  setCurrentTime(value) {
    this.player.seekTo(value);
  }

  /**
   * Get current time in seconds
   * @returns {Number} seconds
   */
  getCurrentTime(returns) {
    returns(this.player.getCurrentTime());
  }

  /**
   * Set loop state
   * @param {Boolean} - value
   */
  setLoop(value) {
    this.isLooping = value;
  }

  /**
   * Get loop state
   * @returns {Boolean}
   */
  getLoop(returns) {
    returns(this.isLooping);
  }

  /**
   * Loop state
   * @type {Boolean}
   */
  static isLooping = false;

  /**
   * Poll for updates
   * @param {Function} callback
   */
  pollForUpdates(callback) {
    window.setInterval(() => {
      this.onCurrentTimeChange((currentTime) => {
        this.getDuration((duration) => {
          this.messenger.emit({
            event: EVENTS.TIME_UPDATE,
            value: {
              seconds: currentTime,
              duration: duration
            }
          });
        });
      });
    }, 250);
  }

  /**
   * On time change
   * @param {Function} callback
   */
  onCurrentTimeChange(callback) {
    this.getPaused((isPaused) => {
      if (!isPaused) {
        this.getCurrentTime((currentTime) => {
          if (this.lastTimeUpdate !== currentTime) {
            this.lastTimeUpdate = currentTime;

            callback(currentTime);
          }
        });
      }
    });
  }
}
