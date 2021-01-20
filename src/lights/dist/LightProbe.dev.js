"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightProbe = LightProbe;

var _SphericalHarmonics = require("../math/SphericalHarmonics3.js");

var _Light = require("./Light.js");

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 * A LightProbe is a source of indirect-diffuse light
 */
function LightProbe(sh, intensity) {
  _Light.Light.call(this, undefined, intensity);

  this.sh = sh !== undefined ? sh : new _SphericalHarmonics.SphericalHarmonics3();
}

LightProbe.prototype = Object.assign(Object.create(_Light.Light.prototype), {
  constructor: LightProbe,
  isLightProbe: true,
  copy: function copy(source) {
    _Light.Light.prototype.copy.call(this, source);

    this.sh.copy(source.sh);
    this.intensity = source.intensity;
    return this;
  },
  toJSON: function toJSON(meta) {
    var data = _Light.Light.prototype.toJSON.call(this, meta); // data.sh = this.sh.toArray(); // todo


    return data;
  }
});