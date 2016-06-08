import Thenable from "./util/thenable";
import Messenger from "./messenger";
import adapters from "./adapters";

/**
  * Manages creating a video instance by wrapping the VideoAdapter
  *
  * @constructor
  * @param    {Object} config - the configuration
  */
function PlayerjsIframe(config) {
  this.VideoAdapter = adapters[config.adapter];
  if (!this.VideoAdapter) {
    throw new Error("no adapter for " + config.adapter);
  }
  this.config = config;
  this.messenger = new Messenger({
    context: "player.js"
  });
}

PlayerjsIframe.addAdapter = function(name, adapter) {
  adapters[name] = adapter;
};

/**
  * Loads the video via the VideoAdapter
  *
  * @returns  {Thenable} the thenable that resolves to the player
  */
PlayerjsIframe.prototype.load = function() {
  let messenger = this.messenger;
  // create a new instance of the VideoAdapter
  let adapter = new this.VideoAdapter(this.config, this.messenger);
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
          ["addEventListener", "removeEventListener"]
        );
      }

      // and emit that the player is ready
      messenger.emit({
        event: "ready", // ready event
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

export default PlayerjsIframe;
