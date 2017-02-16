// Main src
var a = require('../src/index.js');

// Tests
var tests = require.context('./unit', true);
tests.keys().forEach((item) => {
  require('./unit'+item.replace('.',''));
});