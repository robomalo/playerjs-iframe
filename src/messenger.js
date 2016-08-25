import getOrigin from './util/get-origin';
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
    this.on(METHODS.ADD_EVENT_LISTENER, (event, data) => {
      if (event === EVENTS.READY && this.readyData) {
        this.emit({ ...{}, ...this.readyData, ...{
          listener: data.listener
        } });
      } else {
        this.listeners[event] = this.listeners[event] || new Set();
        this.listeners[event].add(data.listener);
      }
    });

    this.on(METHODS.REMOVE_EVENT_LISTENER, (event, data) => {
      // if we have listeners...
      if (this.listeners[event]) {
        if (data.listener) {
          // remove the individual listener if specified
          this.listeners[event].delete(data.listener);
        } else {
          // otherwise, remove them all
          this.listeners[event] = new Set();
        }
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

      let data = event.data;

      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          data = {};
        }
      }

      if (!this.config.context || (data.context === this.config.context)) {
        if (data.method === method && callback) {
          callback(data.value, data);
        }
      }
    });

    return this;
  }

  /**
   * Emits the given data payload as a message
   * @param {Object} data - the payload to message
   */
  emit(data) {
    if (!this.origin) {
      return;
    }

    if (typeof data === 'string') {
      data = {
        event: data
      };
    }

    // use the config for defaults
    data = { ...{
      context: this.config.context,
      version: this.config.version
    }, ...data };

    let listeners = Array.from(data.listener ? [data.listener] : this.listeners[data.event] || []);

    // ready event can fire without a listener
    if (data.event === EVENTS.READY) {
      listeners.push(null);
    }

    listeners.forEach((listener) => {
      if (!listener) {
        delete data.listener;
      } else {
        data.listener = listener;
      }

      window.parent.postMessage(JSON.stringify(data), this.origin);
    });

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
