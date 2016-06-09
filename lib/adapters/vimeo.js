import Thenable from "../util/thenable";
import enums from "../enums";
import getScript from "../util/getscript";
import debug from "../util/debug";
import Iframe from "../util/iframe";

export default VimeoAdapter;

/**
  * Implements the adapter for Vimeo iframe API
  *
  * @constructor
  * @param    {Object} config - the configuration
  * @param    {Messenger} messenger - the messenger instance
  */
function VimeoAdapter(config, messenger) {
  this.config = config;
  this.messenger = messenger;
};

/**
  * Loads the video and returns the promise
  *
  * @returns  {Thenable} the thenable that resolves to the player
  */
VimeoAdapter.prototype.load = function() {
  let config = this.config;
  let messenger = this.messenger;

  return new Thenable(function(fulfill, reject) {
    getScript("//f.vimeocdn.com/js/froogaloop2.min.js").then(function() {
      new VideoAdapter(config, messenger, fulfill);
    });
  });
};

/**
  * The YouTube video adapter interface
  *
  * @constructor
  * @param    {Object} config - the configuration
  * @param    {Messenger} messenger - the messenger instance from VideoManager
  * @param    {Function} onReady - callack fired when player is ready (returns player instance)
  */
function VideoAdapter(config, messenger, onReady) {
  this.messenger = messenger;

  this.support = {
    events: ["play", "paused", "ended"],
    methods: ["play", "pause", "getDuration", "setCurrentTime"]
  };

  let iframe = new Iframe(`https://player.vimeo.com/video/${config.videoId}?api=1`);
  iframe.appendTo(document.body);
  this.player = $f(iframe.iframe);

  this.player.addEvent("ready", () => {
    debug.log("[vimeo#event:ready]");

    this.player.addEvent("play", () => {
      debug.log("[vimeo#event:play]");
      this.messenger.emit(enums.EVENTS.PLAY);
    });

    this.player.addEvent("pause", () => {
      debug.log("[vimeo#event:pause]");
      this.messenger.emit(enums.EVENTS.PAUSE);
    });

    onReady(this);
  });
}

// play
VideoAdapter.prototype.play = function() {
  debug.log("[vimeo#method:play]");
  this.player.api("play");
};
// pause
VideoAdapter.prototype.pause = function() {
  debug.log("[vimeo#method:pause]");
  this.player.api("pause");
};
// getDuration
VideoAdapter.prototype.getDuration = function(data) {
  this.player.api("getDuration", (value) => {
    debug.log("[vimeo#method:getDuration]", value);
    // emit back out the return value
    this.messenger.returns(data, value);
  });
};
// setCurrentTime
VideoAdapter.prototype.setCurrentTime = function(data) {
  debug.log("[vimeo#method:setCurrentTime]", data.value);
  this.player.api("seekTo", data.value);
};
