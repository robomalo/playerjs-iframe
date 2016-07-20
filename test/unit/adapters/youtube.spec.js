import YouTubeAdapter from '../../../lib/adapters/youtube';

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

      expect(mockApi.playVideo.calledOnce).to.be.true;
    });
  });

  context('#pause', () => {
    it('should pause', () => {
      youtube.pause();

      expect(mockApi.pauseVideo.calledOnce).to.be.true;
    });
  });

  context('#getPaused', () => {
    it('should get paused', () => {
      youtube.getPaused();

      expect(mockApi.getPlayerState.calledOnce).to.be.true;
      expect(mockMessenger.returns.calledOnce).to.be.true;
    });
  });

  context('#mute', () => {
    it('should mute', () => {
      youtube.mute();

      expect(mockApi.mute.calledOnce).to.be.true;
    });
  });

  context('#unmute', () => {
    it('should unmute', () => {
      youtube.unmute();

      expect(mockApi.unMute.calledOnce).to.be.true;
    });
  });

  context('#getMuted', () => {
    it('should get muted', () => {
      youtube.getMuted();

      expect(mockApi.isMuted.calledOnce).to.be.true;
      expect(mockMessenger.returns.calledOnce).to.be.true;
    });
  });

  context('#setVolume', () => {
    it('should set volume', () => {
      youtube.setVolume({ value: 75 });

      expect(mockApi.setVolume.calledOnce).to.be.true;
      expect(mockApi.setVolume.calledWithExactly(75)).to.be.true;
    });
  });

  context('#getVolume', () => {
    it('should get volume', () => {
      youtube.getVolume();

      expect(mockApi.getVolume.calledOnce).to.be.true;
      expect(mockMessenger.returns.calledOnce).to.be.true;
    });
  });

  context('#getDuration', () => {
    it('should get duration', () => {
      youtube.getDuration();

      expect(mockApi.getDuration.calledOnce).to.be.true;
      expect(mockMessenger.returns.calledOnce).to.be.true;
    });
  });

  context('#setCurrentTime', () => {
    it('should set current time', () => {
      youtube.setCurrentTime({ value: 60 });

      expect(mockApi.seekTo.calledOnce).to.be.true;
      expect(mockApi.seekTo.calledWithExactly(60)).to.be.true;
    });
  });

  context('#getCurrentTime', () => {
    it('should get current time', () => {
      youtube.getCurrentTime();

      expect(mockApi.getCurrentTime.calledOnce).to.be.true;
      expect(mockMessenger.returns.calledOnce).to.be.true;
    });
  });
});