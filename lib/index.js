import Messenger from './messenger';
import adapters from './adapters';
import ENUMS from './enums';

/**
 * Player.js iframe class
 * @class
 */
export default class PlayerjsIframe {
  /**
   * Create a Player.js iframe
   * @constructor
   * @param {Object} config
   */
  constructor(config) {
    this.Adapter = adapters[config.adapter];

    if (!this.Adapter) {
      throw new Error(`No adapter for ${config.adapter}`);
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
   * @param {string} name - adapter name
   * @param {Class} adapter - adapter class
   * @function
   */
  addAdapter(name, adapter) {
    adapters[name] = adapter;
  }

  /**
   * Load the video via the Adapter
   * @function
   * @returns {Promise} resolve the player
   */
  load() {
    let adapter = new this.Adapter(this.config, this.messenger);

    return new Promise((resolve, reject) => {
      adapter.load().then((player) => {
        player.initMessenger();
        resolve(player);
      });
    });
  }
}
