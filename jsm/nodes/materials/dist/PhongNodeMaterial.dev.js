"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhongNodeMaterial = PhongNodeMaterial;

var _PhongNode = require("./nodes/PhongNode.js");

var _NodeMaterial = require("./NodeMaterial.js");

var _NodeUtils = require("../core/NodeUtils.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function PhongNodeMaterial() {
  var node = new _PhongNode.PhongNode();

  _NodeMaterial.NodeMaterial.call(this, node, node);

  this.type = "PhongNodeMaterial";
}

PhongNodeMaterial.prototype = Object.create(_NodeMaterial.NodeMaterial.prototype);
PhongNodeMaterial.prototype.constructor = PhongNodeMaterial;

_NodeUtils.NodeUtils.addShortcuts(PhongNodeMaterial.prototype, 'fragment', ['color', 'alpha', 'specular', 'shininess', 'normal', 'emissive', 'ambient', 'light', 'shadow', 'ao', 'environment', 'environmentAlpha', 'mask', 'position']);