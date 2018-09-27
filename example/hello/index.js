'use strict';

var hello_js = require("./lib/js/hello.js");
var hello_napi = require('./build/Release/hello.node');

module.exports = {
  world: hello_napi.world,
  js: hello_js
}