/**
 * Script element name
 * @type {String}
 */
const SCRIPT = 'script';

/**
 * Script parent element
 * @type {String}
 */
const SCRIPT_PARENT = document.head || document.body;

/**
 * Script ready events
 * @type {RegExp}
 */
const READY_EVENTS = /loaded|complete/;

/**
 * Append script tag to head or body
 * @param {String} src - script source URL
 * @returns {Promise}
 */
export default function getScript(src) {
  return new Promise((resolve, reject) => {
    // Do not embed the script if it already exists
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();

      return;
    }

    let script = document.createElement(SCRIPT);

    script.async = true;

    SCRIPT_PARENT.appendChild(script);

    script.onload = script.onreadystatechange = (unused, aborted) => {
      if (aborted || !script.readyState || READY_EVENTS.test(script.readyState)) {
        script.onload = script.onreadystatechange = null;
        script = undefined;

        if (aborted) {
          reject();
        } else {
          resolve();
        }
      }
    };

    script.src = src;
  });
};
