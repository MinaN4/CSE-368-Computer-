"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineBasicMaterial = LineBasicMaterial;

var _Material = require("./Material.js");

var _Color = require("../math/Color.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  linewidth: <float>,
 *  linecap: "round",
 *  linejoin: "round"
 * }
 */
function LineBasicMaterial(parameters) {
  _Material.Material.call(this);

  this.type = 'LineBasicMaterial';
  this.color = new _Color.Color(0xffffff);
  this.linewidth = 1;
  this.linecap = 'round';
  this.linejoin = 'round';
  this.setValues(parameters);
}

LineBasicMaterial.prototype = Object.create(_Material.Material.prototype);
LineBasicMaterial.prototype.constructor = LineBasicMaterial;
LineBasicMaterial.prototype.isLineBasicMaterial = true;

LineBasicMaterial.prototype.copy = function (source) {
  _Material.Material.prototype.copy.call(this, source);

  this.color.copy(source.color);
  this.linewidth = source.linewidth;
  this.linecap = source.linecap;
  this.linejoin = source.linejoin;
  return this;
};