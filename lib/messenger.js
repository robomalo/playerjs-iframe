import debug from "./util/debug";
import enums from "./enums";

export default Messenger;

/**
  * Handles the sending and receiving of messages cross-window
  *
  * @constructor
  * @param    {Object} config - the configuration
  */
function Messenger(config) {
  this.config = config || {};

  // the messenger will maintain a list of all the listeners
  this.listeners = {};

  // handle all calls to `addEventListener`
  this.on(enums.METHODS.ADDEVENTLISTENER, (value, data) => {
    debug.log("[messenger#addEventListener]", data);
    // only add the listener if it"s not already there
    if (indexOf(this.listeners[data.value], data.listener) === -1) {
      // add the listener to the array of listeners
      this.listeners[data.value] = (this.listeners[data.value] || []).concat(data.listener);
    }
  });

  // handle all calls to `removeEventListener`
  this.on(enums.METHODS.REMOVEEVENTLISTENER, (value, data) => {
    debug.log("[messenger#removeEventListener]", data);
    // if the listener exists...
    let index = indexOf(this.listeners[data.value], data.listener);
    if (index !== -1) {
      // remove it
      this.listeners[data.value] = this.listeners[data.value].splice(index, 1);
    }
  });
};

/**
  * Emits the given data payload as a message
  *
  * @param    {Object} data - the payload to message
  */
Messenger.prototype.emit = function(data) {
  if (typeof data === "string") {
    data = {
      event: data
    };
  }

  // augment the data payload with config defaults
  data = Object.keys(this.config).reduce((data, key) => {
    if (!data.hasOwnProperty(key)) {
      data[key] = this.config[key];
    }
    return data;
  }, data || {});

  // if it"s the "ready" event, emit now
  if (data.event === enums.EVENTS.READY) {
    postMessage(data);
  }
  // if the data object already has a listener, broadcast to that listener only
  // otherwise, broadcast to ALL known listeners for the given event
  else {
    let listeners = data.listener ? [data.listener] : this.listeners[data.event] || [];
    listeners.forEach((listener) => {
      data.listener = listener;
      debug.log("[messenger#emit]", data);
      postMessage(data);
    });
  }

  return this;
};

/**
  * Subscribes to a given method
  *
  * @param    {String} method - the method to subscribe to
  * @param    {Function} callback - the callback to invoke when the method event occurs
  */
Messenger.prototype.on = function(method, callback) {
  window.addEventListener("message", (message) => {
    // TODO - security - origin check
    try {
      // parse the data
      let data = JSON.parse(message.data);
      // if a context is set, check that the context matches
      if (!this.config.context || (data.context === this.config.context)) {
        // if the method is the one we want...
        if (data.method === method && callback) {
          // invoke the callback
          callback(data.value, data);
        }
      }
    }
    catch (e) {}
  });

  return this;
};

/**
  * emits the return value for a given method call
  *
  * @param    {Object} data - the original method call data
  * @param    {*} value - the value to return
  */
Messenger.prototype.returns = function(data, value) {
  data.value = value;
  data.event = data.method || data.event;
  delete data.method;
  this.emit(data);
};

function postMessage(data) {
  // TODO - security?
  // send the message to the parent
  window.parent.postMessage(JSON.stringify(data), "*");
}

function indexOf(array, item) {
  if (!array || !item) {
    return -1;
  }
  return array.indexOf(item);
}
