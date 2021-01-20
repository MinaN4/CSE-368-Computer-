"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DotScreenPass = void 0;

var _threeModule = require("../../../build/three.module.js");

var _Pass = require("../postprocessing/Pass.js");

var _DotScreenShader = require("../shaders/DotScreenShader.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
var DotScreenPass = function DotScreenPass(center, angle, scale) {
  _Pass.Pass.call(this);

  if (_DotScreenShader.DotScreenShader === undefined) console.error("DotScreenPass relies on DotScreenShader");
  var shader = _DotScreenShader.DotScreenShader;
  this.uniforms = _threeModule.UniformsUtils.clone(shader.uniforms);
  if (center !== undefined) this.uniforms["center"].value.copy(center);
  if (angle !== undefined) this.uniforms["angle"].value = angle;
  if (scale !== undefined) this.uniforms["scale"].value = scale;
  this.material = new _threeModule.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
  });
  this.fsQuad = new _Pass.Pass.FullScreenQuad(this.material);
};

exports.DotScreenPass = DotScreenPass;
DotScreenPass.prototype = Object.assign(Object.create(_Pass.Pass.prototype), {
  constructor: DotScreenPass,
  render: function render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive */
  ) {
    this.uniforms["tDiffuse"].value = readBuffer.texture;
    this.uniforms["tSize"].value.set(readBuffer.width, readBuffer.height);

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      this.fsQuad.render(renderer);
    }
  }
});