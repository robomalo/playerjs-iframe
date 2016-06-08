import Thenable from "./util/thenable";
import Messenger from "./messenger";
import adapters from "./adapters";
import enums from "./enums";

export default PlayerjsIframe;

/**
  * Manages creating a video instance by wrapping the Adapter
  *
  * @constructor
  * @param    {Object} config - the configuration
  */
function PlayerjsIframe(config) {
  this.Adapter = adapters[config.adapter];
  if (!this.Adapter) {
    throw new Error("no adapter for " + config.adapter);
  }
  this.config = config;
  this.messenger = new Messenger({
    context: enums.CONTEXT
  });
}

/**
  * method to register new adatpers
  */
PlayerjsIframe.addAdapter = function(name, adapter) {
  adapters[name] = adapter;
};

/**
  * expose the Thenable interface for anyone creating their own adapters
  */
PlayerjsIframe.Thenable = Thenable;

/**
  * expose the Player.js enums
  */
Object.keys(enums).forEach(function(name) {
  PlayerjsIframe[name] = enums[name];
});

/**
  * Loads the video via the Adapter
  *
  * @returns  {Thenable} the thenable that resolves to the player
  */
PlayerjsIframe.prototype.load = function() {
  let messenger = this.messenger;
  // create a new instance of the Adapter
  let adapter = new this.Adapter(this.config, this.messenger);
  return new Thenable(function(fulfill, reject) {
    // wait for the adapter to load
    adapter.load().then(function(player) {
      // once it"s loaded...

      // bind all the supported methods to the messenger listener
      (player.support && player.support.methods || []).forEach(function(method) {
        messenger.on(method, function(value, data) {
          player[method](data);
        });
      });

      // if the player supports events, register addEventListener/removeEventListener
      if (player.support && player.support.events) {
        player.support.methods = (player.support.methods || []).concat(
          [enums.METHODS.ADDEVENTLISTENER, enums.METHODS.REMOVEEVENTLISTENER]
        );
      }

      // and emit that the player is ready
      messenger.emit({
        event: enums.EVENTS.READY, // ready event
        value: {
          src: window.location.href,  // our source is where this is executing
          events: player.support && player.support.events, // supported events
          methods: player.support && player.support.methods // supported methods
        }
      });

      // fulfill with the player
      fulfill(player);
    });
  });
};
