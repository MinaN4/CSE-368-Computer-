"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuaternionLinearInterpolant = QuaternionLinearInterpolant;

var _Interpolant = require("../Interpolant.js");

var _Quaternion = require("../Quaternion.js");

/**
 * Spherical linear unit quaternion interpolant.
 *
 * @author tschw
 */
function QuaternionLinearInterpolant(parameterPositions, sampleValues, sampleSize, resultBuffer) {
  _Interpolant.Interpolant.call(this, parameterPositions, sampleValues, sampleSize, resultBuffer);
}

QuaternionLinearInterpolant.prototype = Object.assign(Object.create(_Interpolant.Interpolant.prototype), {
  constructor: QuaternionLinearInterpolant,
  interpolate_: function interpolate_(i1, t0, t, t1) {
    var result = this.resultBuffer,
        values = this.sampleValues,
        stride = this.valueSize,
        offset = i1 * stride,
        alpha = (t - t0) / (t1 - t0);

    for (var end = offset + stride; offset !== end; offset += 4) {
      _Quaternion.Quaternion.slerpFlat(result, 0, values, offset - stride, values, offset, alpha);
    }

    return result;
  }
});