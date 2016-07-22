import getScript from '../../../src/util/get-script';

describe('getScript()', () => {
  const src = '//ajax.googleapis.com/ajax/libs/hammerjs/2.0.8/hammer.min.js';
  const query = `script[src="${src}"]`;

  afterEach(() => {
    let el = document.querySelector(query);

    if (el) {
      el.parentNode.removeChild(el);
    }

    return Promise.resolve();
  });

  it('should add script tag to DOM', () => {
    return getScript(src).then(() => {
      expect(document.querySelector(query)).to.be.ok;
    });
  });

  it('should not duplicate script tags', () => {
    let firstScriptResolved = false;

    return getScript(src).then(() => {
      firstScriptResolved = true;

      return getScript(src);
    }).catch((message) => {
      expect(firstScriptResolved).to.be.true;
      expect(message).to.contain('already exists');
      expect(document.querySelectorAll(query)).to.have.length.of(1);
    });
  });
});