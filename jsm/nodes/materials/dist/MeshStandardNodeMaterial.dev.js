"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshStandardNodeMaterial = MeshStandardNodeMaterial;

var _MeshStandardNode = require("./nodes/MeshStandardNode.js");

var _NodeMaterial = require("./NodeMaterial.js");

var _NodeUtils = require("../core/NodeUtils.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function MeshStandardNodeMaterial() {
  var node = new _MeshStandardNode.MeshStandardNode();

  _NodeMaterial.NodeMaterial.call(this, node, node);

  this.type = "MeshStandardNodeMaterial";
}

MeshStandardNodeMaterial.prototype = Object.create(_NodeMaterial.NodeMaterial.prototype);
MeshStandardNodeMaterial.prototype.constructor = MeshStandardNodeMaterial;

_NodeUtils.NodeUtils.addShortcuts(MeshStandardNodeMaterial.prototype, 'properties', ["color", "roughness", "metalness", "map", "normalMap", "normalScale", "metalnessMap", "roughnessMap", "envMap"]);