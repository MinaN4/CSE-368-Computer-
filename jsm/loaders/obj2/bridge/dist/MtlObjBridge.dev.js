"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MtlObjBridge = void 0;

var _MTLLoader = require("../../../../jsm/loaders/MTLLoader.js");

/**
 * @author Kai Salmen / https://kaisalmen.de
 * Development repository: https://github.com/kaisalmen/WWOBJLoader
 */
var MtlObjBridge = {
  /**
   *
   * @param processResult
   * @param assetLoader
   */
  link: function link(processResult, assetLoader) {
    if (typeof assetLoader.addMaterials === 'function') {
      assetLoader.addMaterials(this.addMaterialsFromMtlLoader(processResult), true);
    }
  },

  /**
   * Returns the array instance of {@link MTLLoader.MaterialCreator}.
   *
   * @param Instance of {@link MTLLoader.MaterialCreator}
   */
  addMaterialsFromMtlLoader: function addMaterialsFromMtlLoader(materialCreator) {
    var newMaterials = {};

    if (materialCreator instanceof _MTLLoader.MTLLoader.MaterialCreator) {
      materialCreator.preload();
      newMaterials = materialCreator.materials;
    }

    return newMaterials;
  }
};
exports.MtlObjBridge = MtlObjBridge;