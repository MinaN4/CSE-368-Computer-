"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SAOPass = void 0;

var _threeModule = require("../../../build/three.module.js");

var _Pass = require("../postprocessing/Pass.js");

var _SAOShader = require("../shaders/SAOShader.js");

var _DepthLimitedBlurShader = require("../shaders/DepthLimitedBlurShader.js");

var _CopyShader = require("../shaders/CopyShader.js");

var _UnpackDepthRGBAShader = require("../shaders/UnpackDepthRGBAShader.js");

/**
 * @author ludobaka / ludobaka.github.io
 * SAO implementation inspired from bhouston previous SAO work
 */
var SAOPass = function SAOPass(scene, camera, depthTexture, useNormals, resolution) {
  _Pass.Pass.call(this);

  this.scene = scene;
  this.camera = camera;
  this.clear = true;
  this.needsSwap = false;
  this.supportsDepthTextureExtension = depthTexture !== undefined ? depthTexture : false;
  this.supportsNormalTexture = useNormals !== undefined ? useNormals : false;
  this.originalClearColor = new _threeModule.Color();
  this.oldClearColor = new _threeModule.Color();
  this.oldClearAlpha = 1;
  this.params = {
    output: 0,
    saoBias: 0.5,
    saoIntensity: 0.18,
    saoScale: 1,
    saoKernelRadius: 100,
    saoMinResolution: 0,
    saoBlur: true,
    saoBlurRadius: 8,
    saoBlurStdDev: 4,
    saoBlurDepthCutoff: 0.01
  };
  this.resolution = resolution !== undefined ? new _threeModule.Vector2(resolution.x, resolution.y) : new _threeModule.Vector2(256, 256);
  this.saoRenderTarget = new _threeModule.WebGLRenderTarget(this.resolution.x, this.resolution.y, {
    minFilter: _threeModule.LinearFilter,
    magFilter: _threeModule.LinearFilter,
    format: _threeModule.RGBAFormat
  });
  this.blurIntermediateRenderTarget = this.saoRenderTarget.clone();
  this.beautyRenderTarget = this.saoRenderTarget.clone();
  this.normalRenderTarget = new _threeModule.WebGLRenderTarget(this.resolution.x, this.resolution.y, {
    minFilter: _threeModule.NearestFilter,
    magFilter: _threeModule.NearestFilter,
    format: _threeModule.RGBAFormat
  });
  this.depthRenderTarget = this.normalRenderTarget.clone();

  if (this.supportsDepthTextureExtension) {
    var depthTexture = new _threeModule.DepthTexture();
    depthTexture.type = _threeModule.UnsignedShortType;
    depthTexture.minFilter = _threeModule.NearestFilter;
    depthTexture.maxFilter = _threeModule.NearestFilter;
    this.beautyRenderTarget.depthTexture = depthTexture;
    this.beautyRenderTarget.depthBuffer = true;
  }

  this.depthMaterial = new _threeModule.MeshDepthMaterial();
  this.depthMaterial.depthPacking = _threeModule.RGBADepthPacking;
  this.depthMaterial.blending = _threeModule.NoBlending;
  this.normalMaterial = new _threeModule.MeshNormalMaterial();
  this.normalMaterial.blending = _threeModule.NoBlending;

  if (_SAOShader.SAOShader === undefined) {
    console.error('THREE.SAOPass relies on SAOShader');
  }

  this.saoMaterial = new _threeModule.ShaderMaterial({
    defines: Object.assign({}, _SAOShader.SAOShader.defines),
    fragmentShader: _SAOShader.SAOShader.fragmentShader,
    vertexShader: _SAOShader.SAOShader.vertexShader,
    uniforms: _threeModule.UniformsUtils.clone(_SAOShader.SAOShader.uniforms)
  });
  this.saoMaterial.extensions.derivatives = true;
  this.saoMaterial.defines['DEPTH_PACKING'] = this.supportsDepthTextureExtension ? 0 : 1;
  this.saoMaterial.defines['NORMAL_TEXTURE'] = this.supportsNormalTexture ? 1 : 0;
  this.saoMaterial.defines['PERSPECTIVE_CAMERA'] = this.camera.isPerspectiveCamera ? 1 : 0;
  this.saoMaterial.uniforms['tDepth'].value = this.supportsDepthTextureExtension ? depthTexture : this.depthRenderTarget.texture;
  this.saoMaterial.uniforms['tNormal'].value = this.normalRenderTarget.texture;
  this.saoMaterial.uniforms['size'].value.set(this.resolution.x, this.resolution.y);
  this.saoMaterial.uniforms['cameraInverseProjectionMatrix'].value.getInverse(this.camera.projectionMatrix);
  this.saoMaterial.uniforms['cameraProjectionMatrix'].value = this.camera.projectionMatrix;
  this.saoMaterial.blending = _threeModule.NoBlending;

  if (_DepthLimitedBlurShader.DepthLimitedBlurShader === undefined) {
    console.error('THREE.SAOPass relies on DepthLimitedBlurShader');
  }

  this.vBlurMaterial = new _threeModule.ShaderMaterial({
    uniforms: _threeModule.UniformsUtils.clone(_DepthLimitedBlurShader.DepthLimitedBlurShader.uniforms),
    defines: Object.assign({}, _DepthLimitedBlurShader.DepthLimitedBlurShader.defines),
    vertexShader: _DepthLimitedBlurShader.DepthLimitedBlurShader.vertexShader,
    fragmentShader: _DepthLimitedBlurShader.DepthLimitedBlurShader.fragmentShader
  });
  this.vBlurMaterial.defines['DEPTH_PACKING'] = this.supportsDepthTextureExtension ? 0 : 1;
  this.vBlurMaterial.defines['PERSPECTIVE_CAMERA'] = this.camera.isPerspectiveCamera ? 1 : 0;
  this.vBlurMaterial.uniforms['tDiffuse'].value = this.saoRenderTarget.texture;
  this.vBlurMaterial.uniforms['tDepth'].value = this.supportsDepthTextureExtension ? depthTexture : this.depthRenderTarget.texture;
  this.vBlurMaterial.uniforms['size'].value.set(this.resolution.x, this.resolution.y);
  this.vBlurMaterial.blending = _threeModule.NoBlending;
  this.hBlurMaterial = new _threeModule.ShaderMaterial({
    uniforms: _threeModule.UniformsUtils.clone(_DepthLimitedBlurShader.DepthLimitedBlurShader.uniforms),
    defines: Object.assign({}, _DepthLimitedBlurShader.DepthLimitedBlurShader.defines),
    vertexShader: _DepthLimitedBlurShader.DepthLimitedBlurShader.vertexShader,
    fragmentShader: _DepthLimitedBlurShader.DepthLimitedBlurShader.fragmentShader
  });
  this.hBlurMaterial.defines['DEPTH_PACKING'] = this.supportsDepthTextureExtension ? 0 : 1;
  this.hBlurMaterial.defines['PERSPECTIVE_CAMERA'] = this.camera.isPerspectiveCamera ? 1 : 0;
  this.hBlurMaterial.uniforms['tDiffuse'].value = this.blurIntermediateRenderTarget.texture;
  this.hBlurMaterial.uniforms['tDepth'].value = this.supportsDepthTextureExtension ? depthTexture : this.depthRenderTarget.texture;
  this.hBlurMaterial.uniforms['size'].value.set(this.resolution.x, this.resolution.y);
  this.hBlurMaterial.blending = _threeModule.NoBlending;

  if (_CopyShader.CopyShader === undefined) {
    console.error('THREE.SAOPass relies on CopyShader');
  }

  this.materialCopy = new _threeModule.ShaderMaterial({
    uniforms: _threeModule.UniformsUtils.clone(_CopyShader.CopyShader.uniforms),
    vertexShader: _CopyShader.CopyShader.vertexShader,
    fragmentShader: _CopyShader.CopyShader.fragmentShader,
    blending: _threeModule.NoBlending
  });
  this.materialCopy.transparent = true;
  this.materialCopy.depthTest = false;
  this.materialCopy.depthWrite = false;
  this.materialCopy.blending = _threeModule.CustomBlending;
  this.materialCopy.blendSrc = _threeModule.DstColorFactor;
  this.materialCopy.blendDst = _threeModule.ZeroFactor;
  this.materialCopy.blendEquation = _threeModule.AddEquation;
  this.materialCopy.blendSrcAlpha = _threeModule.DstAlphaFactor;
  this.materialCopy.blendDstAlpha = _threeModule.ZeroFactor;
  this.materialCopy.blendEquationAlpha = _threeModule.AddEquation;

  if (_UnpackDepthRGBAShader.UnpackDepthRGBAShader === undefined) {
    console.error('THREE.SAOPass relies on UnpackDepthRGBAShader');
  }

  this.depthCopy = new _threeModule.ShaderMaterial({
    uniforms: _threeModule.UniformsUtils.clone(_UnpackDepthRGBAShader.UnpackDepthRGBAShader.uniforms),
    vertexShader: _UnpackDepthRGBAShader.UnpackDepthRGBAShader.vertexShader,
    fragmentShader: _UnpackDepthRGBAShader.UnpackDepthRGBAShader.fragmentShader,
    blending: _threeModule.NoBlending
  });
  this.fsQuad = new _Pass.Pass.FullScreenQuad(null);
};

