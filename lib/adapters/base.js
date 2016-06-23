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
