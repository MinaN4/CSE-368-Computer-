"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SSAOPass = void 0;

var _threeModule = require("../../../build/three.module.js");

var _Pass = require("../postprocessing/Pass.js");

var _SimplexNoise = require("../math/SimplexNoise.js");

var _SSAOShader = require("../shaders/SSAOShader.js");

var _CopyShader = require("../shaders/CopyShader.js");

/**
 * @author Mugen87 / https://github.com/Mugen87
 */
var SSAOPass = function SSAOPass(scene, camera, width, height) {
  _Pass.Pass.call(this);

  this.width = width !== undefined ? width : 512;
  this.height = height !== undefined ? height : 512;
  this.clear = true;
  this.camera = camera;
  this.scene = scene;
  this.kernelRadius = 8;
  this.kernelSize = 32;
  this.kernel = [];
  this.noiseTexture = null;
  this.output = 0;
  this.minDistance = 0.005;
  this.maxDistance = 0.1; //

  this.generateSampleKernel();
  this.generateRandomKernelRotations(); // beauty render target with depth buffer

  var depthTexture = new _threeModule.DepthTexture();
  depthTexture.type = _threeModule.UnsignedShortType;
  depthTexture.minFilter = _threeModule.NearestFilter;
  depthTexture.maxFilter = _threeModule.NearestFilter;
  this.beautyRenderTarget = new _threeModule.WebGLRenderTarget(this.width, this.height, {
    minFilter: _threeModule.LinearFilter,
    magFilter: _threeModule.LinearFilter,
    format: _threeModule.RGBAFormat,
    depthTexture: depthTexture,
    depthBuffer: true
  }); // normal render target

  this.normalRenderTarget = new _threeModule.WebGLRenderTarget(this.width, this.height, {
    minFilter: _threeModule.NearestFilter,
    magFilter: _threeModule.NearestFilter,
    format: _threeModule.RGBAFormat
  }); // ssao render target

  this.ssaoRenderTarget = new _threeModule.WebGLRenderTarget(this.width, this.height, {
    minFilter: _threeModule.LinearFilter,
    magFilter: _threeModule.LinearFilter,
    format: _threeModule.RGBAFormat
  });
  this.blurRenderTarget = this.ssaoRenderTarget.clone(); // ssao material

  if (_SSAOShader.SSAOShader === undefined) {
    console.error('THREE.SSAOPass: The pass relies on SSAOShader.');
  }

  this.ssaoMaterial = new _threeModule.ShaderMaterial({
    defines: Object.assign({}, _SSAOShader.SSAOShader.defines),
    uniforms: _threeModule.UniformsUtils.clone(_SSAOShader.SSAOShader.uniforms),
    vertexShader: _SSAOShader.SSAOShader.vertexShader,
    fragmentShader: _SSAOShader.SSAOShader.fragmentShader,
    blending: _threeModule.NoBlending
  });
  this.ssaoMaterial.uniforms['tDiffuse'].value = this.beautyRenderTarget.texture;
  this.ssaoMaterial.uniforms['tNormal'].value = this.normalRenderTarget.texture;
  this.ssaoMaterial.uniforms['tDepth'].value = this.beautyRenderTarget.depthTexture;
  this.ssaoMaterial.uniforms['tNoise'].value = this.noiseTexture;
  this.ssaoMaterial.uniforms['kernel'].value = this.kernel;
  this.ssaoMaterial.uniforms['cameraNear'].value = this.camera.near;
  this.ssaoMaterial.uniforms['cameraFar'].value = this.camera.far;
  this.ssaoMaterial.uniforms['resolution'].value.set(this.width, this.height);
  this.ssaoMaterial.uniforms['cameraProjectionMatrix'].value.copy(this.camera.projectionMatrix);
  this.ssaoMaterial.uniforms['cameraInverseProjectionMatrix'].value.getInverse(this.camera.projectionMatrix); // normal material

  this.normalMaterial = new _threeModule.MeshNormalMaterial();
  this.normalMaterial.blending = _threeModule.NoBlending; // blur material

  this.blurMaterial = new _threeModule.ShaderMaterial({
    defines: Object.assign({}, _SSAOShader.SSAOBlurShader.defines),
    uniforms: _threeModule.UniformsUtils.clone(_SSAOShader.SSAOBlurShader.uniforms),
    vertexShader: _SSAOShader.SSAOBlurShader.vertexShader,
    fragmentShader: _SSAOShader.SSAOBlurShader.fragmentShader
  });
  this.blurMaterial.uniforms['tDiffuse'].value = this.ssaoRenderTarget.texture;
  this.blurMaterial.uniforms['resolution'].value.set(this.width, this.height); // material for rendering the depth

  this.depthRenderMaterial = new _threeModule.ShaderMaterial({
    defines: Object.assign({}, _SSAOShader.SSAODepthShader.defines),
    uniforms: _threeModule.UniformsUtils.clone(_SSAOShader.SSAODepthShader.uniforms),
    vertexShader: _SSAOShader.SSAODepthShader.vertexShader,
    fragmentShader: _SSAOShader.SSAODepthShader.fragmentShader,
    blending: _threeModule.NoBlending
  });
  this.depthRenderMaterial.uniforms['tDepth'].value = this.beautyRenderTarget.depthTexture;
  this.depthRenderMaterial.uniforms['cameraNear'].value = this.camera.near;
  this.depthRenderMaterial.uniforms['cameraFar'].value = this.camera.far; // material for rendering the content of a render target

  this.copyMaterial = new _threeModule.ShaderMaterial({
    uniforms: _threeModule.UniformsUtils.clone(_CopyShader.CopyShader.uniforms),
    vertexShader: _CopyShader.CopyShader.vertexShader,
    fragmentShader: _CopyShader.CopyShader.fragmentShader,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blendSrc: _threeModule.DstColorFactor,
    blendDst: _threeModule.ZeroFactor,
    blendEquation: _threeModule.AddEquation,
    blendSrcAlpha: _threeModule.DstAlphaFactor,
    blendDstAlpha: _threeModule.ZeroFactor,
    blendEquationAlpha: _threeModule.AddEquation
  });
  this.fsQuad = new _Pass.Pass.FullScreenQuad(null);
  this.originalClearColor = new _threeModule.Color();
};

