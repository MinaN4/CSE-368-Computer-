"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = Loader;

var _LoadingManager = require("./LoadingManager.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
function Loader(manager) {
  this.manager = manager !== undefined ? manager : _LoadingManager.DefaultLoadingManager;
  this.crossOrigin = 'anonymous';
  this.path = '';
  this.resourcePath = '';
}

Object.assign(Loader.prototype, {
  load: function load()
  /* url, onLoad, onProgress, onError */
  {},
  parse: function parse()
  /* data */
  {},
  setCrossOrigin: function setCrossOrigin(crossOrigin) {
    this.crossOrigin = crossOrigin;
    return this;
  },
  setPath: function setPath(path) {
    this.path = path;
    return this;
  },
  setResourcePath: function setResourcePath(resourcePath) {
    this.resourcePath = resourcePath;
    return this;
  }
});