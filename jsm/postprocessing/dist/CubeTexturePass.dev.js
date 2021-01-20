"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubeTexturePass = void 0;

var _threeModule = require("../../../build/three.module.js");

var _Pass = require("../postprocessing/Pass.js");

/**
 * @author bhouston / http://clara.io/
 */
var CubeTexturePass = function CubeTexturePass(camera, envMap, opacity) {
  _Pass.Pass.call(this);

  this.camera = camera;
  this.needsSwap = false;
  this.cubeShader = _threeModule.ShaderLib['cube'];
  this.cubeMesh = new _threeModule.Mesh(new _threeModule.BoxBufferGeometry(10, 10, 10), new _threeModule.ShaderMaterial({
    uniforms: this.cubeShader.uniforms,
    vertexShader: this.cubeShader.vertexShader,
    fragmentShader: this.cubeShader.fragmentShader,
    depthTest: false,
    depthWrite: false,
    side: _threeModule.BackSide
  }));
  this.envMap = envMap;
  this.opacity = opacity !== undefined ? opacity : 1.0;
  this.cubeScene = new _threeModule.Scene();
  this.cubeCamera = new _threeModule.PerspectiveCamera();
  this.cubeScene.add(this.cubeMesh);
};

exports.CubeTexturePass = CubeTexturePass;
CubeTexturePass.prototype = Object.assign(Object.create(_Pass.Pass.prototype), {
  constructor: CubeTexturePass,
  render: function render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive*/
  ) {
    var oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    this.cubeCamera.projectionMatrix.copy(this.camera.projectionMatrix);
    this.cubeCamera.quaternion.setFromRotationMatrix(this.camera.matrixWorld);
    this.cubeMesh.material.uniforms["tCube"].value = this.envMap;
    this.cubeMesh.material.uniforms["opacity"].value = this.opacity;
    this.cubeMesh.material.transparent = this.opacity < 1.0;
    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    if (this.clear) renderer.clear();
    renderer.render(this.cubeScene, this.cubeCamera);
    renderer.autoClear = oldAutoClear;
  }
});