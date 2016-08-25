import BaseAdapter from './base';
import getScript from '../util/get-script';
import { METHODS, EVENTS } from '../constants';

const VIMEO_API_SCRIPT = '//player.vimeo.com/api/player.js';

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
  EVENTS.PROGRESS,
  EVENTS.TIME_UPDATE,
  EVENTS.PLAY,
  EVENTS.PAUSE,
  EVENTS.ENDED,
  EVENTS.SEEKED,
  EVENTS.ERROR
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
  constructor()  {
    super(...arguments);

    let getApi = new Promise((resolve, reject) => {
      getScript(VIMEO_API_SCRIPT).then(resolve);
    });

    getApi.then(() => this.init());
  }

  /**
   * Initialize the player
   */
  init() {
    this.player = new Vimeo.Player(document.body, {
      width: window.innerWidth,
      height: window.innerHeight,
      id: this.config.videoId
    });

    this.player.ready().then(() => {
      SUPPORTED_EVENTS.forEach((event) => {
        this.player.on(event, (value) => {
          this.messenger.emit({
            event: event,
            value: value
          });
        });
      });

      this.ready();
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
    this.next('play');
  }

  /**
   * Pause the video
   */
  pause() {
    this.next('pause');
  }

  /**
   * Get paused status
   * @returns {boolean}
   */
  getPaused(returns) {
    this.player.getPaused().then((isPaused) => {
      returns(isPaused);
    });
  }

  /**
   * Mute audio by setting volume to 0
   */
  mute() {
    this.player.getVolume().then((volume) => {
      this.lastVolume = volume * 100;
      this.player.setVolume(0);
    });
  }

  /**
   * Unmute audio by setting volume to volume before mute
   */
  unmute() {
    this.setVolume(this.lastVolume);
  }

  /**
   * Get mute status
   * @return {boolean}
   */
  getMuted(returns) {
    this.player.getVolume().then((volume) => {
      returns(volume === 0);
    });
  }

  /**
   * Set the volume
   * @param {Number} value - 0-100
   */
  setVolume(value) {
    // Vimeo API expects a value between 0-1
    this.player.setVolume(value / 100).then((volume) => {
      this.lastVolume = volume * 100;
    });
  }

  /**
   * Get the volume
   * @returns {Number} - 0-100
   */
  getVolume(returns) {
    this.player.getVolume().then((volume) => {
      this.lastVolume = volume * 100;
      returns(this.lastVolume);
    });
  }

  /**
   * Volume default for mute/unmute
   * @type {Number}
   */
  lastVolume = 100;

  /**
   * Get the duration in seconds
   * @returns {Number}
   */
  getDuration(returns) {
    this.player.getDuration().then((duration) => {
      returns(duration);
    });
  }

  /**
   * Set the current time in seconds
   * @param {Number} value - time in seconds
   */
  setCurrentTime(value) {
    this.player.setCurrentTime(value);
  }

  /**
   * Get current time in seconds
   * @returns {Number} seconds
   */
  getCurrentTime(returns) {
    this.player.getCurrentTime().then((seconds) => {
      returns(seconds);
    });
  }

  /**
   * Set loop state
   * @param {Boolean} value
   */
  setLoop(value) {
    this.player.setLoop(value);
  }

  /**
   * Get loop state
   * @returns {Boolean}
   */
  getLoop(returns) {
    this.player.getLoop().then((loop) => {
      returns(loop);
    });
  }

  /**
   * Waits for the current promise to resolve before invoking the provided method
   * @param {String} name - the method name to invoke
   */
  next(name) {
    let done = function () {
      this.waitFor = this.player[name]();
    }.bind(this);

    if (this.waitFor) {
      // if there's a current promise, wait for it...
      this.waitFor.then(done, done);
    } else {
      // otherwise, do it now
      done();
    }
  }
}
