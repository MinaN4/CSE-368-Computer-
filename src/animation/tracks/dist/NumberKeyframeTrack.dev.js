"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberKeyframeTrack = NumberKeyframeTrack;

var _KeyframeTrack = require("../KeyframeTrack.js");

/**
 *
 * A Track of numeric keyframe values.
 *
 * @author Ben Houston / http://clara.io/
 * @author David Sarno / http://lighthaus.us/
 * @author tschw
 */
function NumberKeyframeTrack(name, times, values, interpolation) {
  _KeyframeTrack.KeyframeTrack.call(this, name, times, values, interpolation);
}

NumberKeyframeTrack.prototype = Object.assign(Object.create(_KeyframeTrack.KeyframeTrack.prototype), {
  constructor: NumberKeyframeTrack,
  ValueTypeName: 'number' // ValueBufferType is inherited
  // DefaultInterpolation is inherited

});