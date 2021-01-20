"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineDashedMaterial = LineDashedMaterial;

var _LineBasicMaterial = require("./LineBasicMaterial.js");

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  linewidth: <float>,
 *
 *  scale: <float>,
 *  dashSize: <float>,
 *  gapSize: <float>
 * }
 */
function LineDashedMaterial(parameters) {
  _LineBasicMaterial.LineBasicMaterial.call(this);

  this.type = 'LineDashedMaterial';
  this.scale = 1;
  this.dashSize = 3;
  this.gapSize = 1;
  this.setValues(parameters);
}

LineDashedMaterial.prototype = Object.create(_LineBasicMaterial.LineBasicMaterial.prototype);
LineDashedMaterial.prototype.constructor = LineDashedMaterial;
LineDashedMaterial.prototype.isLineDashedMaterial = true;

LineDashedMaterial.prototype.copy = function (source) {
  _LineBasicMaterial.LineBasicMaterial.prototype.copy.call(this, source);

  this.scale = source.scale;
  this.dashSize = source.dashSize;
  this.gapSize = source.gapSize;
  return this;
};