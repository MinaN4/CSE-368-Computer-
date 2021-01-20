"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HemisphereLightProbe = HemisphereLightProbe;

var _Color = require("../math/Color.js");

var _Vector = require("../math/Vector3.js");

var _LightProbe = require("./LightProbe.js");

/**
 * @author WestLangley / http://github.com/WestLangley
 */
function HemisphereLightProbe(skyColor, groundColor, intensity) {
  _LightProbe.LightProbe.call(this, undefined, intensity);

  var color1 = new _Color.Color().set(skyColor);
  var color2 = new _Color.Color().set(groundColor);
  var sky = new _Vector.Vector3(color1.r, color1.g, color1.b);
  var ground = new _Vector.Vector3(color2.r, color2.g, color2.b); // without extra factor of PI in the shader, should = 1 / Math.sqrt( Math.PI );

  var c0 = Math.sqrt(Math.PI);
  var c1 = c0 * Math.sqrt(0.75);
  this.sh.coefficients[0].copy(sky).add(ground).multiplyScalar(c0);
  this.sh.coefficients[1].copy(sky).sub(ground).multiplyScalar(c1);
}

HemisphereLightProbe.prototype = Object.assign(Object.create(_LightProbe.LightProbe.prototype), {
  constructor: HemisphereLightProbe,
  isHemisphereLightProbe: true,
  copy: function copy(source) {
    // modifying colors not currently supported
    _LightProbe.LightProbe.prototype.copy.call(this, source);

    return this;
  },
  toJSON: function toJSON(meta) {
    var data = _LightProbe.LightProbe.prototype.toJSON.call(this, meta); // data.sh = this.sh.toArray(); // todo


    return data;
  }
});