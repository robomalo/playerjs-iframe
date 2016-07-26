import postMessage from '../../../src/util/post-message';

define('postMessage()', () => {
  const data = { foo: 'bar' };

  let postMessageStub;

  before(() => {
    postMessageStub = sinon.stub(window.parent, 'postMessage');

    postMessage(data);
  });

  after(() => {
    postMessageStub.restore();
  });

  it('should call window.parent.postMessage()', () => {
    expect(postMessageStub.called).to.be.true;
  });

  it('should JSON.stringify the data', () => {
    let stubData = postMessageStub.args[0][0];

    expect(stubData).to.be.a.string;
    expect(stubData).to.be.equal(JSON.stringify(data));
  });
});