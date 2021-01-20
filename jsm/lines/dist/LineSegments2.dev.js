"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineSegments2 = void 0;

var _threeModule = require("../../../build/three.module.js");

var _LineSegmentsGeometry = require("../lines/LineSegmentsGeometry.js");

var _LineMaterial = require("../lines/LineMaterial.js");

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */
var LineSegments2 = function LineSegments2(geometry, material) {
  _threeModule.Mesh.call(this);

  this.type = 'LineSegments2';
  this.geometry = geometry !== undefined ? geometry : new _LineSegmentsGeometry.LineSegmentsGeometry();
  this.material = material !== undefined ? material : new _LineMaterial.LineMaterial({
    color: Math.random() * 0xffffff
  });
};

exports.LineSegments2 = LineSegments2;
LineSegments2.prototype = Object.assign(Object.create(_threeModule.Mesh.prototype), {
  constructor: LineSegments2,
  isLineSegments2: true,
  computeLineDistances: function () {
    // for backwards-compatability, but could be a method of LineSegmentsGeometry...
    var start = new _threeModule.Vector3();
    var end = new _threeModule.Vector3();
    return function computeLineDistances() {
      var geometry = this.geometry;
      var instanceStart = geometry.attributes.instanceStart;
      var instanceEnd = geometry.attributes.instanceEnd;
      var lineDistances = new Float32Array(2 * instanceStart.data.count);

      for (var i = 0, j = 0, l = instanceStart.data.count; i < l; i++, j += 2) {
        start.fromBufferAttribute(instanceStart, i);
        end.fromBufferAttribute(instanceEnd, i);
        lineDistances[j] = j === 0 ? 0 : lineDistances[j - 1];
        lineDistances[j + 1] = lineDistances[j] + start.distanceTo(end);
      }

      var instanceDistanceBuffer = new _threeModule.InstancedInterleavedBuffer(lineDistances, 2, 1); // d0, d1

      geometry.setAttribute('instanceDistanceStart', new _threeModule.InterleavedBufferAttribute(instanceDistanceBuffer, 1, 0)); // d0

      geometry.setAttribute('instanceDistanceEnd', new _threeModule.InterleavedBufferAttribute(instanceDistanceBuffer, 1, 1)); // d1

      return this;
    };
  }()
});