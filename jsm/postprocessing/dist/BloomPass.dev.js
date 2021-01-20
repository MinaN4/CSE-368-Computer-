"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BloomPass = void 0;

var _threeModule = require("../../../build/three.module.js");

var _Pass = require("../postprocessing/Pass.js");

var _CopyShader = require("../shaders/CopyShader.js");

var _ConvolutionShader = require("../shaders/ConvolutionShader.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
var BloomPass = function BloomPass(strength, kernelSize, sigma, resolution) {
  _Pass.Pass.call(this);

  strength = strength !== undefined ? strength : 1;
  kernelSize = kernelSize !== undefined ? kernelSize : 25;
  sigma = sigma !== undefined ? sigma : 4.0;
  resolution = resolution !== undefined ? resolution : 256; // render targets

  var pars = {
    minFilter: _threeModule.LinearFilter,
    magFilter: _threeModule.LinearFilter,
    format: _threeModule.RGBAFormat
  };
  this.renderTargetX = new _threeModule.WebGLRenderTarget(resolution, resolution, pars);
  this.renderTargetX.texture.name = "BloomPass.x";
  this.renderTargetY = new _threeModule.WebGLRenderTarget(resolution, resolution, pars);
  this.renderTargetY.texture.name = "BloomPass.y"; // copy material

  if (_CopyShader.CopyShader === undefined) console.error("BloomPass relies on CopyShader");
  var copyShader = _CopyShader.CopyShader;
  this.copyUniforms = _threeModule.UniformsUtils.clone(copyShader.uniforms);
  this.copyUniforms["opacity"].value = strength;
  this.materialCopy = new _threeModule.ShaderMaterial({
    uniforms: this.copyUniforms,
    vertexShader: copyShader.vertexShader,
    fragmentShader: copyShader.fragmentShader,
    blending: _threeModule.AdditiveBlending,
    transparent: true
  }); // convolution material

  if (_ConvolutionShader.ConvolutionShader === undefined) console.error("BloomPass relies on ConvolutionShader");
  var convolutionShader = _ConvolutionShader.ConvolutionShader;
  this.convolutionUniforms = _threeModule.UniformsUtils.clone(convolutionShader.uniforms);
  this.convolutionUniforms["uImageIncrement"].value = BloomPass.blurX;
  this.convolutionUniforms["cKernel"].value = _ConvolutionShader.ConvolutionShader.buildKernel(sigma);
  this.materialConvolution = new _threeModule.ShaderMaterial({
    uniforms: this.convolutionUniforms,
    vertexShader: convolutionShader.vertexShader,
    fragmentShader: convolutionShader.fragmentShader,
    defines: {
      "KERNEL_SIZE_FLOAT": kernelSize.toFixed(1),
      "KERNEL_SIZE_INT": kernelSize.toFixed(0)
    }
  });
  this.needsSwap = false;
  this.fsQuad = new _Pass.Pass.FullScreenQuad(null);
};

exports.BloomPass = BloomPass;
BloomPass.prototype = Object.assign(Object.create(_Pass.Pass.prototype), {
  constructor: BloomPass,
  render: function render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    if (maskActive) renderer.state.buffers.stencil.setTest(false); // Render quad with blured scene into texture (convolution pass 1)

    this.fsQuad.material = this.materialConvolution;
    this.convolutionUniforms["tDiffuse"].value = readBuffer.texture;
    this.convolutionUniforms["uImageIncrement"].value = BloomPass.blurX;
    renderer.setRenderTarget(this.renderTargetX);
    renderer.clear();
    this.fsQuad.render(renderer); // Render quad with blured scene into texture (convolution pass 2)

    this.convolutionUniforms["tDiffuse"].value = this.renderTargetX.texture;
    this.convolutionUniforms["uImageIncrement"].value = BloomPass.blurY;
    renderer.setRenderTarget(this.renderTargetY);
    renderer.clear();
    this.fsQuad.render(renderer); // Render original scene with superimposed blur to texture

    this.fsQuad.material = this.materialCopy;
    this.copyUniforms["tDiffuse"].value = this.renderTargetY.texture;
    if (maskActive) renderer.state.buffers.stencil.setTest(true);
    renderer.setRenderTarget(readBuffer);
    if (this.clear) renderer.clear();
    this.fsQuad.render(renderer);
  }
});
BloomPass.blurX = new _threeModule.Vector2(0.001953125, 0.0);
BloomPass.blurY = new _threeModule.Vector2(0.0, 0.001953125);