import getScript from '../../../src/util/get-script';

describe('getScript()', () => {
  const src = '//ajax.googleapis.com/ajax/libs/hammerjs/2.0.8/hammer.min.js';
  const query = `script[src="${src}"]`;

  afterEach(() => {
    let el = document.querySelector(query);

    if (el) {
      el.parentNode.removeChild(el);
    }
  });

  it('should add script tag to DOM', (done) => {
    getScript(src).then(() => {
      expect(document.querySelector(query)).to.be.ok;
      done();
    });
  });

  it('should not duplicate script tags', (done) => {
    let firstScriptResolved = false;

    getScript(src).then(() => {
      firstScriptResolved = true;

      return getScript(src);
    }).then(() => {
      assert(firstScriptResolved);
      expect(document.querySelectorAll(query)).to.have.length.of(1);
      done();
    });
  });
});