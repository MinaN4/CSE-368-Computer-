"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneUtils = void 0;

var _threeModule = require("../../../build/three.module.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
var SceneUtils = {
  createMultiMaterialObject: function createMultiMaterialObject(geometry, materials) {
    var group = new _threeModule.Group();

    for (var i = 0, l = materials.length; i < l; i++) {
      group.add(new _threeModule.Mesh(geometry, materials[i]));
    }

    return group;
  },
  detach: function detach(child, parent, scene) {
    console.warn('THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead.');
    scene.attach(child);
  },
  attach: function attach(child, scene, parent) {
    console.warn('THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead.');
    parent.attach(child);
  }
};
exports.SceneUtils = SceneUtils;