"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HemisphereLightHelper = HemisphereLightHelper;

var _Vector = require("../math/Vector3.js");

var _Color = require("../math/Color.js");

var _Object3D = require("../core/Object3D.js");

var _Mesh = require("../objects/Mesh.js");

var _constants = require("../constants.js");

var _MeshBasicMaterial = require("../materials/MeshBasicMaterial.js");

var _OctahedronGeometry = require("../geometries/OctahedronGeometry.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */
var _vector = new _Vector.Vector3();

var _color1 = new _Color.Color();

var _color2 = new _Color.Color();

function HemisphereLightHelper(light, size, color) {
  _Object3D.Object3D.call(this);

  this.light = light;
  this.light.updateMatrixWorld();
  this.matrix = light.matrixWorld;
  this.matrixAutoUpdate = false;
  this.color = color;
  var geometry = new _OctahedronGeometry.OctahedronBufferGeometry(size);
  geometry.rotateY(Math.PI * 0.5);
  this.material = new _MeshBasicMaterial.MeshBasicMaterial({
    wireframe: true,
    fog: false
  });
  if (this.color === undefined) this.material.vertexColors = _constants.VertexColors;
  var position = geometry.getAttribute('position');
  var colors = new Float32Array(position.count * 3);
  geometry.setAttribute('color', new _BufferAttribute.BufferAttribute(colors, 3));
  this.add(new _Mesh.Mesh(geometry, this.material));
  this.update();
}

HemisphereLightHelper.prototype = Object.create(_Object3D.Object3D.prototype);
HemisphereLightHelper.prototype.constructor = HemisphereLightHelper;

HemisphereLightHelper.prototype.dispose = function () {
  this.children[0].geometry.dispose();
  this.children[0].material.dispose();
};

HemisphereLightHelper.prototype.update = function () {
  var mesh = this.children[0];

  if (this.color !== undefined) {
    this.material.color.set(this.color);
  } else {
    var colors = mesh.geometry.getAttribute('color');

    _color1.copy(this.light.color);

    _color2.copy(this.light.groundColor);

    for (var i = 0, l = colors.count; i < l; i++) {
      var color = i < l / 2 ? _color1 : _color2;
      colors.setXYZ(i, color.r, color.g, color.b);
    }

    colors.needsUpdate = true;
  }

  mesh.lookAt(_vector.setFromMatrixPosition(this.light.matrixWorld).negate());
};