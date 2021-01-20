"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VectorKeyframeTrack = VectorKeyframeTrack;

var _KeyframeTrack = require("../KeyframeTrack.js");

/**
 *
 * A Track of vectored keyframe values.
 *
 *
 * @author Ben Houston / http://clara.io/
 * @author David Sarno / http://lighthaus.us/
 * @author tschw
 */
function VectorKeyframeTrack(name, times, values, interpolation) {
  _KeyframeTrack.KeyframeTrack.call(this, name, times, values, interpolation);
}

VectorKeyframeTrack.prototype = Object.assign(Object.create(_KeyframeTrack.KeyframeTrack.prototype), {
  constructor: VectorKeyframeTrack,
  ValueTypeName: 'vector' // ValueBufferType is inherited
  // DefaultInterpolation is inherited

});