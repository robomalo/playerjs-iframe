import Messenger from '../../../src/messenger';
import BaseAdapter from '../../../src/adapters/base';

describe('BaseAdapter', () => {
  let messenger,
      baseAdapter;

  before(() => {
    messenger = {
      context: 'test',
      emit: sinon.spy(),
      on: sinon.spy()
    };

    baseAdapter = new BaseAdapter({ foo: 'bar' }, messenger);

    baseAdapter.supportedMethods = ['play'];
    baseAdapter.supportedEvents = ['pause'];
  });

  context('#ready', () => {
    after(() => {
      messenger.emit.reset();
    });

    it('should emit the messenger ready event', () => {
      baseAdapter.ready();

      assert(messenger.emit.calledOnce);
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
});