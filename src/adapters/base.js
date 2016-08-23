import { EVENTS, METHODS } from '../constants';

/**
 * Base video adapter
 * @class
 */
export default class BaseAdapter {
  constructor(config, messenger) {
    this.config = config;
    this.messenger = messenger;
  }

  /**
   * Add messenger events
   * @function
   */
  ready() {
    if (this.supportedEvents.length > 0) {
      this.supportedMethods.push(
        METHODS.ADD_EVENT_LISTENER,
        METHODS.REMOVE_EVENT_LISTENER
      );
    }

    this.supportedMethods.forEach((method) => {
      this.messenger.on(method, (value, data) => {
        if (this.supports('method', method)) {
          this[method](data);
        }
      });
    });

    this.messenger.emit({
      event: EVENTS.READY,
      value: {
        src: window.location.href,
        events: this.supportedEvents,
        methods: this.supportedMethods
      }
    });
  }

  /**
   * Placeholder array for supported events
   * @type {Array}
   */
  supportedEvents = [];

  /**
   * Placeholder array for supported methods
   * @type {Array}
   */
  supportedMethods = [];

  /**
   * Check if method or event is supported
   * @param {String} method - method or event name
   * @param {String} name
   */
  supports(method, name) {
    let key = method === 'method' ? 'supportedMethods' : 'supportedEvents';

    return this[key].indexOf(name) > -1;
  }
}
