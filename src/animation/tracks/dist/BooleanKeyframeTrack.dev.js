"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BooleanKeyframeTrack = BooleanKeyframeTrack;

var _constants = require("../../constants.js");

var _KeyframeTrack = require("../KeyframeTrack.js");

/**
 *
 * A Track of Boolean keyframe values.
 *
 *
 * @author Ben Houston / http://clara.io/
 * @author David Sarno / http://lighthaus.us/
 * @author tschw
 */
function BooleanKeyframeTrack(name, times, values) {
  _KeyframeTrack.KeyframeTrack.call(this, name, times, values);
}

BooleanKeyframeTrack.prototype = Object.assign(Object.create(_KeyframeTrack.KeyframeTrack.prototype), {
  constructor: BooleanKeyframeTrack,
  ValueTypeName: 'bool',
  ValueBufferType: Array,
  DefaultInterpolation: _constants.InterpolateDiscrete,
  InterpolantFactoryMethodLinear: undefined,
  InterpolantFactoryMethodSmooth: undefined // Note: Actually this track could have a optimized / compressed
  // representation of a single value and a custom interpolant that
  // computes "firstValue ^ isOdd( index )".

});