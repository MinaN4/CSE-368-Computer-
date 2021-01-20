"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line2 = void 0;

var _LineSegments = require("../lines/LineSegments2.js");

var _LineGeometry = require("../lines/LineGeometry.js");

var _LineMaterial = require("../lines/LineMaterial.js");

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */
var Line2 = function Line2(geometry, material) {
  _LineSegments.LineSegments2.call(this);

  this.type = 'Line2';
  this.geometry = geometry !== undefined ? geometry : new _LineGeometry.LineGeometry();
  this.material = material !== undefined ? material : new _LineMaterial.LineMaterial({
    color: Math.random() * 0xffffff
  });
};

exports.Line2 = Line2;
Line2.prototype = Object.assign(Object.create(_LineSegments.LineSegments2.prototype), {
  constructor: Line2,
  isLine2: true
});