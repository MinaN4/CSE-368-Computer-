"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayCamera = ArrayCamera;

var _PerspectiveCamera = require("./PerspectiveCamera.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function ArrayCamera(array) {
  _PerspectiveCamera.PerspectiveCamera.call(this);

  this.cameras = array || [];
}

ArrayCamera.prototype = Object.assign(Object.create(_PerspectiveCamera.PerspectiveCamera.prototype), {
  constructor: ArrayCamera,
  isArrayCamera: true
});