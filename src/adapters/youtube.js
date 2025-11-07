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
 * https://developers.google.com/youtube/js_api_reference
 * 2 – The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.
 * 100 – The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.
 * 101 – The owner of the requested video does not allow it to be played in embedded players.
 * 150 – This error is the same as 101. It's just a 101 error in disguise!
 */
function errorReason(errorCode) {
  let errorReason = '';

  switch (errorCode) {
    case 2:
      errorReason = '[YouTube] The request contains an invalid parameter value.';
      break;
    case 100:
      errorReason = '[YouTube] The video requested was not found.';
      break;
    case 101:
    case 150:
      errorReason = '[YouTube] The owner of the requested video does not allow it to be played in embedded players.';
      break;
    default:
      errorReason = '[YouTube] Something went wrong.';
  }
  return errorReason;
}

/**
 * The YouTube video adapter interface
 */
export default class YouTubeAdapter extends BaseAdapter {
  /**
   * Create a new YouTube adapter
   * @param {Object} config Base configuration to init YouTube player.
   * @param {string} [config.videoId] Optional only if playlistId is provided.
   * @param {string} [config.playlistId] Optional only if videoId is provided.
   * @param {string} [config.playlistType=playlist] Valid: playlist, search, or user_uploads.
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
    /**
     * If there is no video ID, then default to empty.
     */
    if (!this.config.videoId) {
      this.config.videoId = '';
    }

    const domain = this.config.doNotTrack ? 'youtube-nocookie' : 'youtube';
    let src = `https://www.${domain}.com/embed/${this.config.videoId}?enablejsapi=1&wmode=opaque&widgetid=1`;

    if (this.config.playlistId) {
      let playlistType = this.config.playlistType || 'playlist';
      src += `&list=${encodeURIComponent(this.config.playlistId)}&listType=${encodeURIComponent(playlistType)}`;
    }

    if (window.location && window.location.origin) {
      src += `&origin=${encodeURIComponent(window.location.origin)}`;
    }

    let videoIframe = this.createIframe(src);
    let iframeId = videoIframe.id;

    // Add YouTube-specific iframe attributes
    videoIframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

    // Get existing allow permissions from base iframe and append web-share
    let existingAllow = videoIframe.getAttribute('allow') || '';
    let allowPermissions = existingAllow ? existingAllow + '; web-share' : 'web-share';
    videoIframe.setAttribute('allow', allowPermissions);    

    document.body.appendChild(videoIframe);

    this.player = new YT.Player(iframeId, {
      events: {
        onReady: () => {
          this.ready();
          // Start polling for `timeupdate` changes
          this.pollForUpdates();
        },

        /**
         * @param {Object} error - error object returned by YouTube
         * @param {number} error.data - error code returned by YouTube
         * @param {YT.Player} error.target - instance of YT player that returned error.
         */
        onError: (error) => {
          let errorCode = error.data;

          this.messenger.emit({
            event: EVENTS.ERROR,
            value: {
              code: errorCode,
              msg: errorReason(errorCode)
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
