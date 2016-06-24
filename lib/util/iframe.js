const DEFAULT_ATTRIBUTES = {
  width: '100%',
  height: '100%',
  frameBorder: '0',
  scrolling: 'no',
  allowfullscreen: '1'
};

export default class Iframe {
  constructor(src, attributes) {
    attributes = {...DEFAULT_ATTRIBUTES, ...attributes};

    this.iframe = document.createElement('iframe');

    Object.keys(attributes).forEach((key) => {
      this.iframe.setAttribute(key, attributes[key]);
    });

    this.iframe.src = src;
  }

  appendTo(node) {
    if (node) {
      node.appendChild(this.iframe);
    }
  }
}
