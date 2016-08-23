import Messenger from '../../../src/messenger';
import BaseAdapter from '../../../src/adapters/base';

describe('BaseAdapter', () => {
  let messenger,
      baseAdapter;

  before(() => {
    messenger = new Messenger({
      context: 'test',
      targetOrigin: window.location.origin
    });

    baseAdapter = new BaseAdapter({ foo: 'bar' }, messenger);

    baseAdapter.supportedMethods = ['play'];
    baseAdapter.supportedEvents = ['pause'];
  });

  context('#constructor', () => {
    it('should set the config', () => {
      expect(baseAdapter.config).to.be.an('object');
    });

    it('should set the messenger', () => {
      expect(baseAdapter.messenger).to.be.an.instanceof(Messenger);
    });
  });

  context('#ready', () => {
    before(() => {
      let spy = sinon.spy(messenger, 'emit')

      baseAdapter.ready();
    });

    after(() => {
      messenger.emit.restore();
    });

    it('should emit the messenger ready event', () => {
      expect(messenger.emit.calledOnce).to.equal(true);
    });
  });


  context('#supportedEvents', () => {
    it('should have supported events placeholder', () => {
      expect(baseAdapter.supportedEvents).to.be.an('array');
    });
  });

  context('#supportedMethods', () => {
    it('should have supported methods placeholder', () => {
      expect(baseAdapter.supportedMethods).to.be.an('array');
    });
  });

  context('#supports', () => {
    it('should check for suppported methods', () => {
      assert(baseAdapter.supports('method', 'play'));
      assert.isFalse(baseAdapter.supports('method', 'pause'));
    });

    it('should check for supported events', () => {
      assert(baseAdapter.supports('event', 'pause'));
      assert.isFalse(baseAdapter.supports('event', 'play'));
    });
  });
});