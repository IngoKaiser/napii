'use strict';
const assert = require('assert');
var hello = require('../');

describe('Hello Module', () => {
  it('should return same results from js and napi module', () => {
    const napi = hello.world();
    const js = hello.js.world();
    assert.equal(napi,js);
  });
});
