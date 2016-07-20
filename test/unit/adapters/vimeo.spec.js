import VimeoAdapter from '../../../lib/adapters/vimeo';

describe('VimeoAdapter', () => {
  const deferred = {
    then: cb => cb.call(this, arguments)
  }

  const mockApi = {
    play: sinon.stub().returns(deferred),
    pause: sinon.stub().returns(deferred),
    getPaused: sinon.stub().returns(deferred),
    setVolume: sinon.stub().returns(deferred),
    getVolume: sinon.stub().returns(deferred),
    getDuration: sinon.stub().returns(deferred),
    setCurrentTime: sinon.stub().returns(deferred),
    getCurrentTime: sinon.stub().returns(deferred)
  };

  const mockMessenger = {
    returns: sinon.spy()
  };

  let vimeo;

  before(() => {
    let stubInit = sinon.stub(VimeoAdapter.prototype, 'init', function () {
      this.player = mockApi;
    });

    vimeo = new VimeoAdapter({}, mockMessenger);

    vimeo.init();
  });

  after(() => {
    VimeoAdapter.prototype.init.restore();
  });

  afterEach(() => {
    Object.keys(mockApi).forEach(m => mockApi[m].reset());
    Object.keys(mockMessenger).forEach(m => mockMessenger[m].reset());
  });

  context('#play', () => {
    it('should play', () => {
      vimeo.play();

      expect(mockApi.play.calledOnce).to.be.true;
    });
  });

  context('#pause', () => {
    it('should pause', () => {
      vimeo.pause();

      expect(mockApi.pause.calledOnce).to.be.true;
    });
  });

  context('#getPaused', () => {
    it('should get paused', () => {
      vimeo.getPaused();

      expect(mockApi.getPaused.calledOnce).to.be.true;
      expect(mockMessenger.returns.calledOnce).to.be.true;
    });
  });

  context('#mute', () => {
    it('should mute by getting current volume then setting volume to 0', () => {
      vimeo.mute();

      expect(mockApi.getVolume.calledOnce).to.be.true;
      expect(mockApi.setVolume.calledOnce).to.be.true;
      expect(mockApi.setVolume.calledWithExactly(0)).to.be.true;
    });
  });

  context('#unmute', () => {
    it('should unmute by setting volume to last volume', () => {
      vimeo.unmute();

      expect(mockApi.setVolume.calledOnce).to.be.true;
    });
  });

  context('#getMuted', () => {
    it('should get muted', () => {
      vimeo.getMuted();

      expect(mockApi.getVolume.calledOnce).to.be.true;
      expect(mockMessenger.returns.calledOnce).to.be.true;
    });
  });

  context('#setVolume', () => {
    it('should set volume', () => {
      vimeo.setVolume({ value: 75 });

      expect(mockApi.setVolume.calledOnce).to.be.true;
      expect(mockApi.setVolume.calledWithExactly(0.75)).to.be.true;
    });
  });

  context('#getVolume', () => {
    it('should get volume', () => {
      vimeo.getVolume();

      expect(mockApi.getVolume.calledOnce).to.be.true;
      expect(mockMessenger.returns.calledOnce).to.be.true;
    });
  });

  context('#getDuration', () => {
    it('should get duration', () => {
      vimeo.getDuration();

      expect(mockApi.getDuration.calledOnce).to.be.true;
      expect(mockMessenger.returns.calledOnce).to.be.true;
    });
  });

  context('#setCurrentTime', () => {
    it('should set current time', () => {
      vimeo.setCurrentTime({ value: 60 });

      expect(mockApi.setCurrentTime.calledOnce).to.be.true;
      expect(mockApi.setCurrentTime.calledWithExactly(60)).to.be.true;
    });
  });

  context('#getCurrentTime', () => {
    it('should get current time', () => {
      vimeo.getCurrentTime();

      expect(mockApi.getCurrentTime.calledOnce).to.be.true;
    });
  });
});