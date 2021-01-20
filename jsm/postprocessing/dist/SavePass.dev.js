"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavePass = void 0;

var _threeModule = require("../../../build/three.module.js");

var _Pass = require("../postprocessing/Pass.js");

var _CopyShader = require("../shaders/CopyShader.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
var SavePass = function SavePass(renderTarget) {
  _Pass.Pass.call(this);

  if (_CopyShader.CopyShader === undefined) console.error("SavePass relies on CopyShader");
  var shader = _CopyShader.CopyShader;
  this.textureID = "tDiffuse";
  this.uniforms = _threeModule.UniformsUtils.clone(shader.uniforms);
  this.material = new _threeModule.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
  });
  this.renderTarget = renderTarget;

  if (this.renderTarget === undefined) {
    this.renderTarget = new _threeModule.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: _threeModule.LinearFilter,
      magFilter: _threeModule.LinearFilter,
      format: _threeModule.RGBFormat,
      stencilBuffer: false
    });
    this.renderTarget.texture.name = "SavePass.rt";
  }

  this.needsSwap = false;
  this.fsQuad = new _Pass.Pass.FullScreenQuad(this.material);
};

exports.SavePass = SavePass;
SavePass.prototype = Object.assign(Object.create(_Pass.Pass.prototype), {
  constructor: SavePass,
  render: function render(renderer, writeBuffer, readBuffer) {
    if (this.uniforms[this.textureID]) {
      this.uniforms[this.textureID].value = readBuffer.texture;
    }

    renderer.setRenderTarget(this.renderTarget);
    if (this.clear) renderer.clear();
    this.fsQuad.render(renderer);
  }
});