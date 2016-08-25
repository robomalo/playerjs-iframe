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
          if (/^get/.test(method)) {
            this[method]((returnValue) => {
              this.messenger.returns(data, returnValue);
            });
          } else {
            this[method](value);
          }
        }
      });
    });

    // These are handled by the Messenger
    if (this.supportedEvents.length > 0) {
      this.supportedMethods.push(
        METHODS.ADD_EVENT_LISTENER,
        METHODS.REMOVE_EVENT_LISTENER
      );
    }

    this.messenger.on(METHODS.ADD_EVENT_LISTENER, (event, data) => {
      if (data.value === EVENTS.READY) {
        this.emitReadyEvent();
      }
    });

    this.emitReadyEvent();
  }

  emitReadyEvent() {
    this.readyData = {
      event: EVENTS.READY,
      value: {
        src: window.location.href,
        events: this.supportedEvents,
        methods: this.supportedMethods
      }
    };

    this.messenger.emit(this.readyData);
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
