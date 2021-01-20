"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VRMLoader = void 0;

var _threeModule = require("../../../build/three.module.js");

var _GLTFLoader = require("../loaders/GLTFLoader.js");

/**
 * @author Takahiro / https://github.com/takahirox
 */
// VRM Specification: https://dwango.github.io/vrm/vrm_spec/
//
// VRM is based on glTF 2.0 and VRM extension is defined
// in top-level json.extensions.VRM
var VRMLoader = function () {
  function VRMLoader(manager) {
    if (_GLTFLoader.GLTFLoader === undefined) {
      throw new Error('THREE.VRMLoader: Import GLTFLoader.');
    }

    _threeModule.Loader.call(this, manager);

    this.gltfLoader = new _GLTFLoader.GLTFLoader(this.manager);
  }

  VRMLoader.prototype = Object.assign(Object.create(_threeModule.Loader.prototype), {
    constructor: VRMLoader,
    load: function load(url, onLoad, onProgress, onError) {
      var scope = this;
      this.gltfLoader.load(url, function (gltf) {
        scope.parse(gltf, onLoad);
      }, onProgress, onError);
    },
    setDRACOLoader: function setDRACOLoader(dracoLoader) {
      this.glTFLoader.setDRACOLoader(dracoLoader);
      return this;
    },
    parse: function parse(gltf, onLoad) {
      // var gltfParser = gltf.parser;
      // var gltfExtensions = gltf.userData.gltfExtensions || {};
      // var vrmExtension = gltfExtensions.VRM || {};
      // handle VRM Extension here
      onLoad(gltf);
    }
  });
  return VRMLoader;
}();

exports.VRMLoader = VRMLoader;