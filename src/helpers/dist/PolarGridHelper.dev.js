"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolarGridHelper = PolarGridHelper;

var _LineSegments = require("../objects/LineSegments.js");

var _constants = require("../constants.js");

var _LineBasicMaterial = require("../materials/LineBasicMaterial.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

var _Color = require("../math/Color.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / http://github.com/Mugen87
 * @author Hectate / http://www.github.com/Hectate
 */
function PolarGridHelper(radius, radials, circles, divisions, color1, color2) {
  radius = radius || 10;
  radials = radials || 16;
  circles = circles || 8;
  divisions = divisions || 64;
  color1 = new _Color.Color(color1 !== undefined ? color1 : 0x444444);
  color2 = new _Color.Color(color2 !== undefined ? color2 : 0x888888);
  var vertices = [];
  var colors = [];
  var x, z;
  var v, i, j, r, color; // create the radials

  for (i = 0; i <= radials; i++) {
    v = i / radials * (Math.PI * 2);
    x = Math.sin(v) * radius;
    z = Math.cos(v) * radius;
    vertices.push(0, 0, 0);
    vertices.push(x, 0, z);
    color = i & 1 ? color1 : color2;
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
  } // create the circles


  for (i = 0; i <= circles; i++) {
    color = i & 1 ? color1 : color2;
    r = radius - radius / circles * i;

    for (j = 0; j < divisions; j++) {
      // first vertex
      v = j / divisions * (Math.PI * 2);
      x = Math.sin(v) * r;
      z = Math.cos(v) * r;
      vertices.push(x, 0, z);
      colors.push(color.r, color.g, color.b); // second vertex

      v = (j + 1) / divisions * (Math.PI * 2);
      x = Math.sin(v) * r;
      z = Math.cos(v) * r;
      vertices.push(x, 0, z);
      colors.push(color.r, color.g, color.b);
    }
  }

  var geometry = new _BufferGeometry.BufferGeometry();
  geometry.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new _BufferAttribute.Float32BufferAttribute(colors, 3));
  var material = new _LineBasicMaterial.LineBasicMaterial({
    vertexColors: _constants.VertexColors
  });

  _LineSegments.LineSegments.call(this, geometry, material);
}

PolarGridHelper.prototype = Object.create(_LineSegments.LineSegments.prototype);
PolarGridHelper.prototype.constructor = PolarGridHelper;