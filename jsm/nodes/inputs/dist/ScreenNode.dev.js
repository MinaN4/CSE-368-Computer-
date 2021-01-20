"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenNode = ScreenNode;

var _InputNode = require("../core/InputNode.js");

var _TextureNode = require("./TextureNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function ScreenNode(uv) {
  _TextureNode.TextureNode.call(this, undefined, uv);
}

ScreenNode.prototype = Object.create(_TextureNode.TextureNode.prototype);
ScreenNode.prototype.constructor = ScreenNode;
ScreenNode.prototype.nodeType = "Screen";

ScreenNode.prototype.getUnique = function () {
  return true;
};

ScreenNode.prototype.getTexture = function (builder, output) {
  return _InputNode.InputNode.prototype.generate.call(this, builder, output, this.getUuid(), 't', 'renderTexture');
};