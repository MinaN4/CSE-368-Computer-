"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArcCurve = ArcCurve;

var _EllipseCurve = require("./EllipseCurve.js");

function ArcCurve(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
  _EllipseCurve.EllipseCurve.call(this, aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);

  this.type = 'ArcCurve';
}

ArcCurve.prototype = Object.create(_EllipseCurve.EllipseCurve.prototype);
ArcCurve.prototype.constructor = ArcCurve;
ArcCurve.prototype.isArcCurve = true;