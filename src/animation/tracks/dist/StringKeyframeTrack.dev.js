"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringKeyframeTrack = StringKeyframeTrack;

var _constants = require("../../constants.js");

var _KeyframeTrack = require("../KeyframeTrack.js");

/**
 *
 * A Track that interpolates Strings
 *
 *
 * @author Ben Houston / http://clara.io/
 * @author David Sarno / http://lighthaus.us/
 * @author tschw
 */
function StringKeyframeTrack(name, times, values, interpolation) {
  _KeyframeTrack.KeyframeTrack.call(this, name, times, values, interpolation);
}

StringKeyframeTrack.prototype = Object.assign(Object.create(_KeyframeTrack.KeyframeTrack.prototype), {
  constructor: StringKeyframeTrack,
  ValueTypeName: 'string',
  ValueBufferType: Array,
  DefaultInterpolation: _constants.InterpolateDiscrete,
  InterpolantFactoryMethodLinear: undefined,
  InterpolantFactoryMethodSmooth: undefined
});