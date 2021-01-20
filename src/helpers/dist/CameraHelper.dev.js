"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraHelper = CameraHelper;

var _Camera = require("../cameras/Camera.js");

var _Vector = require("../math/Vector3.js");

var _LineSegments = require("../objects/LineSegments.js");

var _Color = require("../math/Color.js");

var _constants = require("../constants.js");

var _LineBasicMaterial = require("../materials/LineBasicMaterial.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

/**
 * @author alteredq / http://alteredqualia.com/
 * @author Mugen87 / https://github.com/Mugen87
 *
 *	- shows frustum, line of sight and up of the camera
 *	- suitable for fast updates
 * 	- based on frustum visualization in lightgl.js shadowmap example
 *		http://evanw.github.com/lightgl.js/tests/shadowmap.html
 */
var _vector = new _Vector.Vector3();

var _camera = new _Camera.Camera();

function CameraHelper(camera) {
  var geometry = new _BufferGeometry.BufferGeometry();
  var material = new _LineBasicMaterial.LineBasicMaterial({
    color: 0xffffff,
    vertexColors: _constants.FaceColors
  });
  var vertices = [];
  var colors = [];
  var pointMap = {}; // colors

  var colorFrustum = new _Color.Color(0xffaa00);
  var colorCone = new _Color.Color(0xff0000);
  var colorUp = new _Color.Color(0x00aaff);
  var colorTarget = new _Color.Color(0xffffff);
  var colorCross = new _Color.Color(0x333333); // near

  addLine('n1', 'n2', colorFrustum);
  addLine('n2', 'n4', colorFrustum);
  addLine('n4', 'n3', colorFrustum);
  addLine('n3', 'n1', colorFrustum); // far

  addLine('f1', 'f2', colorFrustum);
  addLine('f2', 'f4', colorFrustum);
  addLine('f4', 'f3', colorFrustum);
  addLine('f3', 'f1', colorFrustum); // sides

  addLine('n1', 'f1', colorFrustum);
  addLine('n2', 'f2', colorFrustum);
  addLine('n3', 'f3', colorFrustum);
  addLine('n4', 'f4', colorFrustum); // cone

  addLine('p', 'n1', colorCone);
  addLine('p', 'n2', colorCone);
  addLine('p', 'n3', colorCone);
  addLine('p', 'n4', colorCone); // up

  addLine('u1', 'u2', colorUp);
  addLine('u2', 'u3', colorUp);
  addLine('u3', 'u1', colorUp); // target

  addLine('c', 't', colorTarget);
  addLine('p', 'c', colorCross); // cross

  addLine('cn1', 'cn2', colorCross);
  addLine('cn3', 'cn4', colorCross);
  addLine('cf1', 'cf2', colorCross);
  addLine('cf3', 'cf4', colorCross);

  function addLine(a, b, color) {
    addPoint(a, color);
    addPoint(b, color);
  }

  function addPoint(id, color) {
    vertices.push(0, 0, 0);
    colors.push(color.r, color.g, color.b);

    if (pointMap[id] === undefined) {
      pointMap[id] = [];
    }

    pointMap[id].push(vertices.length / 3 - 1);
  }

  geometry.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new _BufferAttribute.Float32BufferAttribute(colors, 3));

  _LineSegments.LineSegments.call(this, geometry, material);

  this.camera = camera;
  if (this.camera.updateProjectionMatrix) this.camera.updateProjectionMatrix();
  this.matrix = camera.matrixWorld;
  this.matrixAutoUpdate = false;
  this.pointMap = pointMap;
  this.update();
}

CameraHelper.prototype = Object.create(_LineSegments.LineSegments.prototype);
CameraHelper.prototype.constructor = CameraHelper;

CameraHelper.prototype.update = function () {
  var geometry = this.geometry;
  var pointMap = this.pointMap;
  var w = 1,
      h = 1; // we need just camera projection matrix inverse
  // world matrix must be identity

  _camera.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse); // center / target


  setPoint('c', pointMap, geometry, _camera, 0, 0, -1);
  setPoint('t', pointMap, geometry, _camera, 0, 0, 1); // near

  setPoint('n1', pointMap, geometry, _camera, -w, -h, -1);
  setPoint('n2', pointMap, geometry, _camera, w, -h, -1);
  setPoint('n3', pointMap, geometry, _camera, -w, h, -1);
  setPoint('n4', pointMap, geometry, _camera, w, h, -1); // far

  setPoint('f1', pointMap, geometry, _camera, -w, -h, 1);
  setPoint('f2', pointMap, geometry, _camera, w, -h, 1);
  setPoint('f3', pointMap, geometry, _camera, -w, h, 1);
  setPoint('f4', pointMap, geometry, _camera, w, h, 1); // up

  setPoint('u1', pointMap, geometry, _camera, w * 0.7, h * 1.1, -1);
  setPoint('u2', pointMap, geometry, _camera, -w * 0.7, h * 1.1, -1);
  setPoint('u3', pointMap, geometry, _camera, 0, h * 2, -1); // cross

  setPoint('cf1', pointMap, geometry, _camera, -w, 0, 1);
  setPoint('cf2', pointMap, geometry, _camera, w, 0, 1);
  setPoint('cf3', pointMap, geometry, _camera, 0, -h, 1);
  setPoint('cf4', pointMap, geometry, _camera, 0, h, 1);
  setPoint('cn1', pointMap, geometry, _camera, -w, 0, -1);
  setPoint('cn2', pointMap, geometry, _camera, w, 0, -1);
  setPoint('cn3', pointMap, geometry, _camera, 0, -h, -1);
  setPoint('cn4', pointMap, geometry, _camera, 0, h, -1);
  geometry.getAttribute('position').needsUpdate = true;
};

function setPoint(point, pointMap, geometry, camera, x, y, z) {
  _vector.set(x, y, z).unproject(camera);

  var points = pointMap[point];

  if (points !== undefined) {
    var position = geometry.getAttribute('position');

    for (var i = 0, l = points.length; i < l; i++) {
      position.setXYZ(points[i], _vector.x, _vector.y, _vector.z);
    }
  }
}