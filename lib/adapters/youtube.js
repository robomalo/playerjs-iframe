import Thenable from "../util/thenable";

export default YouTubeVideoAdapter;

/**
  * Implements the adapter for YouTube iframe API
  *
  * @constructor
  * @param    {Object} config - the configuration
  * @param    {Messenger} messenger - the messenger instance from VideoManager
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
  var config = this.config;
  var messenger = this.messenger;

  // if the YouTube iframe is not already loaded, load it now...
  loadYouTubeAPI();

  // return the promise
  return new Thenable(function(fulfill, reject) {
    window.onYouTubeIframeAPIReady = function() {
      new VideoAdapter(config, messenger, fulfill);
    };
  });

  function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      return;
    }
    var script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    (document.head || document.body).appendChild(script);
  }
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
  var videoContainer = document.createElement("div");
  document.body.appendChild(videoContainer);

  this.messenger = messenger;
  this.listeners = {};

  this.support = {
    events: ["play", "paused", "ended", "error"],
    methods: ["play", "pause", "addEventListener", "getDuration", "setCurrentTime"]
  };

  this.player = new YT.Player(videoContainer, {
    height: "100%",
    width: "100%",
    videoId: config.videoId,
    events: {
      onReady: function() {
        onReady(this);
      }.bind(this),
      onError: function() {
        this.messenger.emit({
          event: "error",
          value: {
            code: -1,
            msg: ""
          }
        });
      }.bind(this),
      onStateChange: function(event) {
        var events = {
          0: "ended",
          1: "play",
          2: "pause",
          "-1": "stopped"
        };
        if (events[event.data]) {
          this.messenger.emit(events[event.data]);
        }
      }.bind(this)
    }
  });
}

// play
VideoAdapter.prototype.play = function() {
  this.player.playVideo();
};
// pause
VideoAdapter.prototype.pause = function() {
  this.player.pauseVideo();
};
// getDuration
VideoAdapter.prototype.getDuration = function(data) {
  data.value = this.player.getDuration();
  // emit back out the return value
  this.messenger.emit(data);
};
// setCurrentTime
VideoAdapter.prototype.setCurrentTime = function(data) {
  this.player.seekTo(data.value);
};
