"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLMultiviewRenderTarget = WebGLMultiviewRenderTarget;

var _WebGLRenderTarget = require("./WebGLRenderTarget.js");

/**
 * @author fernandojsg / http://fernandojsg.com
 * @author Takahiro https://github.com/takahirox
 */
function WebGLMultiviewRenderTarget(width, height, numViews, options) {
  _WebGLRenderTarget.WebGLRenderTarget.call(this, width, height, options);

  this.depthBuffer = false;
  this.stencilBuffer = false;
  this.numViews = numViews;
}

WebGLMultiviewRenderTarget.prototype = Object.assign(Object.create(_WebGLRenderTarget.WebGLRenderTarget.prototype), {
  constructor: WebGLMultiviewRenderTarget,
  isWebGLMultiviewRenderTarget: true,
  copy: function copy(source) {
    _WebGLRenderTarget.WebGLRenderTarget.prototype.copy.call(this, source);

    this.numViews = source.numViews;
    return this;
  },
  setNumViews: function setNumViews(numViews) {
    if (this.numViews !== numViews) {
      this.numViews = numViews;
      this.dispose();
    }

    return this;
  }
});