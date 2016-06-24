import postMessage from './util/post-message';
import debug from './util/debug';
import ENUMS from './enums';

/**
 * Handles the sending and receiving of messages cross-window
 */
export default class Messenger {
  /**
   * Create a new instance of Messenger
   * @param {Object} config - the configuration
   */
  constructor(config) {
    this.config = config || {};
    this.listeners = {};

    this.bindEvents();
  }

  /**
   * [bindEvents description]
   * @return {[type]} [description]
   */
  bindEvents() {
    // Handle all calls to `addEventListener`
    this.on(ENUMS.METHODS.ADD_EVENT_LISTENER, (value, data) => {
      this.listeners[data.value] = new Set(this.listeners[data.value]);
      this.listeners[data.value].add(data.listener);

      debug.log('[messenger#addEventListener]', data);
    });

    // Handle all calls to `removeEventListener`
    this.on(ENUMS.METHODS.REMOVE_EVENT_LISTENER, (value, data) => {
      if (this.listeners[data.value]) {
        this.listeneres[data.value].remove(data.listener);
      }

      debug.log('[messenger#removeEventListener]', data);
    });
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

    // augment the data payload with config defaults
    data = Object.keys(this.config).reduce((data, key) => {
      if (!data.hasOwnProperty(key)) {
        data[key] = this.config[key];
      }

      return data;
    }, data || {});

    // if it's the 'ready' event, emit now
    if (data.event === ENUMS.EVENTS.READY) {
      postMessage(data);
    } else {
      // if the data object already has a listener, broadcast to that listener only
      // otherwise, broadcast to ALL known listeners for the given event
      let listeners = data.listener ? [data.listener] : this.listeners[data.event] || [];

      listeners.forEach((listener) => {
        data.listener = listener;
        debug.log('[messenger#emit]', data);
        postMessage(data);
      });
    }

    return this;
  }

  /**
   * Subscribes to a given method
   * @param {String} method - the method to subscribe to
   * @param {Function} callback - the callback to invoke when the method event occurs
   */
  on(method, callback) {
    window.addEventListener('message', (event) => {
      // TODO - security - origin check
      try {
        // parse the data
        let data = JSON.parse(event.data);

        // if a context is set, check that the context matches
        if (!this.config.context || (data.context === this.config.context)) {
          // if the method is the one we want...
          if (data.method === method && callback) {
            // invoke the callback
            callback(data.value, data);
          }
        }
      } catch (e) {}
    });

    return this;
  }

  /**
   * emits the return value for a given method call (special kind of emit)
   *
   * @param {Object} data - the original method call data
   * @param {*} value - the value to return
   */
  returns(data, value) {
    // set the value
    data.value = value;

    // if this was originally a method call, change it to an event
    // the event is now the response of the method call
    data.event = data.method || data.event;

    // remove the method if any
    delete data.method;

    // and emit back out the data
    this.emit(data);
  }
}
