import YouTubeAdapter from '../../../src/adapters/youtube';

describe('YouTubeAdapter', () => {
  const mockApi = {
    playVideo: sinon.spy(),
    pauseVideo: sinon.spy(),
    mute: sinon.spy(),
    unMute: sinon.spy(),
    isMuted: sinon.spy(),
    setVolume: sinon.spy(),
    getVolume: sinon.spy(),
    getDuration: sinon.spy(),
    seekTo: sinon.spy(),
    getCurrentTime: sinon.spy(),
    getPlayerState: sinon.spy()
  };

  const mockMessenger = {
    returns: sinon.spy()
  };

  let youtube;

  before(() => {
    let stubInit = sinon.stub(YouTubeAdapter.prototype, 'init', function () {
      this.player = mockApi;
    });

    youtube = new YouTubeAdapter({}, mockMessenger);

    youtube.init();
  });

  after(() => {
    YouTubeAdapter.prototype.init.restore();
  });

  afterEach(() => {
    Object.keys(mockApi).forEach(m => mockApi[m].reset());
    Object.keys(mockMessenger).forEach(m => mockMessenger[m].reset());
  });

  context('#play', () => {
    it('should play', () => {
      youtube.play();

      assert(mockApi.playVideo.calledOnce);
    });
  });

  context('#pause', () => {
    it('should pause', () => {
      youtube.pause();

      assert(mockApi.pauseVideo.calledOnce);
    });
  });

  context('#getPaused', () => {
    it('should get paused', () => {
      youtube.getPaused();

      assert(mockApi.getPlayerState.calledOnce);
      assert(mockMessenger.returns.calledOnce);
    });
  });

  context('#mute', () => {
    it('should mute', () => {
      youtube.mute();

      assert(mockApi.mute.calledOnce);
    });
  });

  context('#unmute', () => {
    it('should unmute', () => {
      youtube.unmute();

      assert(mockApi.unMute.calledOnce);
    });
  });

  context('#getMuted', () => {
    it('should get muted', () => {
      youtube.getMuted();

      assert(mockApi.isMuted.calledOnce);
      assert(mockMessenger.returns.calledOnce);
    });
  });

  context('#setVolume', () => {
    it('should set volume', () => {
      youtube.setVolume({ value: 75 });

      assert(mockApi.setVolume.calledOnce);
      assert(mockApi.setVolume.calledWithExactly(75));
    });
  });

  context('#getVolume', () => {
    it('should get volume', () => {
      youtube.getVolume();

      assert(mockApi.getVolume.calledOnce);
      assert(mockMessenger.returns.calledOnce);
    });
  });

  context('#getDuration', () => {
    it('should get duration', () => {
      youtube.getDuration();

      assert(mockApi.getDuration.calledOnce);
      assert(mockMessenger.returns.calledOnce);
    });
  });

  context('#setCurrentTime', () => {
    it('should set current time', () => {
      youtube.setCurrentTime({ value: 60 });

      assert(mockApi.seekTo.calledOnce);
      assert(mockApi.seekTo.calledWithExactly(60));
    });
  });

  context('#getCurrentTime', () => {
    it('should get current time', () => {
      youtube.getCurrentTime();

      assert(mockApi.getCurrentTime.calledOnce);
      assert(mockMessenger.returns.calledOnce);
    });
  });
});