"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shape = Shape;

var _Path = require("./Path.js");

var _Math2 = require("../../math/Math.js");

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Defines a 2d shape plane using paths.
 **/
// STEP 1 Create a path.
// STEP 2 Turn path into shape.
// STEP 3 ExtrudeGeometry takes in Shape/Shapes
// STEP 3a - Extract points from each shape, turn to vertices
// STEP 3b - Triangulate each shape, add faces.
function Shape(points) {
  _Path.Path.call(this, points);

  this.uuid = _Math2._Math.generateUUID();
  this.type = 'Shape';
  this.holes = [];
}

Shape.prototype = Object.assign(Object.create(_Path.Path.prototype), {
  constructor: Shape,
  getPointsHoles: function getPointsHoles(divisions) {
    var holesPts = [];

    for (var i = 0, l = this.holes.length; i < l; i++) {
      holesPts[i] = this.holes[i].getPoints(divisions);
    }

    return holesPts;
  },
  // get points of shape and holes (keypoints based on segments parameter)
  extractPoints: function extractPoints(divisions) {
    return {
      shape: this.getPoints(divisions),
      holes: this.getPointsHoles(divisions)
    };
  },
  copy: function copy(source) {
    _Path.Path.prototype.copy.call(this, source);

    this.holes = [];

    for (var i = 0, l = source.holes.length; i < l; i++) {
      var hole = source.holes[i];
      this.holes.push(hole.clone());
    }

    return this;
  },
  toJSON: function toJSON() {
    var data = _Path.Path.prototype.toJSON.call(this);

    data.uuid = this.uuid;
    data.holes = [];

    for (var i = 0, l = this.holes.length; i < l; i++) {
      var hole = this.holes[i];
      data.holes.push(hole.toJSON());
    }

    return data;
  },
  fromJSON: function fromJSON(json) {
    _Path.Path.prototype.fromJSON.call(this, json);

    this.uuid = json.uuid;
    this.holes = [];

    for (var i = 0, l = json.holes.length; i < l; i++) {
      var hole = json.holes[i];
      this.holes.push(new _Path.Path().fromJSON(hole));
    }

    return this;
  }
});