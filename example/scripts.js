// Elements
var $status = $('#status');
var $statusMessage = $('#status__message');

// Constants
var HIDDEN = 'hidden';
var VISIBLE = 'visible';

// Timeout placeholder
var dismissStatus;

/**
 * Display player status
 * @param {String} message
 */
function setStatus(message) {
  $status.text(message).removeClass(HIDDEN).addClass(VISIBLE);

  clearTimeout(dismissStatus);

  dismissStatus = setTimeout(function () {
    $status.removeClass(VISIBLE).addClass(HIDDEN).text('');
  }, 2000);
}

/**
 * Iframe controls
 * @constructor
 * @param {[type]} player    [description]
 * @param {[type]} $controls [description]
 */
function Controls(player, $controls) {
  this.player = player;

  this.$controlsPlay = $controls.find('.controls__play');
  this.$controlsPlayReady = $controls.find('.controls__play_ready');
  this.$controlsPause = $controls.find('.controls__pause');
  this.$controlsPauseReady = $controls.find('.controls__pause_ready');
  this.$controlsGetPaused = $controls.find('.controls__get-paused');
  this.$controlsMute = $controls.find('.controls__mute');
  this.$controlsUnmute = $controls.find('.controls__unmute');
  this.$controlsGetMuted = $controls.find('.controls__get-muted');
  this.$controlsSetVolume = $controls.find('.controls__set-volume');
  this.$controlsGetVolume = $controls.find('.controls__get-volume');
  this.$controlsGetDuration = $controls.find('.controls__get-duration');
  this.$controlsSetCurrentTime = $controls.find('.controls__set-current-time');
  this.$controlsGetCurrentTime = $controls.find('.controls__get-current-time');
  this.$controlsSetLoop = $controls.find('[name^="set-loop"]');
  this.$controlsGetLoop = $controls.find('.controls__get-loop');

  this.setDefaults();
  this.bindEvents();
}

/**
 * Set control defauls
 */
Controls.prototype.setDefaults = function () {
  this.player.getVolume(function (value) {
    this.$controlsSetVolume.val(value);
  }.bind(this));

  this.player.getDuration(function (value) {
    this.$controlsSetCurrentTime.attr('max', value);
  }.bind(this));
};

/**
 * Bind player controls
 * @method
 */
Controls.prototype.bindEvents = function () {
  var player = this.player;

  this.$controlsPlay.on('click', function () {
    player.play();
  });

  this.$controlsPause.on('click', function () {
    player.pause();
  });

  this.$controlsPlayReady.on('click', function () {
    player.on('ready', function () {
      player.play();
    });
  });

  this.$controlsPauseReady.on('click', function () {
    player.on('ready', function () {
      player.pause();
    });
  });

  this.$controlsGetPaused.on('click', function () {
    player.getPaused(function (value) {
      setStatus('Paused: ' + value);
    });
  });

  this.$controlsMute.on('click', function () {
    player.mute();
  });

  this.$controlsUnmute.on('click', function () {
    player.unmute();
  });

  this.$controlsGetMuted.on('click', function () {
    player.getMuted(function (value) {
      setStatus('Muted: ' + value);
    });
  });

  this.$controlsSetVolume.on('change', function () {
    player.setVolume(this.value);
  });

  this.$controlsGetVolume.on('click', function () {
    player.getVolume(function (value) {
      setStatus('Volume: ' + value);
    });
  });

  this.$controlsGetDuration.on('click', function () {
    player.getDuration(function (value) {
      setStatus('Duration: ' + value);
    });
  });

  this.$controlsSetCurrentTime.on('change', function () {
    player.setCurrentTime(this.value);
  });

  this.$controlsGetCurrentTime.on('click', function () {
    player.getCurrentTime(function (value) {
      setStatus('Current time: ' + value);
    });
  });

  this.$controlsSetLoop.on('change', function () {
    player.setLoop(this.id.indexOf('true') > -1);
  });

  this.$controlsGetLoop.on('click', function () {
    player.getLoop(function (value) {
      setStatus('Loop: ' + value);
    });
  });
};

$(document).ready(function () {
  $('iframe').each(function () {
    var player = new playerjs.Player(this);
    var $iframe = $(this);
    var $controls = $iframe.next('.controls');

    player.on('ready', function () {
      var controls = new Controls(player, $controls);

      player.mute();
    });
  });
});
