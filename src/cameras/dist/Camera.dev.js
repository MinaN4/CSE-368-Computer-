"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = Camera;

var _Matrix = require("../math/Matrix4.js");

var _Object3D = require("../core/Object3D.js");

var _Vector = require("../math/Vector3.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/
function Camera() {
  _Object3D.Object3D.call(this);

  this.type = 'Camera';
  this.matrixWorldInverse = new _Matrix.Matrix4();
  this.projectionMatrix = new _Matrix.Matrix4();
  this.projectionMatrixInverse = new _Matrix.Matrix4();
}

Camera.prototype = Object.assign(Object.create(_Object3D.Object3D.prototype), {
  constructor: Camera,
  isCamera: true,
  copy: function copy(source, recursive) {
    _Object3D.Object3D.prototype.copy.call(this, source, recursive);

    this.matrixWorldInverse.copy(source.matrixWorldInverse);
    this.projectionMatrix.copy(source.projectionMatrix);
    this.projectionMatrixInverse.copy(source.projectionMatrixInverse);
    return this;
  },
  getWorldDirection: function getWorldDirection(target) {
    if (target === undefined) {
      console.warn('THREE.Camera: .getWorldDirection() target is now required');
      target = new _Vector.Vector3();
    }

    this.updateMatrixWorld(true);
    var e = this.matrixWorld.elements;
    return target.set(-e[8], -e[9], -e[10]).normalize();
  },
  updateMatrixWorld: function updateMatrixWorld(force) {
    _Object3D.Object3D.prototype.updateMatrixWorld.call(this, force);

    this.matrixWorldInverse.getInverse(this.matrixWorld);
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  }
});