exports.SAOPass = SAOPass;
SAOPass.OUTPUT = {
  'Beauty': 1,
  'Default': 0,
  'SAO': 2,
  'Depth': 3,
  'Normal': 4
};
SAOPass.prototype = Object.assign(Object.create(_Pass.Pass.prototype), {
  constructor: SAOPass,
  render: function render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive*/
  ) {
    // Rendering readBuffer first when rendering to screen
    if (this.renderToScreen) {
      this.materialCopy.blending = _threeModule.NoBlending;
      this.materialCopy.uniforms['tDiffuse'].value = readBuffer.texture;
      this.materialCopy.needsUpdate = true;
      this.renderPass(renderer, this.materialCopy, null);
    }

    if (this.params.output === 1) {
      return;
    }

    this.oldClearColor.copy(renderer.getClearColor());
    this.oldClearAlpha = renderer.getClearAlpha();
    var oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    renderer.setRenderTarget(this.depthRenderTarget);
    renderer.clear();
    this.saoMaterial.uniforms['bias'].value = this.params.saoBias;
    this.saoMaterial.uniforms['intensity'].value = this.params.saoIntensity;
    this.saoMaterial.uniforms['scale'].value = this.params.saoScale;
    this.saoMaterial.uniforms['kernelRadius'].value = this.params.saoKernelRadius;
    this.saoMaterial.uniforms['minResolution'].value = this.params.saoMinResolution;
    this.saoMaterial.uniforms['cameraNear'].value = this.camera.near;
    this.saoMaterial.uniforms['cameraFar'].value = this.camera.far; // this.saoMaterial.uniforms['randomSeed'].value = Math.random();

    var depthCutoff = this.params.saoBlurDepthCutoff * (this.camera.far - this.camera.near);
    this.vBlurMaterial.uniforms['depthCutoff'].value = depthCutoff;
    this.hBlurMaterial.uniforms['depthCutoff'].value = depthCutoff;
    this.vBlurMaterial.uniforms['cameraNear'].value = this.camera.near;
    this.vBlurMaterial.uniforms['cameraFar'].value = this.camera.far;
    this.hBlurMaterial.uniforms['cameraNear'].value = this.camera.near;
    this.hBlurMaterial.uniforms['cameraFar'].value = this.camera.far;
    this.params.saoBlurRadius = Math.floor(this.params.saoBlurRadius);

    if (this.prevStdDev !== this.params.saoBlurStdDev || this.prevNumSamples !== this.params.saoBlurRadius) {
      _DepthLimitedBlurShader.BlurShaderUtils.configure(this.vBlurMaterial, this.params.saoBlurRadius, this.params.saoBlurStdDev, new _threeModule.Vector2(0, 1));

      _DepthLimitedBlurShader.BlurShaderUtils.configure(this.hBlurMaterial, this.params.saoBlurRadius, this.params.saoBlurStdDev, new _threeModule.Vector2(1, 0));

      this.prevStdDev = this.params.saoBlurStdDev;
      this.prevNumSamples = this.params.saoBlurRadius;
    } // Rendering scene to depth texture


    renderer.setClearColor(0x000000);
    renderer.setRenderTarget(this.beautyRenderTarget);
    renderer.clear();
    renderer.render(this.scene, this.camera); // Re-render scene if depth texture extension is not supported

    if (!this.supportsDepthTextureExtension) {
      // Clear rule : far clipping plane in both RGBA and Basic encoding
      this.renderOverride(renderer, this.depthMaterial, this.depthRenderTarget, 0x000000, 1.0);
    }

    if (this.supportsNormalTexture) {
      // Clear rule : default normal is facing the camera
      this.renderOverride(renderer, this.normalMaterial, this.normalRenderTarget, 0x7777ff, 1.0);
    } // Rendering SAO texture


    this.renderPass(renderer, this.saoMaterial, this.saoRenderTarget, 0xffffff, 1.0); // Blurring SAO texture

    if (this.params.saoBlur) {
      this.renderPass(renderer, this.vBlurMaterial, this.blurIntermediateRenderTarget, 0xffffff, 1.0);
      this.renderPass(renderer, this.hBlurMaterial, this.saoRenderTarget, 0xffffff, 1.0);
    }

    var outputMaterial = this.materialCopy; // Setting up SAO rendering

    if (this.params.output === 3) {
      if (this.supportsDepthTextureExtension) {
        this.materialCopy.uniforms['tDiffuse'].value = this.beautyRenderTarget.depthTexture;
        this.materialCopy.needsUpdate = true;
      } else {
        this.depthCopy.uniforms['tDiffuse'].value = this.depthRenderTarget.texture;
        this.depthCopy.needsUpdate = true;
        outputMaterial = this.depthCopy;
      }
    } else if (this.params.output === 4) {
      this.materialCopy.uniforms['tDiffuse'].value = this.normalRenderTarget.texture;
      this.materialCopy.needsUpdate = true;
    } else {
      this.materialCopy.uniforms['tDiffuse'].value = this.saoRenderTarget.texture;
      this.materialCopy.needsUpdate = true;
    } // Blending depends on output, only want a CustomBlending when showing SAO


    if (this.params.output === 0) {
      outputMaterial.blending = _threeModule.CustomBlending;
    } else {
      outputMaterial.blending = _threeModule.NoBlending;
    } // Rendering SAOPass result on top of previous pass


    this.renderPass(renderer, outputMaterial, this.renderToScreen ? null : readBuffer);
    renderer.setClearColor(this.oldClearColor, this.oldClearAlpha);
    renderer.autoClear = oldAutoClear;
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
    this.beautyRenderTarget.setSize(width, height);
    this.saoRenderTarget.setSize(width, height);
    this.blurIntermediateRenderTarget.setSize(width, height);
    this.normalRenderTarget.setSize(width, height);
    this.depthRenderTarget.setSize(width, height);
    this.saoMaterial.uniforms['size'].value.set(width, height);
    this.saoMaterial.uniforms['cameraInverseProjectionMatrix'].value.getInverse(this.camera.projectionMatrix);
    this.saoMaterial.uniforms['cameraProjectionMatrix'].value = this.camera.projectionMatrix;
    this.saoMaterial.needsUpdate = true;
    this.vBlurMaterial.uniforms['size'].value.set(width, height);
    this.vBlurMaterial.needsUpdate = true;
    this.hBlurMaterial.uniforms['size'].value.set(width, height);
    this.hBlurMaterial.needsUpdate = true;
  }
});