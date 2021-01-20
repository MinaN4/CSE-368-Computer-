"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridHelper = GridHelper;

var _LineSegments = require("../objects/LineSegments.js");

var _constants = require("../constants.js");

var _LineBasicMaterial = require("../materials/LineBasicMaterial.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

var _Color = require("../math/Color.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function GridHelper(size, divisions, color1, color2) {
  size = size || 10;
  divisions = divisions || 10;
  color1 = new _Color.Color(color1 !== undefined ? color1 : 0x444444);
  color2 = new _Color.Color(color2 !== undefined ? color2 : 0x888888);
  var center = divisions / 2;
  var step = size / divisions;
  var halfSize = size / 2;
  var vertices = [],
      colors = [];

  for (var i = 0, j = 0, k = -halfSize; i <= divisions; i++, k += step) {
    vertices.push(-halfSize, 0, k, halfSize, 0, k);
    vertices.push(k, 0, -halfSize, k, 0, halfSize);
    var color = i === center ? color1 : color2;
    color.toArray(colors, j);
    j += 3;
    color.toArray(colors, j);
    j += 3;
    color.toArray(colors, j);
    j += 3;
    color.toArray(colors, j);
    j += 3;
  }

  var geometry = new _BufferGeometry.BufferGeometry();
  geometry.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new _BufferAttribute.Float32BufferAttribute(colors, 3));
  var material = new _LineBasicMaterial.LineBasicMaterial({
    vertexColors: _constants.VertexColors
  });

  _LineSegments.LineSegments.call(this, geometry, material);
}

GridHelper.prototype = Object.assign(Object.create(_LineSegments.LineSegments.prototype), {
  constructor: GridHelper,
  copy: function copy(source) {
    _LineSegments.LineSegments.prototype.copy.call(this, source);

    this.geometry.copy(source.geometry);
    this.material.copy(source.material);
    return this;
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  }
});