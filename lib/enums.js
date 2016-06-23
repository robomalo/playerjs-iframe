// these are pulled from Player.js
export default {
  CONTEXT: 'player.js',

  EVENTS: {
    READY: 'ready',
    PLAY: 'play',
    PAUSE: 'pause',
    ENDED: 'ended',
    SEEKED: 'seeked',
    TIME_UPDATE: 'timeupdate',
    PROGRESS: 'progress',
    ERROR: 'error'
  },

  METHODS: {
    PLAY: 'play',
    PAUSE: 'pause',
    GET_PAUSED: 'getPaused',
    MUTE: 'mute',
    UNMUTE: 'unmute',
    GET_MUTED: 'getMuted',
    SET_VOLUME: 'setVolume',
    GET_VOLUME: 'getVolume',
    GET_DURATION: 'getDuration',
    SET_CURRENT_TIME: 'setCurrentTime',
    GET_CURRENT_TIME:'getCurrentTime',
    SET_LOOP: 'setLoop',
    GET_LOOP: 'getLoop',
    REMOVE_EVENT_LISTENER: 'removeEventListener',
    ADD_EVENT_LISTENER: 'addEventListener'
  }
};
