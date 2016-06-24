import ENUMS from '../enums';

/**
 * Base service
 * @class
 */
export class BaseServiceAdapter {
  constructor(config, messenger) {
    this.config = config;
    this.messenger = messenger;
  }
};

/**
 * Base video adapter
 * @class
 */
export class BaseVideoAdapter {
  constructor(config, messenger) {
    this.config = config;
    this.messenger = messenger;
  }

  initMessenger() {
    this.supportedMethods.forEach((method) => {
      this.messenger.on(method, (value, data) => {
        this.player[method](data);
      });
    });

    // if the player supported events, register addEventListener/removeEventListener
    if (this.supportedEvents.length > 0) {
      this.supportedMethods = this.supportedMethods.concat(
        [ENUMS.METHODS.ADD_EVENT_LISTENER, ENUMS.METHODS.REMOVE_EVENT_LISTENER]
      );
    }

    // and emit that the player is ready
    this.messenger.emit({
      event: ENUMS.EVENTS.READY, // ready event
      value: {
        src: window.location.href,  // our source is where this is executing
        events: this.supportedEvents, // supported events
        methods: this.supportedMethods // supported methods
      }
    });
  }

  /**
   * Placeholder for supported events
   * @type {Array}
   */
  supportedEvents = [];

  /**
   * Placeholder for supported methods
   * @type {Array}
   */
  supportedMethods = [];
}
