import postMessage from '../../../src/util/post-message';

define('postMessage()', () => {
  const data = { foo: 'bar' };
  const targetOrigin = window.location.origin;

  let postMessageStub;

  before(() => {
    postMessageStub = sinon.stub(window.parent, 'postMessage');
   });

  after(() => {
    postMessageStub.restore();
  });

  it('should not call window.parent.postMessage() without targetOrigin', () => {
    postMessage(data);

    assert.isFalse(postMessageStub.called);
  });

  it('should call window.parent.postMessage()', () => {
    postMessage(data, targetOrigin);

    assert(postMessageStub.called);
  });

  it('should JSON.stringify the data', () => {
    postMessage(data, targetOrigin);

    let stubData = postMessageStub.args[0][0];

    expect(stubData).to.be.a.string;
    expect(stubData).to.be.equal(JSON.stringify(data));
  });
});