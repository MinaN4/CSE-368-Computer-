"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubeCamera = CubeCamera;

var _Object3D = require("../core/Object3D.js");

var _WebGLRenderTargetCube = require("../renderers/WebGLRenderTargetCube.js");

var _constants = require("../constants.js");

var _Vector = require("../math/Vector3.js");

var _PerspectiveCamera = require("./PerspectiveCamera.js");

/**
 * Camera for rendering cube maps
 *	- renders scene into axis-aligned cube
 *
 * @author alteredq / http://alteredqualia.com/
 */
var fov = 90,
    aspect = 1;

function CubeCamera(near, far, cubeResolution, options) {
  _Object3D.Object3D.call(this);

  this.type = 'CubeCamera';
  var cameraPX = new _PerspectiveCamera.PerspectiveCamera(fov, aspect, near, far);
  cameraPX.up.set(0, -1, 0);
  cameraPX.lookAt(new _Vector.Vector3(1, 0, 0));
  this.add(cameraPX);
  var cameraNX = new _PerspectiveCamera.PerspectiveCamera(fov, aspect, near, far);
  cameraNX.up.set(0, -1, 0);
  cameraNX.lookAt(new _Vector.Vector3(-1, 0, 0));
  this.add(cameraNX);
  var cameraPY = new _PerspectiveCamera.PerspectiveCamera(fov, aspect, near, far);
  cameraPY.up.set(0, 0, 1);
  cameraPY.lookAt(new _Vector.Vector3(0, 1, 0));
  this.add(cameraPY);
  var cameraNY = new _PerspectiveCamera.PerspectiveCamera(fov, aspect, near, far);
  cameraNY.up.set(0, 0, -1);
  cameraNY.lookAt(new _Vector.Vector3(0, -1, 0));
  this.add(cameraNY);
  var cameraPZ = new _PerspectiveCamera.PerspectiveCamera(fov, aspect, near, far);
  cameraPZ.up.set(0, -1, 0);
  cameraPZ.lookAt(new _Vector.Vector3(0, 0, 1));
  this.add(cameraPZ);
  var cameraNZ = new _PerspectiveCamera.PerspectiveCamera(fov, aspect, near, far);
  cameraNZ.up.set(0, -1, 0);
  cameraNZ.lookAt(new _Vector.Vector3(0, 0, -1));
  this.add(cameraNZ);
  options = options || {
    format: _constants.RGBFormat,
    magFilter: _constants.LinearFilter,
    minFilter: _constants.LinearFilter
  };
  this.renderTarget = new _WebGLRenderTargetCube.WebGLRenderTargetCube(cubeResolution, cubeResolution, options);
  this.renderTarget.texture.name = "CubeCamera";

  this.update = function (renderer, scene) {
    if (this.parent === null) this.updateMatrixWorld();
    var currentRenderTarget = renderer.getRenderTarget();
    var renderTarget = this.renderTarget;
    var generateMipmaps = renderTarget.texture.generateMipmaps;
    renderTarget.texture.generateMipmaps = false;
    renderer.setRenderTarget(renderTarget, 0);
    renderer.render(scene, cameraPX);
    renderer.setRenderTarget(renderTarget, 1);
    renderer.render(scene, cameraNX);
    renderer.setRenderTarget(renderTarget, 2);
    renderer.render(scene, cameraPY);
    renderer.setRenderTarget(renderTarget, 3);
    renderer.render(scene, cameraNY);
    renderer.setRenderTarget(renderTarget, 4);
    renderer.render(scene, cameraPZ);
    renderTarget.texture.generateMipmaps = generateMipmaps;
    renderer.setRenderTarget(renderTarget, 5);
    renderer.render(scene, cameraNZ);
    renderer.setRenderTarget(currentRenderTarget);
  };

  this.clear = function (renderer, color, depth, stencil) {
    var currentRenderTarget = renderer.getRenderTarget();
    var renderTarget = this.renderTarget;

    for (var i = 0; i < 6; i++) {
      renderer.setRenderTarget(renderTarget, i);
      renderer.clear(color, depth, stencil);
    }

    renderer.setRenderTarget(currentRenderTarget);
  };
}

CubeCamera.prototype = Object.create(_Object3D.Object3D.prototype);
CubeCamera.prototype.constructor = CubeCamera;