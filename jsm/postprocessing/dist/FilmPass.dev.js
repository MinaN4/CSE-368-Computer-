"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilmPass = void 0;

var _threeModule = require("../../../build/three.module.js");

var _Pass = require("../postprocessing/Pass.js");

var _FilmShader = require("../shaders/FilmShader.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
var FilmPass = function FilmPass(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale) {
  _Pass.Pass.call(this);

  if (_FilmShader.FilmShader === undefined) console.error("FilmPass relies on FilmShader");
  var shader = _FilmShader.FilmShader;
  this.uniforms = _threeModule.UniformsUtils.clone(shader.uniforms);
  this.material = new _threeModule.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
  });
  if (grayscale !== undefined) this.uniforms.grayscale.value = grayscale;
  if (noiseIntensity !== undefined) this.uniforms.nIntensity.value = noiseIntensity;
  if (scanlinesIntensity !== undefined) this.uniforms.sIntensity.value = scanlinesIntensity;
  if (scanlinesCount !== undefined) this.uniforms.sCount.value = scanlinesCount;
  this.fsQuad = new _Pass.Pass.FullScreenQuad(this.material);
};

exports.FilmPass = FilmPass;
FilmPass.prototype = Object.assign(Object.create(_Pass.Pass.prototype), {
  constructor: FilmPass,
  render: function render(renderer, writeBuffer, readBuffer, deltaTime
  /*, maskActive */
  ) {
    this.uniforms["tDiffuse"].value = readBuffer.texture;
    this.uniforms["time"].value += deltaTime;

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