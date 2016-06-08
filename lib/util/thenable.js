export default Thenable;

/**
  * Very simplistic implementation of a Promise like Thenable avoid clallback hell
  *
  * @constructor
  * @param    {Function} executor - the executor which is passed the fulfill and reject methods
  */
function Thenable(executor) {
  this.callbacks = [];
  this.state;
  this.data;

  function resolver(state, data) {
    if (!this.state) {
      this.state = state;
      this.data = data;
      this.callbacks.forEach(handleCallback.bind(this));
      this.callbacks = [];
    }
  }

  executor(resolver.bind(this, "fulfill"), resolver.bind(this, "reject"));
}

/**
  * Invoked after the promise has resolved. Note this is not chainable.
  *
  * @param   {Function} onFulfill - called if the promise is fulfilled
  * @param   {Function} onReject - called if the promise is rejected
  */
Thenable.prototype.then = function(onFulfill, onReject) {
  handleCallback.call(this, {
    fulfill: onFulfill,
    reject: onReject
  });
};

// callback handler
function handleCallback(callback) {
  if (!this.state) {
    this.callbacks.push(callback);
  }
  else if (callback[this.state]) {
    callback[this.state](this.data);
  }
}
