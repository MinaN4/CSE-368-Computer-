"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLMultisampleRenderTarget = WebGLMultisampleRenderTarget;

var _WebGLRenderTarget = require("./WebGLRenderTarget.js");

/**
 * @author Mugen87 / https://github.com/Mugen87
 * @author Matt DesLauriers / @mattdesl
 */
function WebGLMultisampleRenderTarget(width, height, options) {
  _WebGLRenderTarget.WebGLRenderTarget.call(this, width, height, options);

  this.samples = 4;
}

WebGLMultisampleRenderTarget.prototype = Object.assign(Object.create(_WebGLRenderTarget.WebGLRenderTarget.prototype), {
  constructor: WebGLMultisampleRenderTarget,
  isWebGLMultisampleRenderTarget: true,
  copy: function copy(source) {
    _WebGLRenderTarget.WebGLRenderTarget.prototype.copy.call(this, source);

    this.samples = source.samples;
    return this;
  }
});