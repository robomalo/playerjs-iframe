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

  /**
   * Add messenger events
   * @function
   */
  initMessenger() {
    this.supportedMethods.forEach((method) => {
      this.messenger.on(method, (value, data) => {
        this.player[method](data);
      });
    });

    // Register addEventListener+removeEventListener if player supports events
    if (this.supportedEvents.length > 0) {
      this.supportedMethods.push(
        ENUMS.METHODS.ADD_EVENT_LISTENER,
        ENUMS.METHODS.REMOVE_EVENT_LISTENER
      );
    }

    // Emit that the player is ready
    this.messenger.emit({
      event: ENUMS.EVENTS.READY,
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
