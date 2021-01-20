"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fog = Fog;

var _Color = require("../math/Color.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
function Fog(color, near, far) {
  this.name = '';
  this.color = new _Color.Color(color);
  this.near = near !== undefined ? near : 1;
  this.far = far !== undefined ? far : 1000;
}

Object.assign(Fog.prototype, {
  isFog: true,
  clone: function clone() {
    return new Fog(this.color, this.near, this.far);
  },
  toJSON: function toJSON()
  /* meta */
  {
    return {
      type: 'Fog',
      color: this.color.getHex(),
      near: this.near,
      far: this.far
    };
  }
});