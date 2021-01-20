"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuaternionKeyframeTrack = QuaternionKeyframeTrack;

var _constants = require("../../constants.js");

var _KeyframeTrack = require("../KeyframeTrack.js");

var _QuaternionLinearInterpolant = require("../../math/interpolants/QuaternionLinearInterpolant.js");

/**
 *
 * A Track of quaternion keyframe values.
 *
 * @author Ben Houston / http://clara.io/
 * @author David Sarno / http://lighthaus.us/
 * @author tschw
 */
function QuaternionKeyframeTrack(name, times, values, interpolation) {
  _KeyframeTrack.KeyframeTrack.call(this, name, times, values, interpolation);
}

QuaternionKeyframeTrack.prototype = Object.assign(Object.create(_KeyframeTrack.KeyframeTrack.prototype), {
  constructor: QuaternionKeyframeTrack,
  ValueTypeName: 'quaternion',
  // ValueBufferType is inherited
  DefaultInterpolation: _constants.InterpolateLinear,
  InterpolantFactoryMethodLinear: function InterpolantFactoryMethodLinear(result) {
    return new _QuaternionLinearInterpolant.QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), result);
  },
  InterpolantFactoryMethodSmooth: undefined // not yet implemented

});