"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NormalNode = NormalNode;

var _TempNode = require("../core/TempNode.js");

var _NodeLib = require("../core/NodeLib.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function NormalNode(scope) {
  _TempNode.TempNode.call(this, 'v3');

  this.scope = scope || NormalNode.VIEW;
}

NormalNode.LOCAL = 'local';
NormalNode.WORLD = 'world';
NormalNode.VIEW = 'view';
NormalNode.prototype = Object.create(_TempNode.TempNode.prototype);
NormalNode.prototype.constructor = NormalNode;
NormalNode.prototype.nodeType = "Normal";

NormalNode.prototype.getShared = function () {
  // if shared is false, TempNode will not create temp variable (for optimization)
  return this.scope === NormalNode.WORLD;
};

NormalNode.prototype.generate = function (builder, output) {
  var result;

  switch (this.scope) {
    case NormalNode.VIEW:
      if (builder.isShader('vertex')) result = 'transformedNormal';else result = 'geometryNormal';
      break;

    case NormalNode.LOCAL:
      if (builder.isShader('vertex')) {
        result = 'objectNormal';
      } else {
        builder.requires.normal = true;
        result = 'vObjectNormal';
      }

      break;

    case NormalNode.WORLD:
      if (builder.isShader('vertex')) {
        result = 'inverseTransformDirection( transformedNormal, viewMatrix ).xyz';
      } else {
        builder.requires.worldNormal = true;
        result = 'vWNormal';
      }

      break;
  }

  return builder.format(result, this.getType(builder), output);
};

NormalNode.prototype.copy = function (source) {
  _TempNode.TempNode.prototype.copy.call(this, source);

  this.scope = source.scope;
  return this;
};

NormalNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.scope = this.scope;
  }

  return data;
};

_NodeLib.NodeLib.addKeyword('viewNormal', function () {
  return new NormalNode(NormalNode.VIEW);
});

_NodeLib.NodeLib.addKeyword('localNormal', function () {
  return new NormalNode(NormalNode.NORMAL);
});

_NodeLib.NodeLib.addKeyword('worldNormal', function () {
  return new NormalNode(NormalNode.WORLD);
});