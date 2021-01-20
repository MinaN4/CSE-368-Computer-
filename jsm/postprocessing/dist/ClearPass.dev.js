"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearPass = void 0;

var _Pass = require("../postprocessing/Pass.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
var ClearPass = function ClearPass(clearColor, clearAlpha) {
  _Pass.Pass.call(this);

  this.needsSwap = false;
  this.clearColor = clearColor !== undefined ? clearColor : 0x000000;
  this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 0;
};

exports.ClearPass = ClearPass;
ClearPass.prototype = Object.assign(Object.create(_Pass.Pass.prototype), {
  constructor: ClearPass,
  render: function render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive */
  ) {
    var oldClearColor, oldClearAlpha;

    if (this.clearColor) {
      oldClearColor = renderer.getClearColor().getHex();
      oldClearAlpha = renderer.getClearAlpha();
      renderer.setClearColor(this.clearColor, this.clearAlpha);
    }

    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    renderer.clear();

    if (this.clearColor) {
      renderer.setClearColor(oldClearColor, oldClearAlpha);
    }
  }
});