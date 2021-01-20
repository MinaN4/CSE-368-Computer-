"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Group = Group;

var _Object3D = require("../core/Object3D.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function Group() {
  _Object3D.Object3D.call(this);

  this.type = 'Group';
}

Group.prototype = Object.assign(Object.create(_Object3D.Object3D.prototype), {
  constructor: Group,
  isGroup: true
});