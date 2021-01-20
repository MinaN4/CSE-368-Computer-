"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TexturePass = void 0;

var _threeModule = require("../../../build/three.module.js");

var _Pass = require("../postprocessing/Pass.js");

var _CopyShader = require("../shaders/CopyShader.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
var TexturePass = function TexturePass(map, opacity) {
  _Pass.Pass.call(this);

  if (_CopyShader.CopyShader === undefined) console.error("TexturePass relies on CopyShader");
  var shader = _CopyShader.CopyShader;
  this.map = map;
  this.opacity = opacity !== undefined ? opacity : 1.0;
  this.uniforms = _threeModule.UniformsUtils.clone(shader.uniforms);
  this.material = new _threeModule.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader,
    depthTest: false,
    depthWrite: false
  });
  this.needsSwap = false;
  this.fsQuad = new _Pass.Pass.FullScreenQuad(null);
};

exports.TexturePass = TexturePass;
TexturePass.prototype = Object.assign(Object.create(_Pass.Pass.prototype), {
  constructor: TexturePass,
  render: function render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive */
  ) {
    var oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    this.fsQuad.material = this.material;
    this.uniforms["opacity"].value = this.opacity;
    this.uniforms["tDiffuse"].value = this.map;
    this.material.transparent = this.opacity < 1.0;
    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    if (this.clear) renderer.clear();
    this.fsQuad.render(renderer);
    renderer.autoClear = oldAutoClear;
  }
});