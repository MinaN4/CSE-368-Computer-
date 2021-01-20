"use strict";

/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.SceneUtils = {
  createMultiMaterialObject: function createMultiMaterialObject(geometry, materials) {
    var group = new THREE.Group();

    for (var i = 0, l = materials.length; i < l; i++) {
      group.add(new THREE.Mesh(geometry, materials[i]));
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