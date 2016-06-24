/**
 * Send post message
 * @param {Object} data - post data
 * @todo Replace '*' with domains
 */
export default function postMessage(data) {
  window.parent.postMessage(JSON.stringify(data), '*');
}
