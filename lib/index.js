import Messenger from './messenger';
import adapters from './adapters';
import { CONTEXT } from './constants';

/**
 * Player.js iframe
 */
let playerjsIframe = {
  /**
   * Register new adapters
   * @param {String} name - adapter name
   * @param {Class} adapter - adapter class
   */
  addAdapter(name, adapter) {
    adapters[name] = adapter;
  },

  /**
   * Load the video via the Adapter
   * @returns {Adapter}
   */
  new(config) {
    let Adapter = adapters[config.schema];

    if (!Adapter) {
      throw new Error(`No adapter for ${config.schema}`);
    }

    return new Adapter(config, new Messenger({ context: CONTEXT }));
  }
};

export default playerjsIframe;
