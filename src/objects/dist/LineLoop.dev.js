"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineLoop = LineLoop;

var _Line = require("./Line.js");

/**
 * @author mgreter / http://github.com/mgreter
 */
function LineLoop(geometry, material) {
  _Line.Line.call(this, geometry, material);

  this.type = 'LineLoop';
}

LineLoop.prototype = Object.assign(Object.create(_Line.Line.prototype), {
  constructor: LineLoop,
  isLineLoop: true
});