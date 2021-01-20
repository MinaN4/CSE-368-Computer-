"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FogExp2 = FogExp2;

var _Color = require("../math/Color.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
function FogExp2(color, density) {
  this.name = '';
  this.color = new _Color.Color(color);
  this.density = density !== undefined ? density : 0.00025;
}

Object.assign(FogExp2.prototype, {
  isFogExp2: true,
  clone: function clone() {
    return new FogExp2(this.color, this.density);
  },
  toJSON: function toJSON()
  /* meta */
  {
    return {
      type: 'FogExp2',
      color: this.color.getHex(),
      density: this.density
    };
  }
});