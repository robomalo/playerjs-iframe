import Messenger from './messenger';
import adapters from './adapters';
import { CONTEXT } from './constants';

/**
 * Player.js iframe
 */
const playerjsIframe = {
  /**
   * Load the video via the Adapter
   * @returns {Adapter}
   */
  create(config) {
    let Adapter = adapters[config.schema];

    if (!Adapter) {
      throw new Error(`No adapter for ${config.schema}`);
    }

    return new Adapter(config, new Messenger({
      context: CONTEXT,
      targetOrigin: config.targetOrigin
    }));
  },

  /**
   * Register new adapters
   * @param {String} name - adapter name
   * @param {Class} adapter - adapter class
   */
  addAdapter(name, adapter) {
    adapters[name] = adapter;
  }
};

export default playerjsIframe;
