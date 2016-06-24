import {BaseServiceAdapter, BaseVideoAdapter} from './base';
import getScript from '../util/get-script';
import debug from '../util/debug';
import ENUMS from '../enums';

const YOUTUBE_API_SCRIPT = '//www.youtube.com/iframe_api';

const SUPPORTED_METHODS = [
  'play',
  'pause',
  'getPaused',
  'mute',
  'unmute',
  'getMuted',
  'setVolume',
  'getVolume',
  'getDuration',
  'setCurrentTime',
  'getCurrentTime'
];

const SUPPORTED_EVENTS = [
  'play',
  'paused',
  'ended',
  'error'
];

/**
 * The YouTube video adapter interface
 *
 * @constructor
 * @param {Object} config - the configuration
 * @param {Messenger} messenger - the messenger instance
 * @param {Function} onReady - called when player is ready (returns player instance)
 */
class YouTubeVideoAdapter extends BaseVideoAdapter {
  constructor(config, messenger, onReady) {
    super(config, messenger);

    let videoContainer = document.createElement('div');
    let url = new URL(config.url); // TODO: REMOVE !important

    document.body.appendChild(videoContainer);

    this.player = new YT.Player(videoContainer, {
      height: '100%',
      width: '100%',
      videoId: url.searchParams.get('v'), // TODO: pass in from backend
      events: {
        onReady: () => {
          onReady(this);

          debug.log('[youtube#event:ready]');
        },

        onError: () => {
          this.messenger.emit({
            event: ENUMS.EVENTS.ERROR,
            value: {
              code: -1,
              msg: 'something went wrong'
            }
          });

          debug.log('[youtube#event:error]');
        },

        onStateChange: (event) => {
          let events = {
            0: ENUMS.EVENTS.ENDED,
            1: ENUMS.EVENTS.PLAY,
            2: ENUMS.EVENTS.PAUSE
          };

          if (events[event.data]) {
            this.messenger.emit(events[event.data]);

            debug.log('[youtube#event:%s]', events[event.data]);
          }
        }
      }
    });
  }

  /**
   * Supported iframe events
   * @type {Array}
   */
  supportedEvents = SUPPORTED_EVENTS;

  /**
   * Supported iframe methods
   * @type {Array}
   */
  supportedMethods = SUPPORTED_METHODS;

  // play
  play() {
    this.player.playVideo();

    debug.log('[youtube#method:play]');
  }

  // pause
  pause() {
    this.player.pauseVideo();

    debug.log('[youtube#method:pause]');
  }

  // mute
  mute() {
    this.player.mute();

    debug.log('[youtube#method:mute]');
  }

  // unmute
  unmute() {
    this.player.unMute();

    debug.log('[youtube#method:unmute]');
  }

  // getDuration
  getDuration(data) {
    let value = this.player.getDuration();

    // return the value
    this.messenger.returns(data, value);

    debug.log('[youtube#method:getDuration]', value);
  }

  // setCurrentTime
  setCurrentTime(data) {
    this.player.seekTo(data.value);

    debug.log('[youtube#method:setCurrentTime]', data.value);
  }
}

/**
 * Implements the adapter for YouTube iframe API
 * @see https://developers.google.com/youtube/iframe_api_reference
 *
 * @constructor
 * @param    {Object} config - the configuration
 * @param    {Messenger} messenger - the messenger instance
 */
class YouTubeServiceAdapter extends BaseServiceAdapter {
  load() {
    return new Promise((resolve, reject) => {
      window.onYouTubeIframeAPIReady = () => {
        new YouTubeVideoAdapter(this.config, this.messenger, resolve);
      };

      getScript(YOUTUBE_API_SCRIPT);
    });
  }
}

export default YouTubeServiceAdapter;
