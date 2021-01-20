"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AfterimagePass = void 0;

var _threeModule = require("../../../build/three.module.js");

var _Pass = require("../postprocessing/Pass.js");

var _AfterimageShader = require("../shaders/AfterimageShader.js");

/**
 * @author HypnosNova / https://www.threejs.org.cn/gallery/
 */
var AfterimagePass = function AfterimagePass(damp) {
  _Pass.Pass.call(this);

  if (_AfterimageShader.AfterimageShader === undefined) console.error("AfterimagePass relies on AfterimageShader");
  this.shader = _AfterimageShader.AfterimageShader;
  this.uniforms = _threeModule.UniformsUtils.clone(this.shader.uniforms);
  this.uniforms["damp"].value = damp !== undefined ? damp : 0.96;
  this.textureComp = new _threeModule.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
    minFilter: _threeModule.LinearFilter,
    magFilter: _threeModule.NearestFilter,
    format: _threeModule.RGBAFormat
  });
  this.textureOld = new _threeModule.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
    minFilter: _threeModule.LinearFilter,
    magFilter: _threeModule.NearestFilter,
    format: _threeModule.RGBAFormat
  });
  this.shaderMaterial = new _threeModule.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: this.shader.vertexShader,
    fragmentShader: this.shader.fragmentShader
  });
  this.compFsQuad = new _Pass.Pass.FullScreenQuad(this.shaderMaterial);
  var material = new _threeModule.MeshBasicMaterial();
  this.copyFsQuad = new _Pass.Pass.FullScreenQuad(material);
};

exports.AfterimagePass = AfterimagePass;
AfterimagePass.prototype = Object.assign(Object.create(_Pass.Pass.prototype), {
  constructor: AfterimagePass,
  render: function render(renderer, writeBuffer, readBuffer) {
    this.uniforms["tOld"].value = this.textureOld.texture;
    this.uniforms["tNew"].value = readBuffer.texture;
    renderer.setRenderTarget(this.textureComp);
    this.compFsQuad.render(renderer);
    this.copyFsQuad.material.map = this.textureComp.texture;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.copyFsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      this.copyFsQuad.render(renderer);
    } // Swap buffers.


    var temp = this.textureOld;
    this.textureOld = this.textureComp;
    this.textureComp = temp; // Now textureOld contains the latest image, ready for the next frame.
  },
  setSize: function setSize(width, height) {
    this.textureComp.setSize(width, height);
    this.textureOld.setSize(width, height);
  }
});