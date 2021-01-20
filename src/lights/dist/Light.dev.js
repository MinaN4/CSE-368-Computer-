"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Light = Light;

var _Object3D = require("../core/Object3D.js");

var _Color = require("../math/Color.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
function Light(color, intensity) {
  _Object3D.Object3D.call(this);

  this.type = 'Light';
  this.color = new _Color.Color(color);
  this.intensity = intensity !== undefined ? intensity : 1;
  this.receiveShadow = undefined;
}

Light.prototype = Object.assign(Object.create(_Object3D.Object3D.prototype), {
  constructor: Light,
  isLight: true,
  copy: function copy(source) {
    _Object3D.Object3D.prototype.copy.call(this, source);

    this.color.copy(source.color);
    this.intensity = source.intensity;
    return this;
  },
  toJSON: function toJSON(meta) {
    var data = _Object3D.Object3D.prototype.toJSON.call(this, meta);

    data.object.color = this.color.getHex();
    data.object.intensity = this.intensity;
    if (this.groundColor !== undefined) data.object.groundColor = this.groundColor.getHex();
    if (this.distance !== undefined) data.object.distance = this.distance;
    if (this.angle !== undefined) data.object.angle = this.angle;
    if (this.decay !== undefined) data.object.decay = this.decay;
    if (this.penumbra !== undefined) data.object.penumbra = this.penumbra;
    if (this.shadow !== undefined) data.object.shadow = this.shadow.toJSON();
    return data;
  }
});