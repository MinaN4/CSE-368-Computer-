"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StandardNodeMaterial = StandardNodeMaterial;

var _StandardNode = require("./nodes/StandardNode.js");

var _NodeMaterial = require("./NodeMaterial.js");

var _NodeUtils = require("../core/NodeUtils.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function StandardNodeMaterial() {
  var node = new _StandardNode.StandardNode();

  _NodeMaterial.NodeMaterial.call(this, node, node);

  this.type = "StandardNodeMaterial";
}

StandardNodeMaterial.prototype = Object.create(_NodeMaterial.NodeMaterial.prototype);
StandardNodeMaterial.prototype.constructor = StandardNodeMaterial;

_NodeUtils.NodeUtils.addShortcuts(StandardNodeMaterial.prototype, 'fragment', ['color', 'alpha', 'roughness', 'metalness', 'reflectivity', 'clearcoat', 'clearcoatRoughness', 'clearcoatNormal', 'normal', 'emissive', 'ambient', 'light', 'shadow', 'ao', 'environment', 'mask', 'position', 'sheen']);