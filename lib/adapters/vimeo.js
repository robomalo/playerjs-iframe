import {BaseServiceAdapter, BaseVideoAdapter} from './base';
import Iframe from '../util/iframe';
import getScript from '../util/get-script';
import debug from '../util/debug';
import ENUMS from '../enums';

const VIMEO_API_SCRIPT = '//f.vimeocdn.com/js/froogaloop2.min.js';

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
  'ended'
];

/**
  * The YouTube video adapter interface
  *
  * @constructor
  * @param {Object} config - the configuration
  * @param {Messenger} messenger - the messenger instance
  * @param {Function} onReady - called when player is ready (returns player instance)
  */
class VimeoAdapter extends BaseVideoAdapter {
  /**
   * Create a new Vimeo adapter
   * @param {Object} config
   * @param {[type]} messenger
   * @param {[type]} onReady - called when player is ready (returns player instance)
   */
  constructor(config, messenger, onReady)  {
    super(config, messenger);

    let getApi = new Promise((resolve, reject) => {
      getScript(VIMEO_API_SCRIPT).then(resolve);
    });

    getApi.then(() => this.init());
  }

  init() {
    let id = this.config.url.split('/').pop();
    let iframe = new Iframe(`https://player.vimeo.com/video/${id}?api=1`);

    iframe.appendTo(document.body);

    this.player = $f(iframe.iframe);

    // wait until the player is ready
    this.player.addEvent('ready', () => {
      debug.log('[vimeo#event:ready]');

      this.player.addEvent('play', () => {
        debug.log('[vimeo#event:play]');
        this.messenger.emit(ENUMS.EVENTS.PLAY);
      });

      this.player.addEvent('pause', () => {
        debug.log('[vimeo#event:pause]');
        this.messenger.emit(ENUMS.EVENTS.PAUSE);
      });

      this.player.addEvent('finish', () => {
        debug.log('[vimeo#event:ended]');
        this.messenger.emit(ENUMS.EVENTS.ENDED);
        // this.messenger.emit(ENUMS.EVENTS.SEEKED);
      });
    });
  }

  /**
   * Vimeo iframe events
   * @type {Array}
   */
  supportedEvents = SUPPORTED_EVENTS;

  /**
   * Vimeo iframe methods
   * @type {Array}
   */
  supportedMethods = SUPPORTED_METHODS;

  /**
   * Play the video
   */
  play() {
    this.player.api('play');
  }

  /**
   * Pause the video
   * @returns {boolean}
   */
  pause() {
    this.player.api('pause');
  }

  /**
   * Returns false if the video is playing, true otherwise
   * @returns {boolean}
   */
  getPaused() {
    return this.player.api('paused');
  }

  /**
   * Mute audio by setting volume to 0
   */
  mute() {
    this.isMuted = true;
    this.lastVolume = this.getVolume();

    this.player.api('setVolume', 0);
  }

  /**
   * Unmute audio by setting volume to volume before mute
   */
  unmute() {
    this.isMuted = false;

    this.player.api('setVolume', this.lastVolume);
  }

  /**
   * Get video mute status
   * @return {boolean}
   */
  getMuted() {
    return this.isMuted;
  }

  /**
   * Set the volume between 0-100
   * @param {Number} value
   */
  setVolume(value) {
    // Vimeo API expects a value between 0-1
    this.player.api('setVolume', (value / 100).toFixed(2));
  }

  /**
   * Get the volume between 0-100
   * @returns {number}
   */
  getVolume() {
    return this.player.api('getVolume') * 100;
  }

  /**
   * Get the duration in seconds
   */
  getDuration(data) {
    this.player.api('getDuration', (value) => {
      debug.log('[vimeo#method:getDuration]', value);
      // return the value
      this.messenger.returns(data, value);
    });
  }

  /**
   * Seek to a time in seconds
   * @param {Object} value - time in seconds
   */
  setCurrentTime(data) {
    debug.log('[vimeo#method:setCurrentTime]', data.value);
    this.player.api('seekTo', data.value);
  }

  /**
   * Get current time in seconds
   * @returns {Number} seconds
   */
  getCurrentTime() {
    this.player.api('getDuration', (value) => {
      debug.log('[vimeo#method:getDuration]', value);
      // return the value
      this.messenger.returns(data, value);
    });
  }

  /**
   * Set default mute status to false
   * @type {boolean}
   */
  static isMuted = false;

  /**
   * Volume default
   * @type {Number}
   */
  static lastVolume = 100;
}

export default VimeoAdapter;
