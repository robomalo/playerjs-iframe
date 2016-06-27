import BaseAdapter from './base';
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
  'pause',
  'ended'
];

/**
  * The Vimeo video adapter interface
  */
export default class VimeoAdapter extends BaseAdapter {
  /**
   * Create a new Vimeo adapter
   * @param {Object} config - the configuration
   * @param {Messenger} messenger - the messenger instance
   */
  constructor(config, messenger)  {
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
    this.player.addEvent(ENUMS.EVENTS.READY, () => {
      debug.log('[vimeo#event:ready]');

      SUPPORTED_EVENTS.forEach((eventName) => {
        debug.log(`[vimeo#eventName:${eventName} in each]`);

        this.player.addEvent(eventName, () => {
          this.messenger.emit(eventName);
        });
      });



      // this.player.addEvent('play', () => {
      //   debug.log('[vimeo#event:played]');
      //   this.messenger.emit(ENUMS.EVENTS.PLAY);
      // });
      //
      // this.player.addEvent('pause', () => {
      //   debug.log('[vimeo#event:pause]');
      //   this.messenger.emit(ENUMS.EVENTS.PAUSE);
      // });
      //
      // this.player.addEvent('finish', () => {
      //   debug.log('[vimeo#event:ended]');
      //   this.messenger.emit(ENUMS.EVENTS.ENDED);
      //   // this.messenger.emit(ENUMS.EVENTS.SEEKED);
      // });
      //
      // this.player.addEvent('mute', () => {
      //   this.messenger.emit(ENUMS.EVENTS.MUTE);
      // });


      this.initMessenger();
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
    debugger;

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
