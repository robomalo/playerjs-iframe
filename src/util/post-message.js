/**
 * Send post message
 * @param {Object} data - post data
 */
export default function postMessage(data, targetOrigin) {
  if (!targetOrigin) {
    return;
  }

  window.parent.postMessage(JSON.stringify(data), targetOrigin);
}
