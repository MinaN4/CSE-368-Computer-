"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioContext = void 0;

/**
 * @author mrdoob / http://mrdoob.com/
 */
var _context;

var AudioContext = {
  getContext: function getContext() {
    if (_context === undefined) {
      _context = new (window.AudioContext || window.webkitAudioContext)();
    }

    return _context;
  },
  setContext: function setContext(value) {
    _context = value;
  }
};
exports.AudioContext = AudioContext;