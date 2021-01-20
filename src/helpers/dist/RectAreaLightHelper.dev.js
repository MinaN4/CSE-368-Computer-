"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RectAreaLightHelper = RectAreaLightHelper;

var _Line = require("../objects/Line.js");

var _Mesh = require("../objects/Mesh.js");

var _LineBasicMaterial = require("../materials/LineBasicMaterial.js");

var _MeshBasicMaterial = require("../materials/MeshBasicMaterial.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

var _constants = require("../constants.js");

/**
 * @author abelnation / http://github.com/abelnation
 * @author Mugen87 / http://github.com/Mugen87
 * @author WestLangley / http://github.com/WestLangley
 *
 *  This helper must be added as a child of the light
 */
function RectAreaLightHelper(light, color) {
  this.type = 'RectAreaLightHelper';
  this.light = light;
  this.color = color; // optional hardwired color for the helper

  var positions = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0];
  var geometry = new _BufferGeometry.BufferGeometry();
  geometry.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(positions, 3));
  geometry.computeBoundingSphere();
  var material = new _LineBasicMaterial.LineBasicMaterial({
    fog: false
  });

  _Line.Line.call(this, geometry, material); //


  var positions2 = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0];
  var geometry2 = new _BufferGeometry.BufferGeometry();
  geometry2.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(positions2, 3));
  geometry2.computeBoundingSphere();
  this.add(new _Mesh.Mesh(geometry2, new _MeshBasicMaterial.MeshBasicMaterial({
    side: _constants.BackSide,
    fog: false
  })));
  this.update();
}

RectAreaLightHelper.prototype = Object.create(_Line.Line.prototype);
RectAreaLightHelper.prototype.constructor = RectAreaLightHelper;

RectAreaLightHelper.prototype.update = function () {
  this.scale.set(0.5 * this.light.width, 0.5 * this.light.height, 1);

  if (this.color !== undefined) {
    this.material.color.set(this.color);
    this.children[0].material.color.set(this.color);
  } else {
    this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity); // prevent hue shift

    var c = this.material.color;
    var max = Math.max(c.r, c.g, c.b);
    if (max > 1) c.multiplyScalar(1 / max);
    this.children[0].material.color.copy(this.material.color);
  }
};

RectAreaLightHelper.prototype.dispose = function () {
  this.geometry.dispose();
  this.material.dispose();
  this.children[0].geometry.dispose();
  this.children[0].material.dispose();
};