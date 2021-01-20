"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubicBezierCurve3 = CubicBezierCurve3;

var _Curve = require("../core/Curve.js");

var _Interpolations = require("../core/Interpolations.js");

var _Vector = require("../../math/Vector3.js");

function CubicBezierCurve3(v0, v1, v2, v3) {
  _Curve.Curve.call(this);

  this.type = 'CubicBezierCurve3';
  this.v0 = v0 || new _Vector.Vector3();
  this.v1 = v1 || new _Vector.Vector3();
  this.v2 = v2 || new _Vector.Vector3();
  this.v3 = v3 || new _Vector.Vector3();
}

CubicBezierCurve3.prototype = Object.create(_Curve.Curve.prototype);
CubicBezierCurve3.prototype.constructor = CubicBezierCurve3;
CubicBezierCurve3.prototype.isCubicBezierCurve3 = true;

CubicBezierCurve3.prototype.getPoint = function (t, optionalTarget) {
  var point = optionalTarget || new _Vector.Vector3();
  var v0 = this.v0,
      v1 = this.v1,
      v2 = this.v2,
      v3 = this.v3;
  point.set((0, _Interpolations.CubicBezier)(t, v0.x, v1.x, v2.x, v3.x), (0, _Interpolations.CubicBezier)(t, v0.y, v1.y, v2.y, v3.y), (0, _Interpolations.CubicBezier)(t, v0.z, v1.z, v2.z, v3.z));
  return point;
};

CubicBezierCurve3.prototype.copy = function (source) {
  _Curve.Curve.prototype.copy.call(this, source);

  this.v0.copy(source.v0);
  this.v1.copy(source.v1);
  this.v2.copy(source.v2);
  this.v3.copy(source.v3);
  return this;
};

CubicBezierCurve3.prototype.toJSON = function () {
  var data = _Curve.Curve.prototype.toJSON.call(this);

  data.v0 = this.v0.toArray();
  data.v1 = this.v1.toArray();
  data.v2 = this.v2.toArray();
  data.v3 = this.v3.toArray();
  return data;
};

CubicBezierCurve3.prototype.fromJSON = function (json) {
  _Curve.Curve.prototype.fromJSON.call(this, json);

  this.v0.fromArray(json.v0);
  this.v1.fromArray(json.v1);
  this.v2.fromArray(json.v2);
  this.v3.fromArray(json.v3);
  return this;
};