"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bone = Bone;

var _Object3D = require("../core/Object3D.js");

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author ikerr / http://verold.com
 */
function Bone() {
  _Object3D.Object3D.call(this);

  this.type = 'Bone';
}

Bone.prototype = Object.assign(Object.create(_Object3D.Object3D.prototype), {
  constructor: Bone,
  isBone: true
});