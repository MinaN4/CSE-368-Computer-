"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoaderUtils = void 0;

/**
 * @author Don McCurdy / https://www.donmccurdy.com
 */
var LoaderUtils = {
  decodeText: function decodeText(array) {
    if (typeof TextDecoder !== 'undefined') {
      return new TextDecoder().decode(array);
    } // Avoid the String.fromCharCode.apply(null, array) shortcut, which
    // throws a "maximum call stack size exceeded" error for large arrays.


    var s = '';

    for (var i = 0, il = array.length; i < il; i++) {
      // Implicitly assumes little-endian.
      s += String.fromCharCode(array[i]);
    }

    try {
      // merges multi-byte utf-8 characters.
      return decodeURIComponent(escape(s));
    } catch (e) {
      // see #16358
      return s;
    }
  },
  extractUrlBase: function extractUrlBase(url) {
    var index = url.lastIndexOf('/');
    if (index === -1) return './';
    return url.substr(0, index + 1);
  }
};
exports.LoaderUtils = LoaderUtils;