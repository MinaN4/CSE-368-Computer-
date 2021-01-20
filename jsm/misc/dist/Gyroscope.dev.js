"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gyroscope = void 0;

var _threeModule = require("../../../build/three.module.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
var Gyroscope = function Gyroscope() {
  _threeModule.Object3D.call(this);
};

exports.Gyroscope = Gyroscope;
Gyroscope.prototype = Object.create(_threeModule.Object3D.prototype);
Gyroscope.prototype.constructor = Gyroscope;

Gyroscope.prototype.updateMatrixWorld = function () {
  var translationObject = new _threeModule.Vector3();
  var quaternionObject = new _threeModule.Quaternion();
  var scaleObject = new _threeModule.Vector3();
  var translationWorld = new _threeModule.Vector3();
  var quaternionWorld = new _threeModule.Quaternion();
  var scaleWorld = new _threeModule.Vector3();
  return function updateMatrixWorld(force) {
    this.matrixAutoUpdate && this.updateMatrix(); // update matrixWorld

    if (this.matrixWorldNeedsUpdate || force) {
      if (this.parent !== null) {
        this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
        this.matrixWorld.decompose(translationWorld, quaternionWorld, scaleWorld);
        this.matrix.decompose(translationObject, quaternionObject, scaleObject);
        this.matrixWorld.compose(translationWorld, quaternionObject, scaleWorld);
      } else {
        this.matrixWorld.copy(this.matrix);
      }

      this.matrixWorldNeedsUpdate = false;
      force = true;
    } // update children


    for (var i = 0, l = this.children.length; i < l; i++) {
      this.children[i].updateMatrixWorld(force);
    }
  };
}();