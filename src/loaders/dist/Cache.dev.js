"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cache = void 0;

/**
 * @author mrdoob / http://mrdoob.com/
 */
var Cache = {
  enabled: false,
  files: {},
  add: function add(key, file) {
    if (this.enabled === false) return; // console.log( 'THREE.Cache', 'Adding key:', key );

    this.files[key] = file;
  },
  get: function get(key) {
    if (this.enabled === false) return; // console.log( 'THREE.Cache', 'Checking key:', key );

    return this.files[key];
  },
  remove: function remove(key) {
    delete this.files[key];
  },
  clear: function clear() {
    this.files = {};
  }
};
exports.Cache = Cache;