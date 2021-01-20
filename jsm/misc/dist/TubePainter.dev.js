"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TubePainter = TubePainter;

var _threeModule = require("../../../build/three.module.js");

/**
 * @author mr.doob / http://mrdoob.com/
 */
function TubePainter() {
  var BUFFER_SIZE = 1000000 * 3;
  var positions = new _threeModule.BufferAttribute(new Float32Array(BUFFER_SIZE), 3);
  positions.usage = _threeModule.DynamicDrawUsage;
  var normals = new _threeModule.BufferAttribute(new Float32Array(BUFFER_SIZE), 3);
  normals.usage = _threeModule.DynamicDrawUsage;
  var colors = new _threeModule.BufferAttribute(new Float32Array(BUFFER_SIZE), 3);
  colors.usage = _threeModule.DynamicDrawUsage;
  var geometry = new _threeModule.BufferGeometry();
  geometry.setAttribute('position', positions);
  geometry.setAttribute('normal', normals);
  geometry.setAttribute('color', colors);
  geometry.drawRange.count = 0;
  var material = new _threeModule.MeshStandardMaterial({
    roughness: 0.9,
    metalness: 0.0,
    vertexColors: _threeModule.VertexColors
  });
  var mesh = new _threeModule.Mesh(geometry, material);
  mesh.frustumCulled = false; //

  function getPoints(size) {
    var PI2 = Math.PI * 2;
    var sides = 10;
    var array = [];
    var radius = 0.01 * size;

    for (var i = 0; i < sides; i++) {
      var angle = i / sides * PI2;
      array.push(new _threeModule.Vector3(Math.sin(angle) * radius, Math.cos(angle) * radius, 0));
    }

    return array;
  }

  var vector1 = new _threeModule.Vector3();
  var vector2 = new _threeModule.Vector3();
  var vector3 = new _threeModule.Vector3();
  var vector4 = new _threeModule.Vector3();
  var color = new _threeModule.Color(0xffffff);
  var size = 1;

  function stroke(position1, position2, matrix1, matrix2) {
    if (position1.distanceToSquared(position2) === 0) return;
    var count = geometry.drawRange.count;
    var points = getPoints(size);

    for (var i = 0, il = points.length; i < il; i++) {
      var vertex1 = points[i];
      var vertex2 = points[(i + 1) % il]; // positions

      vector1.copy(vertex1).applyMatrix4(matrix2).add(position2);
      vector2.copy(vertex2).applyMatrix4(matrix2).add(position2);
      vector3.copy(vertex2).applyMatrix4(matrix1).add(position1);
      vector4.copy(vertex1).applyMatrix4(matrix1).add(position1);
      vector1.toArray(positions.array, (count + 0) * 3);
      vector2.toArray(positions.array, (count + 1) * 3);
      vector4.toArray(positions.array, (count + 2) * 3);
      vector2.toArray(positions.array, (count + 3) * 3);
      vector3.toArray(positions.array, (count + 4) * 3);
      vector4.toArray(positions.array, (count + 5) * 3); // normals

      vector1.copy(vertex1).applyMatrix4(matrix2).normalize();
      vector2.copy(vertex2).applyMatrix4(matrix2).normalize();
      vector3.copy(vertex2).applyMatrix4(matrix1).normalize();
      vector4.copy(vertex1).applyMatrix4(matrix1).normalize();
      vector1.toArray(normals.array, (count + 0) * 3);
      vector2.toArray(normals.array, (count + 1) * 3);
      vector4.toArray(normals.array, (count + 2) * 3);
      vector2.toArray(normals.array, (count + 3) * 3);
      vector3.toArray(normals.array, (count + 4) * 3);
      vector4.toArray(normals.array, (count + 5) * 3); // colors

      color.toArray(colors.array, (count + 0) * 3);
      color.toArray(colors.array, (count + 1) * 3);
      color.toArray(colors.array, (count + 2) * 3);
      color.toArray(colors.array, (count + 3) * 3);
      color.toArray(colors.array, (count + 4) * 3);
      color.toArray(colors.array, (count + 5) * 3);
      count += 6;
    }

    geometry.drawRange.count = count;
  }

  function setSize(value) {
    size = value;
  }

  function updateGeometry(start, end) {
    if (start === end) return;
    var offset = start * 3;
    var count = (end - start) * 3;
    positions.updateRange.offset = offset;
    positions.updateRange.count = count;
    positions.needsUpdate = true;
    normals.updateRange.offset = offset;
    normals.updateRange.count = count;
    normals.needsUpdate = true;
    colors.updateRange.offset = offset;
    colors.updateRange.count = count;
    colors.needsUpdate = true;
  }

  return {
    mesh: mesh,
    stroke: stroke,
    setSize: setSize,
    updateGeometry: updateGeometry
  };
}