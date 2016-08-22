import Messenger from '../../src/messenger';

define('Messenger', () => {
  const messenger = new Messenger({ context: 'test' });

  context('#constructor', () => {
    it('should set properties', () => {
      expect(messenger).to.have.deep.property('config.context', 'test');
    });
  });

  context('#returns', () => {
    let emitStub;

    before(() => {
      emitStub = sinon.stub(messenger.__proto__, 'emit');
    });

    after(() => {
      emitStub.restore();
    });

    it('should format and emit the data', () => {
      messenger.returns({ method: 'foo' }, 'bar');

      assert(emitStub.calledWithExactly({ event: 'foo', value: 'bar' }));
    });
  });
});