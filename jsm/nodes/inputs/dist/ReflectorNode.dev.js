"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReflectorNode = ReflectorNode;

var _TempNode = require("../core/TempNode.js");

var _InputNode = require("../core/InputNode.js");

var _PositionNode = require("../accessors/PositionNode.js");

var _OperatorNode = require("../math/OperatorNode.js");

var _TextureNode = require("./TextureNode.js");

var _Matrix4Node = require("./Matrix4Node.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function ReflectorNode(mirror) {
  _TempNode.TempNode.call(this, 'v4');

  if (mirror) this.setMirror(mirror);
}

ReflectorNode.prototype = Object.create(_TempNode.TempNode.prototype);
ReflectorNode.prototype.constructor = ReflectorNode;
ReflectorNode.prototype.nodeType = "Reflector";

ReflectorNode.prototype.setMirror = function (mirror) {
  this.mirror = mirror;
  this.textureMatrix = new _Matrix4Node.Matrix4Node(this.mirror.material.uniforms.textureMatrix.value);
  this.localPosition = new _PositionNode.PositionNode(_PositionNode.PositionNode.LOCAL);
  this.uv = new _OperatorNode.OperatorNode(this.textureMatrix, this.localPosition, _OperatorNode.OperatorNode.MUL);
  this.uvResult = new _OperatorNode.OperatorNode(null, this.uv, _OperatorNode.OperatorNode.ADD);
  this.texture = new _TextureNode.TextureNode(this.mirror.material.uniforms.tDiffuse.value, this.uv, null, true);
};

ReflectorNode.prototype.generate = function (builder, output) {
  if (builder.isShader('fragment')) {
    this.uvResult.a = this.offset;
    this.texture.uv = this.offset ? this.uvResult : this.uv;

    if (output === 'sampler2D') {
      return this.texture.build(builder, output);
    }

    return builder.format(this.texture.build(builder, this.type), this.type, output);
  } else {
    console.warn("THREE.ReflectorNode is not compatible with " + builder.shader + " shader.");
    return builder.format('vec4( 0.0 )', this.type, output);
  }
};

ReflectorNode.prototype.copy = function (source) {
  _InputNode.InputNode.prototype.copy.call(this, source);

  this.scope.mirror = source.mirror;
  return this;
};

ReflectorNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.mirror = this.mirror.uuid;
    if (this.offset) data.offset = this.offset.toJSON(meta).uuid;
  }

  return data;
};