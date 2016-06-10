import Thenable from "../util/thenable";
import enums from "../enums";
import getScript from "../util/getscript";
import debug from "../util/debug";

export default YouTubeVideoAdapter;

/**
  * Implements the adapter for YouTube iframe API
  * @see https://developers.google.com/youtube/iframe_api_reference
  *
  * @constructor
  * @param    {Object} config - the configuration
  * @param    {Messenger} messenger - the messenger instance
  */
function YouTubeVideoAdapter(config, messenger) {
  this.config = config;
  this.messenger = messenger;
};

/**
  * Loads the video and returns the promise
  *
  * @returns  {Thenable} the thenable that resolves to the player
  */
YouTubeVideoAdapter.prototype.load = function() {
  let config = this.config;
  let messenger = this.messenger;

  // return the promise
  return new Thenable(function(fulfill, reject) {
    window.onYouTubeIframeAPIReady = function() {
      new VideoAdapter(config, messenger, fulfill);
    };

    getScript("https://www.youtube.com/iframe_api");
  });
};

/**
  * The YouTube video adapter interface
  *
  * @constructor
  * @param    {Object} config - the configuration
  * @param    {Messenger} messenger - the messenger instance
  * @param    {Function} onReady - called when player is ready (returns player instance)
  */
function VideoAdapter(config, messenger, onReady) {
  let videoContainer = document.createElement("div");
  document.body.appendChild(videoContainer);

  this.messenger = messenger;
  this.listeners = {};

  this.supports = {
    events: ["play", "paused", "ended", "error"],
    methods: ["play", "pause", "getDuration", "setCurrentTime"]
  };

  this.player = new YT.Player(videoContainer, {
    height: "100%",
    width: "100%",
    videoId: config.videoId,
    events: {
      onReady: () => {
        debug.log("[youtube#event:ready]");
        onReady(this);
      },
      onError: () => {
        debug.log("[youtube#event:error]");
        this.messenger.emit({
          event: enums.EVENTS.ERROR,
          value: {
            code: -1,
            msg: "something went wrong"
          }
        });
      },
      onStateChange: (event) => {
        let events = {
          0: enums.EVENTS.ENDED,
          1: enums.EVENTS.PLAY,
          2: enums.EVENTS.PAUSE
        };
        if (events[event.data]) {
          debug.log("[youtube#event:%s]", events[event.data]);
          this.messenger.emit(events[event.data]);
        }
      }
    }
  });
}

// play
VideoAdapter.prototype.play = function() {
  debug.log("[youtube#method:play]");
  this.player.playVideo();
};
// pause
VideoAdapter.prototype.pause = function() {
  debug.log("[youtube#method:pause]");
  this.player.pauseVideo();
};
// getDuration
VideoAdapter.prototype.getDuration = function(data) {
  var value = this.player.getDuration();
  debug.log("[youtube#method:getDuration]", value);
  // return the value
  this.messenger.returns(data, value);
};
// setCurrentTime
VideoAdapter.prototype.setCurrentTime = function(data) {
  debug.log("[youtube#method:setCurrentTime]", data.value);
  this.player.seekTo(data.value);
};
