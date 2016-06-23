import Thenable from './thenable';

/**
 * Append script tag to head or body
 * @function
 * @returns {Thenable}
 */
export default function getScript(src) {
  return new Thenable((fulfill, reject) => {
    let script = document.createElement('script');

    script.async = true;

    // append it
    (document.head || document.body).appendChild(script);

    // wait until ready...
    script.onload = script.onreadystatechange = (unused, aborted) => {
      if (aborted || !script.readyState || /loaded|complete/.test(script.readyState)) {
        // clear it
        script.onload = script.onreadystatechange = null;
        script = undefined;

        if (aborted) {
          reject();
        } else {
          fulfill();
        }
      }
    };

    // finally, set the src
    script.src = src;
  });
};
