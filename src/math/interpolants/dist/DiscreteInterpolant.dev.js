"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscreteInterpolant = DiscreteInterpolant;

var _Interpolant = require("../Interpolant.js");

/**
 *
 * Interpolant that evaluates to the sample value at the position preceeding
 * the parameter.
 *
 * @author tschw
 */
function DiscreteInterpolant(parameterPositions, sampleValues, sampleSize, resultBuffer) {
  _Interpolant.Interpolant.call(this, parameterPositions, sampleValues, sampleSize, resultBuffer);
}

DiscreteInterpolant.prototype = Object.assign(Object.create(_Interpolant.Interpolant.prototype), {
  constructor: DiscreteInterpolant,
  interpolate_: function interpolate_(i1
  /*, t0, t, t1 */
  ) {
    return this.copySampleValue_(i1 - 1);
  }
});