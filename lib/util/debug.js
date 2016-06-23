/**
  * Helper methods for debugging
  */
export default {
  log: function () {
    if (window.DEBUG && window.console) {
      window.console.log.apply(
        window.console,
        Array.prototype.slice.call(arguments)
      );
    }
  }
};
