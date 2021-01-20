"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmediateRenderObject = ImmediateRenderObject;

var _Object3D = require("../../core/Object3D.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
function ImmediateRenderObject(material) {
  _Object3D.Object3D.call(this);

  this.material = material;

  this.render = function ()
  /* renderCallback */
  {};
}

ImmediateRenderObject.prototype = Object.create(_Object3D.Object3D.prototype);
ImmediateRenderObject.prototype.constructor = ImmediateRenderObject;
ImmediateRenderObject.prototype.isImmediateRenderObject = true;