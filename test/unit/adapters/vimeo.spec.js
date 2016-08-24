import VimeoAdapter from '../../../src/adapters/vimeo';

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
    getCurrentTime: sinon.stub().returns(deferred),
    setLoop: sinon.stub().returns(deferred),
    getLoop: sinon.stub().returns(deferred),
    removeEventListener: sinon.stub().returns(deferred),
    addEventListener: sinon.stub().returns(deferred)
  };

  const mockReturns = sinon.spy();

  let vimeo;

  before(() => {
    let stubInit = sinon.stub(VimeoAdapter.prototype, 'init', function () {
      this.player = mockApi;
    });

    vimeo = new VimeoAdapter({
      url: 'https://vimeo.com/100167538',
      image: 'http://i.vimeocdn.com/video/481567973_1280.jpg',
      videoId: '100167538',
      key: '03fb819bf74246bf972444a07b738ad0',
      schema: 'vimeo',
      src: 'https://player.vimeo.com/video/',
      type: 'text/html'
    }, {});

    vimeo.init();
  });

  after(() => {
    VimeoAdapter.prototype.init.restore();
  });

  afterEach(() => {
    Object.keys(mockApi).forEach(m => mockApi[m].reset());
    mockReturns.reset();
  });

  context('#play', () => {
    it('should play', () => {
      vimeo.play();

      assert(mockApi.play.calledOnce);
    });
  });

  context('#pause', () => {
    it('should pause', () => {
      vimeo.pause();

      assert(mockApi.pause.calledOnce);
    });
  });

  context('#getPaused', () => {
    it('should get paused', () => {
      vimeo.getPaused(mockReturns);

      assert(mockApi.getPaused.calledOnce);
      assert(mockReturns.calledOnce);
    });
  });

  context('#mute', () => {
    it('should mute by getting current volume then setting volume to 0', () => {
      vimeo.mute();

      assert(mockApi.getVolume.calledOnce);
      assert(mockApi.setVolume.calledOnce);
      assert(mockApi.setVolume.calledWithExactly(0));
    });
  });

  context('#unmute', () => {
    it('should unmute by setting volume to last volume', () => {
      vimeo.unmute();

      assert(mockApi.setVolume.calledOnce);
    });
  });

  context('#getMuted', () => {
    it('should get muted', () => {
      vimeo.getMuted(mockReturns);

      assert(mockApi.getVolume.calledOnce);
      assert(mockReturns.calledOnce);
    });
  });

  context('#setVolume', () => {
    it('should set volume', () => {
      vimeo.setVolume(75);

      assert(mockApi.setVolume.calledOnce);
      assert(mockApi.setVolume.calledWithExactly(0.75)); // formatedd
    });
  });

  context('#getVolume', () => {
    it('should get volume', () => {
      vimeo.getVolume(mockReturns);

      assert(mockApi.getVolume.calledOnce);
      assert(mockReturns.calledOnce);
    });
  });

  context('#getDuration', () => {
    it('should get duration', () => {
      vimeo.getDuration(mockReturns);

      assert(mockApi.getDuration.calledOnce);
      assert(mockReturns.calledOnce);
    });
  });

  context('#setCurrentTime', () => {
    it('should set current time', () => {
      vimeo.setCurrentTime(60);

      assert(mockApi.setCurrentTime.calledOnce);
      assert(mockApi.setCurrentTime.calledWithExactly(60));
    });
  });

  context('#getCurrentTime', () => {
    it('should get current time', () => {
      vimeo.getCurrentTime(mockReturns);

      assert(mockApi.getCurrentTime.calledOnce);
      assert(mockReturns.calledOnce);
    });
  });

  context('#setLoop', () => {
    it('should set loop state', () => {
      vimeo.setLoop(true);

      assert(mockApi.setLoop.calledWithExactly(true));
    });
  });

  context('#getLoop', () => {
    it('get loop state', () => {
      vimeo.getLoop(mockReturns);

      assert(mockApi.getLoop.calledOnce);
      assert(mockReturns.calledOnce);
    });
  });
});