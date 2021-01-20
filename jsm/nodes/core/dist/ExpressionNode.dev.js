"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionNode = ExpressionNode;

var _FunctionNode = require("./FunctionNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function ExpressionNode(src, type, keywords, extensions, includes) {
  _FunctionNode.FunctionNode.call(this, src, includes, extensions, keywords, type);
}

ExpressionNode.prototype = Object.create(_FunctionNode.FunctionNode.prototype);
ExpressionNode.prototype.constructor = ExpressionNode;
ExpressionNode.prototype.nodeType = "Expression";