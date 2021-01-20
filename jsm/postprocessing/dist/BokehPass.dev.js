"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BokehPass = void 0;

var _threeModule = require("../../../build/three.module.js");

var _Pass = require("../postprocessing/Pass.js");

var _BokehShader = require("../shaders/BokehShader.js");

/**
 * Depth-of-field post-process with bokeh shader
 */
var BokehPass = function BokehPass(scene, camera, params) {
  _Pass.Pass.call(this);

  this.scene = scene;
  this.camera = camera;
  var focus = params.focus !== undefined ? params.focus : 1.0;
  var aspect = params.aspect !== undefined ? params.aspect : camera.aspect;
  var aperture = params.aperture !== undefined ? params.aperture : 0.025;
  var maxblur = params.maxblur !== undefined ? params.maxblur : 1.0; // render targets

  var width = params.width || window.innerWidth || 1;
  var height = params.height || window.innerHeight || 1;
  this.renderTargetColor = new _threeModule.WebGLRenderTarget(width, height, {
    minFilter: _threeModule.LinearFilter,
    magFilter: _threeModule.LinearFilter,
    format: _threeModule.RGBFormat
  });
  this.renderTargetColor.texture.name = "BokehPass.color";
  this.renderTargetDepth = this.renderTargetColor.clone();
  this.renderTargetDepth.texture.name = "BokehPass.depth"; // depth material

  this.materialDepth = new _threeModule.MeshDepthMaterial();
  this.materialDepth.depthPacking = _threeModule.RGBADepthPacking;
  this.materialDepth.blending = _threeModule.NoBlending; // bokeh material

  if (_BokehShader.BokehShader === undefined) {
    console.error("BokehPass relies on BokehShader");
  }

  var bokehShader = _BokehShader.BokehShader;

  var bokehUniforms = _threeModule.UniformsUtils.clone(bokehShader.uniforms);

  bokehUniforms["tDepth"].value = this.renderTargetDepth.texture;
  bokehUniforms["focus"].value = focus;
  bokehUniforms["aspect"].value = aspect;
  bokehUniforms["aperture"].value = aperture;
  bokehUniforms["maxblur"].value = maxblur;
  bokehUniforms["nearClip"].value = camera.near;
  bokehUniforms["farClip"].value = camera.far;
  this.materialBokeh = new _threeModule.ShaderMaterial({
    defines: Object.assign({}, bokehShader.defines),
    uniforms: bokehUniforms,
    vertexShader: bokehShader.vertexShader,
    fragmentShader: bokehShader.fragmentShader
  });
  this.uniforms = bokehUniforms;
  this.needsSwap = false;
  this.fsQuad = new _Pass.Pass.FullScreenQuad(this.materialBokeh);
  this.oldClearColor = new _threeModule.Color();
};

exports.BokehPass = BokehPass;
BokehPass.prototype = Object.assign(Object.create(_Pass.Pass.prototype), {
  constructor: BokehPass,
  render: function render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive*/
  ) {
    // Render depth into texture
    this.scene.overrideMaterial = this.materialDepth;
    this.oldClearColor.copy(renderer.getClearColor());
    var oldClearAlpha = renderer.getClearAlpha();
    var oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    renderer.setClearColor(0xffffff);
    renderer.setClearAlpha(1.0);
    renderer.setRenderTarget(this.renderTargetDepth);
    renderer.clear();
    renderer.render(this.scene, this.camera); // Render bokeh composite

    this.uniforms["tColor"].value = readBuffer.texture;
    this.uniforms["nearClip"].value = this.camera.near;
    this.uniforms["farClip"].value = this.camera.far;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      renderer.clear();
      this.fsQuad.render(renderer);
    }

    this.scene.overrideMaterial = null;
    renderer.setClearColor(this.oldClearColor);
    renderer.setClearAlpha(oldClearAlpha);
    renderer.autoClear = oldAutoClear;
  }
});