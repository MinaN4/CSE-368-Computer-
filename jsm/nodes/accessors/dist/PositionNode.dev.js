"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PositionNode = PositionNode;

var _TempNode = require("../core/TempNode.js");

var _NodeLib = require("../core/NodeLib.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function PositionNode(scope) {
  _TempNode.TempNode.call(this, 'v3');

  this.scope = scope || PositionNode.LOCAL;
}

PositionNode.LOCAL = 'local';
PositionNode.WORLD = 'world';
PositionNode.VIEW = 'view';
PositionNode.PROJECTION = 'projection';
PositionNode.prototype = Object.create(_TempNode.TempNode.prototype);
PositionNode.prototype.constructor = PositionNode;
PositionNode.prototype.nodeType = "Position";

PositionNode.prototype.getType = function () {
  switch (this.scope) {
    case PositionNode.PROJECTION:
      return 'v4';
  }

  return this.type;
};

PositionNode.prototype.getShared = function ()
/* builder */
{
  switch (this.scope) {
    case PositionNode.LOCAL:
    case PositionNode.WORLD:
      return false;
  }

  return true;
};

PositionNode.prototype.generate = function (builder, output) {
  var result;

  switch (this.scope) {
    case PositionNode.LOCAL:
      if (builder.isShader('vertex')) {
        result = 'transformed';
      } else {
        builder.requires.position = true;
        result = 'vPosition';
      }

      break;

    case PositionNode.WORLD:
      if (builder.isShader('vertex')) {
        return '( modelMatrix * vec4( transformed, 1.0 ) ).xyz';
      } else {
        builder.requires.worldPosition = true;
        result = 'vWPosition';
      }

      break;

    case PositionNode.VIEW:
      result = builder.isShader('vertex') ? '-mvPosition.xyz' : 'vViewPosition';
      break;

    case PositionNode.PROJECTION:
      result = builder.isShader('vertex') ? '( projectionMatrix * modelViewMatrix * vec4( position, 1.0 ) )' : 'vec4( 0.0 )';
      break;
  }

  return builder.format(result, this.getType(builder), output);
};

PositionNode.prototype.copy = function (source) {
  _TempNode.TempNode.prototype.copy.call(this, source);

  this.scope = source.scope;
  return this;
};

PositionNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.scope = this.scope;
  }

  return data;
};

_NodeLib.NodeLib.addKeyword('position', function () {
  return new PositionNode();
});

_NodeLib.NodeLib.addKeyword('worldPosition', function () {
  return new PositionNode(PositionNode.WORLD);
});

_NodeLib.NodeLib.addKeyword('viewPosition', function () {
  return new PositionNode(PositionNode.VIEW);
});