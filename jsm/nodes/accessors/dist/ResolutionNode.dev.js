"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResolutionNode = ResolutionNode;

var _threeModule = require("../../../../build/three.module.js");

var _Vector2Node = require("../inputs/Vector2Node.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function ResolutionNode() {
  _Vector2Node.Vector2Node.call(this);

  this.size = new _threeModule.Vector2();
}

ResolutionNode.prototype = Object.create(_Vector2Node.Vector2Node.prototype);
ResolutionNode.prototype.constructor = ResolutionNode;
ResolutionNode.prototype.nodeType = "Resolution";

ResolutionNode.prototype.updateFrame = function (frame) {
  if (frame.renderer) {
    frame.renderer.getSize(this.size);
    var pixelRatio = frame.renderer.getPixelRatio();
    this.x = this.size.width * pixelRatio;
    this.y = this.size.height * pixelRatio;
  } else {
    console.warn("ResolutionNode need a renderer in NodeFrame");
  }
};

ResolutionNode.prototype.copy = function (source) {
  _Vector2Node.Vector2Node.prototype.copy.call(this, source);

  this.renderer = source.renderer;
  return this;
};

ResolutionNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.renderer = this.renderer.uuid;
  }

  return data;
};