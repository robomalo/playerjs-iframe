/**
 * Send post message
 * @param {Object} data - post data
 * @todo Replace '*' with domains
 */
export default function postMessage(data, origin = '*') {
  window.parent.postMessage(JSON.stringify(data), origin);
}