exports.SSAOPass = SSAOPass;
SSAOPass.prototype = Object.assign(Object.create(_Pass.Pass.prototype), {
  constructor: SSAOPass,
  dispose: function dispose() {
    // dispose render targets
    this.beautyRenderTarget.dispose();
    this.normalRenderTarget.dispose();
    this.ssaoRenderTarget.dispose();
    this.blurRenderTarget.dispose(); // dispose geometry

    this.quad.geometry.dispose(); // dispose materials

    this.normalMaterial.dispose();
    this.blurMaterial.dispose();
    this.copyMaterial.dispose();
    this.depthRenderMaterial.dispose();
  },
  render: function render(renderer, writeBuffer
  /*, readBuffer, deltaTime, maskActive */
  ) {
    // render beauty and depth
    renderer.setRenderTarget(this.beautyRenderTarget);
    renderer.clear();
    renderer.render(this.scene, this.camera); // render normals

    this.renderOverride(renderer, this.normalMaterial, this.normalRenderTarget, 0x7777ff, 1.0); // render SSAO

    this.ssaoMaterial.uniforms['kernelRadius'].value = this.kernelRadius;
    this.ssaoMaterial.uniforms['minDistance'].value = this.minDistance;
    this.ssaoMaterial.uniforms['maxDistance'].value = this.maxDistance;
    this.renderPass(renderer, this.ssaoMaterial, this.ssaoRenderTarget); // render blur

    this.renderPass(renderer, this.blurMaterial, this.blurRenderTarget); // output result to screen

    switch (this.output) {
      case SSAOPass.OUTPUT.SSAO:
        this.copyMaterial.uniforms['tDiffuse'].value = this.ssaoRenderTarget.texture;
        this.copyMaterial.blending = _threeModule.NoBlending;
        this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
        break;

      case SSAOPass.OUTPUT.Blur:
        this.copyMaterial.uniforms['tDiffuse'].value = this.blurRenderTarget.texture;
        this.copyMaterial.blending = _threeModule.NoBlending;
        this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
        break;

      case SSAOPass.OUTPUT.Beauty:
        this.copyMaterial.uniforms['tDiffuse'].value = this.beautyRenderTarget.texture;
        this.copyMaterial.blending = _threeModule.NoBlending;
        this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
        break;

      case SSAOPass.OUTPUT.Depth:
        this.renderPass(renderer, this.depthRenderMaterial, this.renderToScreen ? null : writeBuffer);
        break;

      case SSAOPass.OUTPUT.Normal:
        this.copyMaterial.uniforms['tDiffuse'].value = this.normalRenderTarget.texture;
        this.copyMaterial.blending = _threeModule.NoBlending;
        this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
        break;

      case SSAOPass.OUTPUT.Default:
        this.copyMaterial.uniforms['tDiffuse'].value = this.beautyRenderTarget.texture;
        this.copyMaterial.blending = _threeModule.NoBlending;
        this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
        this.copyMaterial.uniforms['tDiffuse'].value = this.blurRenderTarget.texture;
        this.copyMaterial.blending = _threeModule.CustomBlending;
        this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
        break;

      default:
        console.warn('THREE.SSAOPass: Unknown output type.');
    }
  },
  renderPass: function renderPass(renderer, passMaterial, renderTarget, clearColor, clearAlpha) {
    // save original state
    this.originalClearColor.copy(renderer.getClearColor());
    var originalClearAlpha = renderer.getClearAlpha();
    var originalAutoClear = renderer.autoClear;
    renderer.setRenderTarget(renderTarget); // setup pass state

    renderer.autoClear = false;

    if (clearColor !== undefined && clearColor !== null) {
      renderer.setClearColor(clearColor);
      renderer.setClearAlpha(clearAlpha || 0.0);
      renderer.clear();
    }

    this.fsQuad.material = passMaterial;
    this.fsQuad.render(renderer); // restore original state

    renderer.autoClear = originalAutoClear;
    renderer.setClearColor(this.originalClearColor);
    renderer.setClearAlpha(originalClearAlpha);
  },
  renderOverride: function renderOverride(renderer, overrideMaterial, renderTarget, clearColor, clearAlpha) {
    this.originalClearColor.copy(renderer.getClearColor());
    var originalClearAlpha = renderer.getClearAlpha();
    var originalAutoClear = renderer.autoClear;
    renderer.setRenderTarget(renderTarget);
    renderer.autoClear = false;
    clearColor = overrideMaterial.clearColor || clearColor;
    clearAlpha = overrideMaterial.clearAlpha || clearAlpha;

    if (clearColor !== undefined && clearColor !== null) {
      renderer.setClearColor(clearColor);
      renderer.setClearAlpha(clearAlpha || 0.0);
      renderer.clear();
    }

    this.scene.overrideMaterial = overrideMaterial;
    renderer.render(this.scene, this.camera);
    this.scene.overrideMaterial = null; // restore original state

    renderer.autoClear = originalAutoClear;
    renderer.setClearColor(this.originalClearColor);
    renderer.setClearAlpha(originalClearAlpha);
  },
  setSize: function setSize(width, height) {
    this.width = width;
    this.height = height;
    this.beautyRenderTarget.setSize(width, height);
    this.ssaoRenderTarget.setSize(width, height);
    this.normalRenderTarget.setSize(width, height);
    this.blurRenderTarget.setSize(width, height);
    this.ssaoMaterial.uniforms['resolution'].value.set(width, height);
    this.ssaoMaterial.uniforms['cameraProjectionMatrix'].value.copy(this.camera.projectionMatrix);
    this.ssaoMaterial.uniforms['cameraInverseProjectionMatrix'].value.getInverse(this.camera.projectionMatrix);
    this.blurMaterial.uniforms['resolution'].value.set(width, height);
  },
  generateSampleKernel: function generateSampleKernel() {
    var kernelSize = this.kernelSize;
    var kernel = this.kernel;

    for (var i = 0; i < kernelSize; i++) {
      var sample = new _threeModule.Vector3();
      sample.x = Math.random() * 2 - 1;
      sample.y = Math.random() * 2 - 1;
      sample.z = Math.random();
      sample.normalize();
      var scale = i / kernelSize;
      scale = _threeModule.Math.lerp(0.1, 1, scale * scale);
      sample.multiplyScalar(scale);
      kernel.push(sample);
    }
  },
  generateRandomKernelRotations: function generateRandomKernelRotations() {
    var width = 4,
        height = 4;

    if (_SimplexNoise.SimplexNoise === undefined) {
      console.error('THREE.SSAOPass: The pass relies on SimplexNoise.');
    }

    var simplex = new _SimplexNoise.SimplexNoise();
    var size = width * height;
    var data = new Float32Array(size * 4);

    for (var i = 0; i < size; i++) {
      var stride = i * 4;
      var x = Math.random() * 2 - 1;
      var y = Math.random() * 2 - 1;
      var z = 0;
      var noise = simplex.noise3d(x, y, z);
      data[stride] = noise;
      data[stride + 1] = noise;
      data[stride + 2] = noise;
      data[stride + 3] = 1;
    }

    this.noiseTexture = new _threeModule.DataTexture(data, width, height, _threeModule.RGBAFormat, _threeModule.FloatType);
    this.noiseTexture.wrapS = _threeModule.RepeatWrapping;
    this.noiseTexture.wrapT = _threeModule.RepeatWrapping;
  }
});
SSAOPass.OUTPUT = {
  'Default': 0,
  'SSAO': 1,
  'Blur': 2,
  'Beauty': 3,
  'Depth': 4,
  'Normal': 5
};