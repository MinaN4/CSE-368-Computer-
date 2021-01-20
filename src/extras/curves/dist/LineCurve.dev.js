"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCurve = LineCurve;

var _Vector = require("../../math/Vector2.js");

var _Curve = require("../core/Curve.js");

function LineCurve(v1, v2) {
  _Curve.Curve.call(this);

  this.type = 'LineCurve';
  this.v1 = v1 || new _Vector.Vector2();
  this.v2 = v2 || new _Vector.Vector2();
}

LineCurve.prototype = Object.create(_Curve.Curve.prototype);
LineCurve.prototype.constructor = LineCurve;
LineCurve.prototype.isLineCurve = true;

LineCurve.prototype.getPoint = function (t, optionalTarget) {
  var point = optionalTarget || new _Vector.Vector2();

  if (t === 1) {
    point.copy(this.v2);
  } else {
    point.copy(this.v2).sub(this.v1);
    point.multiplyScalar(t).add(this.v1);
  }

  return point;
}; // Line curve is linear, so we can overwrite default getPointAt


LineCurve.prototype.getPointAt = function (u, optionalTarget) {
  return this.getPoint(u, optionalTarget);
};

LineCurve.prototype.getTangent = function ()
/* t */
{
  var tangent = this.v2.clone().sub(this.v1);
  return tangent.normalize();
};

LineCurve.prototype.copy = function (source) {
  _Curve.Curve.prototype.copy.call(this, source);

  this.v1.copy(source.v1);
  this.v2.copy(source.v2);
  return this;
};

LineCurve.prototype.toJSON = function () {
  var data = _Curve.Curve.prototype.toJSON.call(this);

  data.v1 = this.v1.toArray();
  data.v2 = this.v2.toArray();
  return data;
};

LineCurve.prototype.fromJSON = function (json) {
  _Curve.Curve.prototype.fromJSON.call(this, json);

  this.v1.fromArray(json.v1);
  this.v2.fromArray(json.v2);
  return this;
};