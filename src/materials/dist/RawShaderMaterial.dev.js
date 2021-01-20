"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawShaderMaterial = RawShaderMaterial;

var _ShaderMaterial = require("./ShaderMaterial.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function RawShaderMaterial(parameters) {
  _ShaderMaterial.ShaderMaterial.call(this, parameters);

  this.type = 'RawShaderMaterial';
}

RawShaderMaterial.prototype = Object.create(_ShaderMaterial.ShaderMaterial.prototype);
RawShaderMaterial.prototype.constructor = RawShaderMaterial;
RawShaderMaterial.prototype.isRawShaderMaterial = true;