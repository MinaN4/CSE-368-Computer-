"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCurve3 = LineCurve3;

var _Vector = require("../../math/Vector3.js");

var _Curve = require("../core/Curve.js");

function LineCurve3(v1, v2) {
  _Curve.Curve.call(this);

  this.type = 'LineCurve3';
  this.v1 = v1 || new _Vector.Vector3();
  this.v2 = v2 || new _Vector.Vector3();
}

LineCurve3.prototype = Object.create(_Curve.Curve.prototype);
LineCurve3.prototype.constructor = LineCurve3;
LineCurve3.prototype.isLineCurve3 = true;

LineCurve3.prototype.getPoint = function (t, optionalTarget) {
  var point = optionalTarget || new _Vector.Vector3();

  if (t === 1) {
    point.copy(this.v2);
  } else {
    point.copy(this.v2).sub(this.v1);
    point.multiplyScalar(t).add(this.v1);
  }

  return point;
}; // Line curve is linear, so we can overwrite default getPointAt


LineCurve3.prototype.getPointAt = function (u, optionalTarget) {
  return this.getPoint(u, optionalTarget);
};

LineCurve3.prototype.copy = function (source) {
  _Curve.Curve.prototype.copy.call(this, source);

  this.v1.copy(source.v1);
  this.v2.copy(source.v2);
  return this;
};

LineCurve3.prototype.toJSON = function () {
  var data = _Curve.Curve.prototype.toJSON.call(this);

  data.v1 = this.v1.toArray();
  data.v2 = this.v2.toArray();
  return data;
};

LineCurve3.prototype.fromJSON = function (json) {
  _Curve.Curve.prototype.fromJSON.call(this, json);

  this.v1.fromArray(json.v1);
  this.v2.fromArray(json.v2);
  return this;
};