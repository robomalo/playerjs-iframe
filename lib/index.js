import Thenable from './util/thenable';
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
   * @param {Object} config -
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
   * Loads the video via the Adapter
   * @returns {Thenable} the thenable that resolves to the player
   */
  load() {
    // create a new instance of the Adapter
    let adapter = new this.Adapter(this.config, this.messenger);

    return new Thenable((fulfill, reject) => {
      // wait for the adapter to load
      adapter.load().then((player) => {
        // bind all the supported methods to the messenger listener
        player.supportedMethods.forEach((method) => {
          this.messenger.on(method, (value, data) => {
            player[method](data);
          });
        });

        // if the player supported events, register addEventListener/removeEventListener
        if (player.supportedEvents.length > 0) {
          player.supportedMethods = player.supportedMethods.concat(
            [ENUMS.METHODS.ADD_EVENT_LISTENER, ENUMS.METHODS.REMOVE_EVENT_LISTENER]
          );
        }

        // and emit that the player is ready
        this.messenger.emit({
          event: ENUMS.EVENTS.READY, // ready event
          value: {
            src: window.location.href,  // our source is where this is executing
            events: player.supportedEvents, // supported events
            methods: player.supportedMethods // supported methods
          }
        });

        // fulfill with the player
        fulfill(player);
      });
    });
  }
}
