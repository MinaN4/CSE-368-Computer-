"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WireframeGeometry2 = void 0;

var _threeModule = require("../../../build/three.module.js");

var _LineSegmentsGeometry = require("../lines/LineSegmentsGeometry.js");

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */
var WireframeGeometry2 = function WireframeGeometry2(geometry) {
  _LineSegmentsGeometry.LineSegmentsGeometry.call(this);

  this.type = 'WireframeGeometry2';
  this.fromWireframeGeometry(new _threeModule.WireframeGeometry(geometry)); // set colors, maybe
};

exports.WireframeGeometry2 = WireframeGeometry2;
WireframeGeometry2.prototype = Object.assign(Object.create(_LineSegmentsGeometry.LineSegmentsGeometry.prototype), {
  constructor: WireframeGeometry2,
  isWireframeGeometry2: true
});