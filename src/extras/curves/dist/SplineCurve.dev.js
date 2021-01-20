"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplineCurve = SplineCurve;

var _Curve = require("../core/Curve.js");

var _Interpolations = require("../core/Interpolations.js");

var _Vector = require("../../math/Vector2.js");

function SplineCurve(points
/* array of Vector2 */
) {
  _Curve.Curve.call(this);

  this.type = 'SplineCurve';
  this.points = points || [];
}

SplineCurve.prototype = Object.create(_Curve.Curve.prototype);
SplineCurve.prototype.constructor = SplineCurve;
SplineCurve.prototype.isSplineCurve = true;

SplineCurve.prototype.getPoint = function (t, optionalTarget) {
  var point = optionalTarget || new _Vector.Vector2();
  var points = this.points;
  var p = (points.length - 1) * t;
  var intPoint = Math.floor(p);
  var weight = p - intPoint;
  var p0 = points[intPoint === 0 ? intPoint : intPoint - 1];
  var p1 = points[intPoint];
  var p2 = points[intPoint > points.length - 2 ? points.length - 1 : intPoint + 1];
  var p3 = points[intPoint > points.length - 3 ? points.length - 1 : intPoint + 2];
  point.set((0, _Interpolations.CatmullRom)(weight, p0.x, p1.x, p2.x, p3.x), (0, _Interpolations.CatmullRom)(weight, p0.y, p1.y, p2.y, p3.y));
  return point;
};

SplineCurve.prototype.copy = function (source) {
  _Curve.Curve.prototype.copy.call(this, source);

  this.points = [];

  for (var i = 0, l = source.points.length; i < l; i++) {
    var point = source.points[i];
    this.points.push(point.clone());
  }

  return this;
};

SplineCurve.prototype.toJSON = function () {
  var data = _Curve.Curve.prototype.toJSON.call(this);

  data.points = [];

  for (var i = 0, l = this.points.length; i < l; i++) {
    var point = this.points[i];
    data.points.push(point.toArray());
  }

  return data;
};

SplineCurve.prototype.fromJSON = function (json) {
  _Curve.Curve.prototype.fromJSON.call(this, json);

  this.points = [];

  for (var i = 0, l = json.points.length; i < l; i++) {
    var point = json.points[i];
    this.points.push(new _Vector.Vector2().fromArray(point));
  }

  return this;
};