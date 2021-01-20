"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointLightShadow = PointLightShadow;

var _LightShadow = require("./LightShadow.js");

var _PerspectiveCamera = require("../cameras/PerspectiveCamera.js");

var _Vector = require("../math/Vector2.js");

var _Vector2 = require("../math/Vector3.js");

var _Vector3 = require("../math/Vector4.js");

function PointLightShadow() {
  _LightShadow.LightShadow.call(this, new _PerspectiveCamera.PerspectiveCamera(90, 1, 0.5, 500));

  this._frameExtents = new _Vector.Vector2(4, 2);
  this._viewportCount = 6;
  this._viewports = [// These viewports map a cube-map onto a 2D texture with the
  // following orientation:
  //
  //  xzXZ
  //   y Y
  //
  // X - Positive x direction
  // x - Negative x direction
  // Y - Positive y direction
  // y - Negative y direction
  // Z - Positive z direction
  // z - Negative z direction
  // positive X
  new _Vector3.Vector4(2, 1, 1, 1), // negative X
  new _Vector3.Vector4(0, 1, 1, 1), // positive Z
  new _Vector3.Vector4(3, 1, 1, 1), // negative Z
  new _Vector3.Vector4(1, 1, 1, 1), // positive Y
  new _Vector3.Vector4(3, 0, 1, 1), // negative Y
  new _Vector3.Vector4(1, 0, 1, 1)];
  this._cubeDirections = [new _Vector2.Vector3(1, 0, 0), new _Vector2.Vector3(-1, 0, 0), new _Vector2.Vector3(0, 0, 1), new _Vector2.Vector3(0, 0, -1), new _Vector2.Vector3(0, 1, 0), new _Vector2.Vector3(0, -1, 0)];
  this._cubeUps = [new _Vector2.Vector3(0, 1, 0), new _Vector2.Vector3(0, 1, 0), new _Vector2.Vector3(0, 1, 0), new _Vector2.Vector3(0, 1, 0), new _Vector2.Vector3(0, 0, 1), new _Vector2.Vector3(0, 0, -1)];
}

PointLightShadow.prototype = Object.assign(Object.create(_LightShadow.LightShadow.prototype), {
  constructor: PointLightShadow,
  isPointLightShadow: true,
  updateMatrices: function updateMatrices(light, viewportIndex) {
    if (viewportIndex === undefined) viewportIndex = 0;
    var camera = this.camera,
        shadowMatrix = this.matrix,
        lightPositionWorld = this._lightPositionWorld,
        lookTarget = this._lookTarget,
        projScreenMatrix = this._projScreenMatrix;
    lightPositionWorld.setFromMatrixPosition(light.matrixWorld);
    camera.position.copy(lightPositionWorld);
    lookTarget.copy(camera.position);
    lookTarget.add(this._cubeDirections[viewportIndex]);
    camera.up.copy(this._cubeUps[viewportIndex]);
    camera.lookAt(lookTarget);
    camera.updateMatrixWorld();
    shadowMatrix.makeTranslation(-lightPositionWorld.x, -lightPositionWorld.y, -lightPositionWorld.z);
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);

    this._frustum.setFromMatrix(projScreenMatrix);
  }
});