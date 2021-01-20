"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Path = Path;

var _Vector = require("../../math/Vector2.js");

var _CurvePath = require("./CurvePath.js");

var _EllipseCurve = require("../curves/EllipseCurve.js");

var _SplineCurve = require("../curves/SplineCurve.js");

var _CubicBezierCurve = require("../curves/CubicBezierCurve.js");

var _QuadraticBezierCurve = require("../curves/QuadraticBezierCurve.js");

var _LineCurve = require("../curves/LineCurve.js");

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Creates free form 2d path using series of points, lines or curves.
 **/
function Path(points) {
  _CurvePath.CurvePath.call(this);

  this.type = 'Path';
  this.currentPoint = new _Vector.Vector2();

  if (points) {
    this.setFromPoints(points);
  }
}

Path.prototype = Object.assign(Object.create(_CurvePath.CurvePath.prototype), {
  constructor: Path,
  setFromPoints: function setFromPoints(points) {
    this.moveTo(points[0].x, points[0].y);

    for (var i = 1, l = points.length; i < l; i++) {
      this.lineTo(points[i].x, points[i].y);
    }

    return this;
  },
  moveTo: function moveTo(x, y) {
    this.currentPoint.set(x, y); // TODO consider referencing vectors instead of copying?

    return this;
  },
  lineTo: function lineTo(x, y) {
    var curve = new _LineCurve.LineCurve(this.currentPoint.clone(), new _Vector.Vector2(x, y));
    this.curves.push(curve);
    this.currentPoint.set(x, y);
    return this;
  },
  quadraticCurveTo: function quadraticCurveTo(aCPx, aCPy, aX, aY) {
    var curve = new _QuadraticBezierCurve.QuadraticBezierCurve(this.currentPoint.clone(), new _Vector.Vector2(aCPx, aCPy), new _Vector.Vector2(aX, aY));
    this.curves.push(curve);
    this.currentPoint.set(aX, aY);
    return this;
  },
  bezierCurveTo: function bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) {
    var curve = new _CubicBezierCurve.CubicBezierCurve(this.currentPoint.clone(), new _Vector.Vector2(aCP1x, aCP1y), new _Vector.Vector2(aCP2x, aCP2y), new _Vector.Vector2(aX, aY));
    this.curves.push(curve);
    this.currentPoint.set(aX, aY);
    return this;
  },
  splineThru: function splineThru(pts
  /*Array of Vector*/
  ) {
    var npts = [this.currentPoint.clone()].concat(pts);
    var curve = new _SplineCurve.SplineCurve(npts);
    this.curves.push(curve);
    this.currentPoint.copy(pts[pts.length - 1]);
    return this;
  },
  arc: function arc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
    var x0 = this.currentPoint.x;
    var y0 = this.currentPoint.y;
    this.absarc(aX + x0, aY + y0, aRadius, aStartAngle, aEndAngle, aClockwise);
    return this;
  },
  absarc: function absarc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
    this.absellipse(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
    return this;
  },
  ellipse: function ellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
    var x0 = this.currentPoint.x;
    var y0 = this.currentPoint.y;
    this.absellipse(aX + x0, aY + y0, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);
    return this;
  },
  absellipse: function absellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
    var curve = new _EllipseCurve.EllipseCurve(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);

    if (this.curves.length > 0) {
      // if a previous curve is present, attempt to join
      var firstPoint = curve.getPoint(0);

      if (!firstPoint.equals(this.currentPoint)) {
        this.lineTo(firstPoint.x, firstPoint.y);
      }
    }

    this.curves.push(curve);
    var lastPoint = curve.getPoint(1);
    this.currentPoint.copy(lastPoint);
    return this;
  },
  copy: function copy(source) {
    _CurvePath.CurvePath.prototype.copy.call(this, source);

    this.currentPoint.copy(source.currentPoint);
    return this;
  },
  toJSON: function toJSON() {
    var data = _CurvePath.CurvePath.prototype.toJSON.call(this);

    data.currentPoint = this.currentPoint.toArray();
    return data;
  },
  fromJSON: function fromJSON(json) {
    _CurvePath.CurvePath.prototype.fromJSON.call(this, json);

    this.currentPoint.fromArray(json.currentPoint);
    return this;
  }
});