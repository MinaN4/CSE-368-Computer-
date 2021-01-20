"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecularMIPLevelNode = SpecularMIPLevelNode;

var _TempNode = require("../core/TempNode.js");

var _FunctionNode = require("../core/FunctionNode.js");

var _MaxMIPLevelNode = require("./MaxMIPLevelNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function SpecularMIPLevelNode(roughness, texture) {
  _TempNode.TempNode.call(this, 'f');

  this.roughness = roughness;
  this.texture = texture;
  this.maxMIPLevel = undefined;
}

SpecularMIPLevelNode.Nodes = function () {
  var getSpecularMIPLevel = new _FunctionNode.FunctionNode([// taken from here: http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html
  "float getSpecularMIPLevel( const in float roughness, const in float maxMIPLevelScalar ) {", "	float sigma = PI * roughness * roughness / ( 1.0 + roughness );", "	float desiredMIPLevel = maxMIPLevelScalar + log2( sigma );", // clamp to allowable LOD ranges.
  "	return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );", "}"].join("\n"));
  return {
    getSpecularMIPLevel: getSpecularMIPLevel
  };
}();

SpecularMIPLevelNode.prototype = Object.create(_TempNode.TempNode.prototype);
SpecularMIPLevelNode.prototype.constructor = SpecularMIPLevelNode;
SpecularMIPLevelNode.prototype.nodeType = "SpecularMIPLevel";

SpecularMIPLevelNode.prototype.setTexture = function (texture) {
  this.texture = texture;
  return this;
};

SpecularMIPLevelNode.prototype.generate = function (builder, output) {
  if (builder.isShader('fragment')) {
    this.maxMIPLevel = this.maxMIPLevel || new _MaxMIPLevelNode.MaxMIPLevelNode();
    this.maxMIPLevel.texture = this.texture;
    var getSpecularMIPLevel = builder.include(SpecularMIPLevelNode.Nodes.getSpecularMIPLevel);
    return builder.format(getSpecularMIPLevel + '( ' + this.roughness.build(builder, 'f') + ', ' + this.maxMIPLevel.build(builder, 'f') + ' )', this.type, output);
  } else {
    console.warn("THREE.SpecularMIPLevelNode is not compatible with " + builder.shader + " shader.");
    return builder.format('0.0', this.type, output);
  }
};

SpecularMIPLevelNode.prototype.copy = function (source) {
  _TempNode.TempNode.prototype.copy.call(this, source);

  this.texture = source.texture;
  this.roughness = source.roughness;
  return this;
};

SpecularMIPLevelNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.texture = this.texture;
    data.roughness = this.roughness;
  }

  return data;
};