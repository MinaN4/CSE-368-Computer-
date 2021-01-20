"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HalftonePass = void 0;

var _threeModule = require("../../../build/three.module.js");

var _Pass = require("../postprocessing/Pass.js");

var _HalftoneShader = require("../shaders/HalftoneShader.js");

/**
 * @author meatbags / xavierburrow.com, github/meatbags
 *
 * RGB Halftone pass for three.js effects composer. Requires HalftoneShader.
 *
 */
var HalftonePass = function HalftonePass(width, height, params) {
  _Pass.Pass.call(this);

  if (_HalftoneShader.HalftoneShader === undefined) {
    console.error('THREE.HalftonePass requires HalftoneShader');
  }

  this.uniforms = _threeModule.UniformsUtils.clone(_HalftoneShader.HalftoneShader.uniforms);
  this.material = new _threeModule.ShaderMaterial({
    uniforms: this.uniforms,
    fragmentShader: _HalftoneShader.HalftoneShader.fragmentShader,
    vertexShader: _HalftoneShader.HalftoneShader.vertexShader
  }); // set params

  this.uniforms.width.value = width;
  this.uniforms.height.value = height;

  for (var key in params) {
    if (params.hasOwnProperty(key) && this.uniforms.hasOwnProperty(key)) {
      this.uniforms[key].value = params[key];
    }
  }

  this.fsQuad = new _Pass.Pass.FullScreenQuad(this.material);
};

exports.HalftonePass = HalftonePass;
HalftonePass.prototype = Object.assign(Object.create(_Pass.Pass.prototype), {
  constructor: HalftonePass,
  render: function render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive*/
  ) {
    this.material.uniforms["tDiffuse"].value = readBuffer.texture;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      this.fsQuad.render(renderer);
    }
  },
  setSize: function setSize(width, height) {
    this.uniforms.width.value = width;
    this.uniforms.height.value = height;
  }
});