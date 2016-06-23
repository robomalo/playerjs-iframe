/**
 * [postMessage description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export default function postMessage(data) {
  window.parent.postMessage(JSON.stringify(data), '*');
}
