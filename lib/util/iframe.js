/**
 * Iframe element name
 * @type {String}
 */
const IFRAME = 'iframe';

/**
 * Default iframe attributes
 * @type {Object}
 */
const DEFAULT_ATTRIBUTES = {
  width: '100%',
  height: '100%',
  frameBorder: '0',
  scrolling: 'no',
  allowfullscreen: '1'
};

/**
 * Iframe DOM element creator class
 * @class
 */
export default class Iframe {
  /**
   * Create a new iframe DOM element
   * @param {String} src - iframe source URL
   * @param {Object} attributes - custom iframe attributes
   */
  constructor(src, attributes) {
    attributes = {...DEFAULT_ATTRIBUTES, ...attributes};

    this.iframe = document.createElement(IFRAME);

    Object.keys(attributes).forEach((key) => {
      this.iframe.setAttribute(key, attributes[key]);
    });

    this.iframe.src = src;
  }

  /**
   * Append iframe to DOM element
   * @param {HTMLElement} node - iframe parent
   */
  appendTo(node) {
    if (node) {
      node.appendChild(this.iframe);
    }
  }
}
