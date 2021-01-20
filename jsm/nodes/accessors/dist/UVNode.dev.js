"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UVNode = UVNode;

var _TempNode = require("../core/TempNode.js");

var _NodeLib = require("../core/NodeLib.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
var vertexDict = ['uv', 'uv2'],
    fragmentDict = ['vUv', 'vUv2'];

function UVNode(index) {
  _TempNode.TempNode.call(this, 'v2', {
    shared: false
  });

  this.index = index || 0;
}

UVNode.prototype = Object.create(_TempNode.TempNode.prototype);
UVNode.prototype.constructor = UVNode;
UVNode.prototype.nodeType = "UV";

UVNode.prototype.generate = function (builder, output) {
  builder.requires.uv[this.index] = true;
  var result = builder.isShader('vertex') ? vertexDict[this.index] : fragmentDict[this.index];
  return builder.format(result, this.getType(builder), output);
};

UVNode.prototype.copy = function (source) {
  _TempNode.TempNode.prototype.copy.call(this, source);

  this.index = source.index;
  return this;
};

UVNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.index = this.index;
  }

  return data;
};

_NodeLib.NodeLib.addKeyword('uv', function () {
  return new UVNode();
});

_NodeLib.NodeLib.addKeyword('uv2', function () {
  return new UVNode(1);
});