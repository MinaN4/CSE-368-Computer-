"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpriteNodeMaterial = SpriteNodeMaterial;

var _SpriteNode = require("./nodes/SpriteNode.js");

var _NodeMaterial = require("./NodeMaterial.js");

var _NodeUtils = require("../core/NodeUtils.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function SpriteNodeMaterial() {
  var node = new _SpriteNode.SpriteNode();

  _NodeMaterial.NodeMaterial.call(this, node, node);

  this.type = "SpriteNodeMaterial";
}

SpriteNodeMaterial.prototype = Object.create(_NodeMaterial.NodeMaterial.prototype);
SpriteNodeMaterial.prototype.constructor = SpriteNodeMaterial;

_NodeUtils.NodeUtils.addShortcuts(SpriteNodeMaterial.prototype, 'fragment', ['color', 'alpha', 'mask', 'position', 'spherical']);