import getOrigin from './util/get-origin';
import postMessage from './util/post-message';
import { METHODS, EVENTS } from './constants';

/**
 * Handles the sending and receiving of messages cross-window
 */
export default class Messenger {
  /**
   * Create a new instance of Messenger
   * @param {Object} config - the configuration
   */
  constructor(config = {}) {
    this.config = config;
    this.origin = getOrigin(document.referrer);

    this.bindEvents();
  }

  /**
   * Listeners container
   * @type {Object}
   */
  listeners = {};

  /**
   * Bind events
   */
  bindEvents() {
    this.on(METHODS.ADD_EVENT_LISTENER, (value, data) => {
      this.listeners[data.value] = new Set(this.listeners[data.value]);
      this.listeners[data.value].add(data.listener);
    });

    this.on(METHODS.REMOVE_EVENT_LISTENER, (value, data) => {
      if (this.listeners[data.value]) {
        this.listeneres[data.value].delete(data.listener);
      }
    });
  }

  /**
   * Subscribes to a given method
   * @param {String} method - the method to subscribe to
   * @param {Function} callback - the callback to invoke when the method event occurs
   */
  on(method, callback) {
    window.addEventListener('message', (event) => {
      if (event.origin !== this.origin) {
        return;
      }

      try {
        let data = JSON.parse(event.data);

        if (!this.config.context || (data.context === this.config.context)) {
          if (data.method === method && callback) {
            callback(data.value, data);
          }
        }
      } catch (e) {}
    });

    return this;
  }

  /**
   * Emits the given data payload as a message
   * @param {Object} data - the payload to message
   */
  emit(data) {
    if (typeof data === 'string') {
      data = {
        event: data
      };
    }

    data = Object.keys(this.config).reduce((data, key) => {
      if (!data.hasOwnProperty(key)) {
        data[key] = this.config[key];
      }

      return data;
    }, data || {});

    if (data.event === EVENTS.READY) {
      postMessage(data, this.origin);
    } else {
      let listeners = data.listener ? [data.listener] : this.listeners[data.event] || [];

      listeners.forEach((listener) => {
        data.listener = listener;

        postMessage(data, this.origin);
      });
    }

    return this;
  }

  /**
   * Emits the return value for a given method call (special kind of emit)
   * @param {Object} data - the original method call data
   * @param {*} value - the value to return
   */
  returns(data = {}, value = '') {
    data.event = data.method || data.event;
    data.value = value;

    delete data.method;

    this.emit(data);
  }
}
