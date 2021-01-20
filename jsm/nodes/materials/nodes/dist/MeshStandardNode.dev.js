"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshStandardNode = MeshStandardNode;

var _threeModule = require("../../../../../build/three.module.js");

var _StandardNode = require("./StandardNode.js");

var _PropertyNode = require("../../inputs/PropertyNode.js");

var _OperatorNode = require("../../math/OperatorNode.js");

var _SwitchNode = require("../../utils/SwitchNode.js");

var _NormalMapNode = require("../../misc/NormalMapNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function MeshStandardNode() {
  _StandardNode.StandardNode.call(this);

  this.properties = {
    color: new _threeModule.Color(0xffffff),
    roughness: 0.5,
    metalness: 0.5,
    normalScale: new _threeModule.Vector2(1, 1)
  };
  this.inputs = {
    color: new _PropertyNode.PropertyNode(this.properties, 'color', 'c'),
    roughness: new _PropertyNode.PropertyNode(this.properties, 'roughness', 'f'),
    metalness: new _PropertyNode.PropertyNode(this.properties, 'metalness', 'f'),
    normalScale: new _PropertyNode.PropertyNode(this.properties, 'normalScale', 'v2')
  };
}

MeshStandardNode.prototype = Object.create(_StandardNode.StandardNode.prototype);
MeshStandardNode.prototype.constructor = MeshStandardNode;
MeshStandardNode.prototype.nodeType = "MeshStandard";

MeshStandardNode.prototype.build = function (builder) {
  var props = this.properties,
      inputs = this.inputs;

  if (builder.isShader('fragment')) {
    // slots
    // * color
    // * map
    var color = builder.findNode(props.color, inputs.color),
        map = builder.resolve(props.map);
    this.color = map ? new _OperatorNode.OperatorNode(color, map, _OperatorNode.OperatorNode.MUL) : color; // slots
    // * roughness
    // * roughnessMap

    var roughness = builder.findNode(props.roughness, inputs.roughness),
        roughnessMap = builder.resolve(props.roughnessMap);
    this.roughness = roughnessMap ? new _OperatorNode.OperatorNode(roughness, new _SwitchNode.SwitchNode(roughnessMap, "g"), _OperatorNode.OperatorNode.MUL) : roughness; // slots
    // * metalness
    // * metalnessMap

    var metalness = builder.findNode(props.metalness, inputs.metalness),
        metalnessMap = builder.resolve(props.metalnessMap);
    this.metalness = metalnessMap ? new _OperatorNode.OperatorNode(metalness, new _SwitchNode.SwitchNode(metalnessMap, "b"), _OperatorNode.OperatorNode.MUL) : metalness; // slots
    // * normalMap
    // * normalScale

    if (props.normalMap) {
      this.normal = new _NormalMapNode.NormalMapNode(builder.resolve(props.normalMap));
      this.normal.scale = builder.findNode(props.normalScale, inputs.normalScale);
    } else {
      this.normal = undefined;
    } // slots
    // * envMap


    this.environment = builder.resolve(props.envMap);
  } // build code


  return _StandardNode.StandardNode.prototype.build.call(this, builder);
};

MeshStandardNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    console.warn(".toJSON not implemented in", this);
  }

  return data;
};