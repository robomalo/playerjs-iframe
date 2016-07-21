import Iframe from '../../../src/util/iframe';

describe('Iframe', () => {
  let iframe = new Iframe('#', { name: 'test' });
  let iframeEl = iframe.iframe;

  context('#constructor', () => {
    it('should create a new iframe', () => {
      expect(iframeEl).to.be.ok;
    });

    it('should set the src', () => {
      expect(iframeEl.src).to.contain('#');
    });

    it('should add attributes', () => {
      expect(iframeEl.width).to.equal('100%');
      expect(iframeEl.name).to.equal('test');
    });
  });

  context('#appendTo()', () => {
    it('should append iframe to parent element', () => {
      let iframeParent = document.createElement('div');

      iframe.appendTo(iframeParent);

      expect(iframeParent.firstChild).to.equal(iframeEl);
    })
  });
});
