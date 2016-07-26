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
    this.supportedMethods.forEach((method) => {
      this.messenger.on(method, (value, data) => {
        if (this[method]) {
          this[method](data);
        }
      });
    });

    if (this.supportedEvents.length > 0) {
      this.supportedMethods.push(
        METHODS.ADD_EVENT_LISTENER,
        METHODS.REMOVE_EVENT_LISTENER
      );
    }

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
}
