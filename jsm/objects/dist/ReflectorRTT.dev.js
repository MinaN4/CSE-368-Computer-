"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReflectorRTT = void 0;

var _Reflector = require("../objects/Reflector.js");

/**
 * RTT version
 */
var ReflectorRTT = function ReflectorRTT(geometry, options) {
  _Reflector.Reflector.call(this, geometry, options);

  this.geometry.setDrawRange(0, 0); // avoid rendering geometry
};

exports.ReflectorRTT = ReflectorRTT;
ReflectorRTT.prototype = Object.create(_Reflector.Reflector.prototype);