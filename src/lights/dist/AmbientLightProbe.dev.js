"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmbientLightProbe = AmbientLightProbe;

var _Color = require("../math/Color.js");

var _LightProbe = require("./LightProbe.js");

/**
 * @author WestLangley / http://github.com/WestLangley
 */
function AmbientLightProbe(color, intensity) {
  _LightProbe.LightProbe.call(this, undefined, intensity);

  var color1 = new _Color.Color().set(color); // without extra factor of PI in the shader, would be 2 / Math.sqrt( Math.PI );

  this.sh.coefficients[0].set(color1.r, color1.g, color1.b).multiplyScalar(2 * Math.sqrt(Math.PI));
}

AmbientLightProbe.prototype = Object.assign(Object.create(_LightProbe.LightProbe.prototype), {
  constructor: AmbientLightProbe,
  isAmbientLightProbe: true,
  copy: function copy(source) {
    // modifying color not currently supported
    _LightProbe.LightProbe.prototype.copy.call(this, source);

    return this;
  },
  toJSON: function toJSON(meta) {
    var data = _LightProbe.LightProbe.prototype.toJSON.call(this, meta); // data.sh = this.sh.toArray(); // todo


    return data;
  }
});