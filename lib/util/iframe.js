export default Iframe;

function Iframe(src, attributes = {}) {
  const defaultAttributes = {
    width: "100%",
    height: "100%",
    frameBorder: "0",
    scrolling: "no",
    allowfullscreen: "1"
  };
  attributes = {...defaultAttributes, ...attributes};

  this.iframe = document.createElement("iframe");

  Object.keys(attributes).forEach((key) => {
    this.iframe.setAttribute(key, attributes[key]);
  });

  this.iframe.src = src;
}

Iframe.prototype.appendTo = function(node) {
  if (node) {
    node.appendChild(this.iframe);
  }
};
