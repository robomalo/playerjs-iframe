// these are pulled from Player.js
export default {
  CONTEXT: "player.js",

  EVENTS: {
    READY: "ready",
    PLAY: "play",
    PAUSE: "pause",
    ENDED: "ended",
    TIMEUPDATE: "timeupdate",
    PROGRESS: "progress",
    ERROR: "error"
  },

  METHODS: {
    PLAY: "play",
    PAUSE: "pause",
    GETPAUSED: "getPaused",
    MUTE: "mute",
    UNMUTE: "unmute",
    GETMUTED: "getMuted",
    SETVOLUME: "setVolume",
    GETVOLUME: "getVolume",
    GETDURATION: "getDuration",
    SETCURRENTTIME: "setCurrentTime",
    GETCURRENTTIME:"getCurrentTime",
    SETLOOP: "setLoop",
    GETLOOP: "getLoop",
    REMOVEEVENTLISTENER: "removeEventListener",
    ADDEVENTLISTENER: "addEventListener"
  }
};
