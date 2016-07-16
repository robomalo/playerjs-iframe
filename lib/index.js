import Messenger from './messenger';
import adapters from './adapters';
import ENUMS from './enums';

/**
 * Player.js iframe class
 */
export default class PlayerjsIframe {
  /**
   * Create a Player.js iframe
   * @param {Object} config
   */
  constructor(config = {}) {
    this.Adapter = adapters[config.schema];

    if (!this.Adapter) {
      throw new Error(`No adapter for ${config.schema}`);
    }

    this.config = config;

    this.messenger = new Messenger({
      context: ENUMS.CONTEXT
    });

    Object.keys(ENUMS).forEach((name) => {
      this[name] = ENUMS[name];
    });
  }

  /**
   * Register new adapters
   * @param {String} name - adapter name
   * @param {Class} adapter - adapter class
   */
  addAdapter(name, adapter) {
    adapters[name] = adapter;
  }

  /**
   * Load the video via the Adapter
   * @returns {Adapter}
   */
  load() {
    return new this.Adapter(this.config, this.messenger);
  }
}
