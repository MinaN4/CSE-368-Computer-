"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OBJLoader2Parser = void 0;

/**
 * @author Kai Salmen / https://kaisalmen.de
 * Development repository: https://github.com/kaisalmen/WWOBJLoader
 */

/**
 * Parse OBJ data either from ArrayBuffer or string
 */
var OBJLoader2Parser = function OBJLoader2Parser() {
  this.logging = {
    enabled: false,
    debug: false
  };
  var scope = this;
  this.callbacks = {
    onProgress: function onProgress(text) {
      scope._onProgress(text);
    },
    onAssetAvailable: function onAssetAvailable(payload) {
      scope._onAssetAvailable(payload);
    },
    onError: function onError(errorMessage) {
      scope._onError(errorMessage);
    },
    onLoad: function onLoad(object3d, message) {
      scope._onLoad(object3d, message);
    }
  };
  this.contentRef = null;
  this.legacyMode = false;
  this.materials = {};
  this.materialPerSmoothingGroup = false;
  this.useOAsMesh = false;
  this.useIndices = false;
  this.disregardNormals = false;
  this.vertices = [];
  this.colors = [];
  this.normals = [];
  this.uvs = [];
  this.rawMesh = {
    objectName: '',
    groupName: '',
    activeMtlName: '',
    mtllibName: '',
    // reset with new mesh
    faceType: -1,
    subGroups: [],
    subGroupInUse: null,
    smoothingGroup: {
      splitMaterials: false,
      normalized: -1,
      real: -1
    },
    counts: {
      doubleIndicesCount: 0,
      faceCount: 0,
      mtlCount: 0,
      smoothingGroupCount: 0
    }
  };
  this.inputObjectCount = 1;
  this.outputObjectCount = 1;
  this.globalCounts = {
    vertices: 0,
    faces: 0,
    doubleIndicesCount: 0,
    lineByte: 0,
    currentByte: 0,
    totalBytes: 0
  };
};

exports.OBJLoader2Parser = OBJLoader2Parser;
OBJLoader2Parser.prototype = {
  constructor: OBJLoader2Parser,
  _resetRawMesh: function _resetRawMesh() {
    // faces are stored according combined index of group, material and smoothingGroup (0 or not)
    this.rawMesh.subGroups = [];
    this.rawMesh.subGroupInUse = null;
    this.rawMesh.smoothingGroup.normalized = -1;
    this.rawMesh.smoothingGroup.real = -1; // this default index is required as it is possible to define faces without 'g' or 'usemtl'

    this._pushSmoothingGroup(1);

    this.rawMesh.counts.doubleIndicesCount = 0;
    this.rawMesh.counts.faceCount = 0;
    this.rawMesh.counts.mtlCount = 0;
    this.rawMesh.counts.smoothingGroupCount = 0;
  },

  /**
   * Tells whether a material shall be created per smoothing group.
   *
   * @param {boolean} materialPerSmoothingGroup=false
   * @return {OBJLoader2Parser}
   */
  setMaterialPerSmoothingGroup: function setMaterialPerSmoothingGroup(materialPerSmoothingGroup) {
    this.materialPerSmoothingGroup = materialPerSmoothingGroup === true;
    return this;
  },

  /**
   * Usually 'o' is meta-information and does not result in creation of new meshes, but mesh creation on occurrence of "o" can be enforced.
   *
   * @param {boolean} useOAsMesh=false
   * @return {OBJLoader2Parser}
   */
  setUseOAsMesh: function setUseOAsMesh(useOAsMesh) {
    this.useOAsMesh = useOAsMesh === true;
    return this;
  },

  /**
   * Instructs loaders to create indexed {@link BufferGeometry}.
   *
   * @param {boolean} useIndices=false
   * @return {OBJLoader2Parser}
   */
  setUseIndices: function setUseIndices(useIndices) {
    this.useIndices = useIndices === true;
    return this;
  },

  /**
   * Tells whether normals should be completely disregarded and regenerated.
   *
   * @param {boolean} disregardNormals=false
   * @return {OBJLoader2Parser}
   */
  setDisregardNormals: function setDisregardNormals(disregardNormals) {
    this.disregardNormals = disregardNormals === true;
    return this;
  },

  /**
   * Clears materials object and sets the new ones.
   *
   * @param {Object} materials Object with named materials
   */
  setMaterials: function setMaterials(materials) {
    this.materials = Object.assign({}, materials);
  },

  /**
   * Register a function that is called once an asset (mesh/material) becomes available.
   *
   * @param onAssetAvailable
   * @return {OBJLoader2Parser}
   */
  setCallbackOnAssetAvailable: function setCallbackOnAssetAvailable(onAssetAvailable) {
    if (onAssetAvailable !== null && onAssetAvailable !== undefined && onAssetAvailable instanceof Function) {
      this.callbacks.onAssetAvailable = onAssetAvailable;
    }

    return this;
  },

  /**
   * Register a function that is used to report overall processing progress.
   *
   * @param {Function} onProgress
   * @return {OBJLoader2Parser}
   */
  setCallbackOnProgress: function setCallbackOnProgress(onProgress) {
    if (onProgress !== null && onProgress !== undefined && onProgress instanceof Function) {
      this.callbacks.onProgress = onProgress;
    }

    return this;
  },

  /**
   * Register an error handler function that is called if errors occur. It can decide to just log or to throw an exception.
   *
   * @param {Function} onError
   * @return {OBJLoader2Parser}
   */
  setCallbackOnError: function setCallbackOnError(onError) {
    if (onError !== null && onError !== undefined && onError instanceof Function) {
      this.callbacks.onError = onError;
    }

    return this;
  },

  /**
   * Register a function that is called when parsing was completed.
   *
   * @param {Function} onLoad
   * @return {OBJLoader2Parser}
   */
  setCallbackOnLoad: function setCallbackOnLoad(onLoad) {
    if (onLoad !== null && onLoad !== undefined && onLoad instanceof Function) {
      this.callbacks.onLoad = onLoad;
    }

    return this;
  },

  /**
   * Announce parse progress feedback which is logged to the console.
   * @private
   *
   * @param {string} text Textual description of the event
   */
  _onProgress: function _onProgress(text) {
    var message = text ? text : '';

    if (this.logging.enabled && this.logging.debug) {
      console.log(message);
    }
  },

  /**
   * Announce error feedback which is logged as error message.
   * @private
   *
   * @param {String} errorMessage The event containing the error
   */
  _onError: function _onError(errorMessage) {
    if (this.logging.enabled && this.logging.debug) {
      console.error(errorMessage);
    }
  },
  _onAssetAvailable: function _onAssetAvailable(payload) {
    var errorMessage = 'OBJLoader2Parser does not provide implementation for onAssetAvailable. Aborting...';
    this.callbacks.onError(errorMessage);
    throw errorMessage;
  },
  _onLoad: function _onLoad(object3d, message) {
    console.log("You reached parser default onLoad callback: " + message);
  },

  /**
   * Enable or disable logging in general (except warn and error), plus enable or disable debug logging.
   *
   * @param {boolean} enabled True or false.
   * @param {boolean} debug True or false.
   *
   * @return {OBJLoader2Parser}
   */
  setLogging: function setLogging(enabled, debug) {
    this.logging.enabled = enabled === true;
    this.logging.debug = debug === true;
    return this;
  },
  _configure: function _configure() {
    this._pushSmoothingGroup(1);

    if (this.logging.enabled) {
      var matKeys = Object.keys(this.materials);
      var matNames = matKeys.length > 0 ? '\n\tmaterialNames:\n\t\t- ' + matKeys.join('\n\t\t- ') : '\n\tmaterialNames: None';
      var printedConfig = 'OBJLoader.Parser configuration:' + matNames + '\n\tmaterialPerSmoothingGroup: ' + this.materialPerSmoothingGroup + '\n\tuseOAsMesh: ' + this.useOAsMesh + '\n\tuseIndices: ' + this.useIndices + '\n\tdisregardNormals: ' + this.disregardNormals;
      printedConfig += '\n\tcallbacks.onProgress: ' + this.callbacks.onProgress.name;
      printedConfig += '\n\tcallbacks.onAssetAvailable: ' + this.callbacks.onAssetAvailable.name;
      printedConfig += '\n\tcallbacks.onError: ' + this.callbacks.onError.name;
      console.info(printedConfig);
    }
  },

  /**
   * Parse the provided arraybuffer
   *
   * @param {Uint8Array} arrayBuffer OBJ data as Uint8Array
   */
  execute: function execute(arrayBuffer) {
    if (this.logging.enabled) console.time('OBJLoader2Parser.execute');

    this._configure();

    var arrayBufferView = new Uint8Array(arrayBuffer);
    this.contentRef = arrayBufferView;
    var length = arrayBufferView.byteLength;
    this.globalCounts.totalBytes = length;
    var buffer = new Array(128);

    for (var code, word = '', bufferPointer = 0, slashesCount = 0, i = 0; i < length; i++) {
      code = arrayBufferView[i];

      switch (code) {
        // space
        case 32:
          if (word.length > 0) buffer[bufferPointer++] = word;
          word = '';
          break;
        // slash

        case 47:
          if (word.length > 0) buffer[bufferPointer++] = word;
          slashesCount++;
          word = '';
          break;
        // LF

        case 10:
          if (word.length > 0) buffer[bufferPointer++] = word;
          word = '';
          this.globalCounts.lineByte = this.globalCounts.currentByte;
          this.globalCounts.currentByte = i;

          this._processLine(buffer, bufferPointer, slashesCount);

          bufferPointer = 0;
          slashesCount = 0;
          break;
        // CR

        case 13:
          break;

        default:
          word += String.fromCharCode(code);
          break;
      }
    }

    this._finalizeParsing();

    if (this.logging.enabled) console.timeEnd('OBJLoader2Parser.execute');
  },

  /**
   * Parse the provided text
   *
   * @param {string} text OBJ data as string
   */
  executeLegacy: function executeLegacy(text) {
    if (this.logging.enabled) console.time('OBJLoader2Parser.executeLegacy');

    this._configure();

    this.legacyMode = true;
    this.contentRef = text;
    var length = text.length;
    this.globalCounts.totalBytes = length;
    var buffer = new Array(128);

    for (var _char, word = '', bufferPointer = 0, slashesCount = 0, i = 0; i < length; i++) {
      _char = text[i];

      switch (_char) {
        case ' ':
          if (word.length > 0) buffer[bufferPointer++] = word;
          word = '';
          break;

        case '/':
          if (word.length > 0) buffer[bufferPointer++] = word;
          slashesCount++;
          word = '';
          break;

        case '\n':
          if (word.length > 0) buffer[bufferPointer++] = word;
          word = '';
          this.globalCounts.lineByte = this.globalCounts.currentByte;
          this.globalCounts.currentByte = i;

          this._processLine(buffer, bufferPointer, slashesCount);

          bufferPointer = 0;
          slashesCount = 0;
          break;

        case '\r':
          break;

        default:
          word += _char;
      }
    }

    this._finalizeParsing();

    if (this.logging.enabled) console.timeEnd('OBJLoader2Parser.executeLegacy');
  },
  _processLine: function _processLine(buffer, bufferPointer, slashesCount) {
    if (bufferPointer < 1) return;

    var reconstructString = function reconstructString(content, legacyMode, start, stop) {
      var line = '';

      if (stop > start) {
        var _i;

        if (legacyMode) {
          for (_i = start; _i < stop; _i++) {
            line += content[_i];
          }
        } else {
          for (_i = start; _i < stop; _i++) {
            line += String.fromCharCode(content[_i]);
          }
        }

        line = line.trim();
      }

      return line;
    };

    var bufferLength, length, i, lineDesignation;
    lineDesignation = buffer[0];

    switch (lineDesignation) {
      case 'v':
        this.vertices.push(parseFloat(buffer[1]));
        this.vertices.push(parseFloat(buffer[2]));
        this.vertices.push(parseFloat(buffer[3]));

        if (bufferPointer > 4) {
          this.colors.push(parseFloat(buffer[4]));
          this.colors.push(parseFloat(buffer[5]));
          this.colors.push(parseFloat(buffer[6]));
        }

        break;

      case 'vt':
        this.uvs.push(parseFloat(buffer[1]));
        this.uvs.push(parseFloat(buffer[2]));
        break;

      case 'vn':
        this.normals.push(parseFloat(buffer[1]));
        this.normals.push(parseFloat(buffer[2]));
        this.normals.push(parseFloat(buffer[3]));
        break;

      case 'f':
        bufferLength = bufferPointer - 1; // "f vertex ..."

        if (slashesCount === 0) {
          this._checkFaceType(0);

          for (i = 2, length = bufferLength; i < length; i++) {
            this._buildFace(buffer[1]);

            this._buildFace(buffer[i]);

            this._buildFace(buffer[i + 1]);
          } // "f vertex/uv ..."

        } else if (bufferLength === slashesCount * 2) {
          this._checkFaceType(1);

          for (i = 3, length = bufferLength - 2; i < length; i += 2) {
            this._buildFace(buffer[1], buffer[2]);

            this._buildFace(buffer[i], buffer[i + 1]);

            this._buildFace(buffer[i + 2], buffer[i + 3]);
          } // "f vertex/uv/normal ..."

        } else if (bufferLength * 2 === slashesCount * 3) {
          this._checkFaceType(2);

          for (i = 4, length = bufferLength - 3; i < length; i += 3) {
            this._buildFace(buffer[1], buffer[2], buffer[3]);

            this._buildFace(buffer[i], buffer[i + 1], buffer[i + 2]);

            this._buildFace(buffer[i + 3], buffer[i + 4], buffer[i + 5]);
          } // "f vertex//normal ..."

        } else {
          this._checkFaceType(3);

          for (i = 3, length = bufferLength - 2; i < length; i += 2) {
            this._buildFace(buffer[1], undefined, buffer[2]);

            this._buildFace(buffer[i], undefined, buffer[i + 1]);

            this._buildFace(buffer[i + 2], undefined, buffer[i + 3]);
          }
        }

        break;

      case 'l':
      case 'p':
        bufferLength = bufferPointer - 1;

        if (bufferLength === slashesCount * 2) {
          this._checkFaceType(4);

          for (i = 1, length = bufferLength + 1; i < length; i += 2) {
            this._buildFace(buffer[i], buffer[i + 1]);
          }
        } else {
          this._checkFaceType(lineDesignation === 'l' ? 5 : 6);

          for (i = 1, length = bufferLength + 1; i < length; i++) {
            this._buildFace(buffer[i]);
          }
        }

        break;

      case 's':
        this._pushSmoothingGroup(buffer[1]);

        break;

      case 'g':
        // 'g' leads to creation of mesh if valid data (faces declaration was done before), otherwise only groupName gets set
        this._processCompletedMesh();

        this.rawMesh.groupName = reconstructString(this.contentRef, this.legacyMode, this.globalCounts.lineByte + 2, this.globalCounts.currentByte);
        break;

      case 'o':
        // 'o' is meta-information and usually does not result in creation of new meshes, but can be enforced with "useOAsMesh"
        if (this.useOAsMesh) this._processCompletedMesh();
        this.rawMesh.objectName = reconstructString(this.contentRef, this.legacyMode, this.globalCounts.lineByte + 2, this.globalCounts.currentByte);
        break;

      case 'mtllib':
        this.rawMesh.mtllibName = reconstructString(this.contentRef, this.legacyMode, this.globalCounts.lineByte + 7, this.globalCounts.currentByte);
        break;

      case 'usemtl':
        var mtlName = reconstructString(this.contentRef, this.legacyMode, this.globalCounts.lineByte + 7, this.globalCounts.currentByte);

        if (mtlName !== '' && this.rawMesh.activeMtlName !== mtlName) {
          this.rawMesh.activeMtlName = mtlName;
          this.rawMesh.counts.mtlCount++;

          this._checkSubGroup();
        }

        break;

      default:
        break;
    }
  },
  _pushSmoothingGroup: function _pushSmoothingGroup(smoothingGroup) {
    var smoothingGroupInt = parseInt(smoothingGroup);

    if (isNaN(smoothingGroupInt)) {
      smoothingGroupInt = smoothingGroup === "off" ? 0 : 1;
    }

    var smoothCheck = this.rawMesh.smoothingGroup.normalized;
    this.rawMesh.smoothingGroup.normalized = this.rawMesh.smoothingGroup.splitMaterials ? smoothingGroupInt : smoothingGroupInt === 0 ? 0 : 1;
    this.rawMesh.smoothingGroup.real = smoothingGroupInt;

    if (smoothCheck !== smoothingGroupInt) {
      this.rawMesh.counts.smoothingGroupCount++;

      this._checkSubGroup();
    }
  },

  /**
   * Expanded faceTypes include all four face types, both line types and the point type
   * faceType = 0: "f vertex ..."
   * faceType = 1: "f vertex/uv ..."
   * faceType = 2: "f vertex/uv/normal ..."
   * faceType = 3: "f vertex//normal ..."
   * faceType = 4: "l vertex/uv ..." or "l vertex ..."
   * faceType = 5: "l vertex ..."
   * faceType = 6: "p vertex ..."
   */
  _checkFaceType: function _checkFaceType(faceType) {
    if (this.rawMesh.faceType !== faceType) {
      this._processCompletedMesh();

      this.rawMesh.faceType = faceType;

      this._checkSubGroup();
    }
  },
  _checkSubGroup: function _checkSubGroup() {
    var index = this.rawMesh.activeMtlName + '|' + this.rawMesh.smoothingGroup.normalized;
    this.rawMesh.subGroupInUse = this.rawMesh.subGroups[index];

    if (this.rawMesh.subGroupInUse === undefined || this.rawMesh.subGroupInUse === null) {
      this.rawMesh.subGroupInUse = {
        index: index,
        objectName: this.rawMesh.objectName,
        groupName: this.rawMesh.groupName,
        materialName: this.rawMesh.activeMtlName,
        smoothingGroup: this.rawMesh.smoothingGroup.normalized,
        vertices: [],
        indexMappingsCount: 0,
        indexMappings: [],
        indices: [],
        colors: [],
        uvs: [],
        normals: []
      };
      this.rawMesh.subGroups[index] = this.rawMesh.subGroupInUse;
    }
  },
  _buildFace: function _buildFace(faceIndexV, faceIndexU, faceIndexN) {
    var subGroupInUse = this.rawMesh.subGroupInUse;
    var scope = this;

    var updateSubGroupInUse = function updateSubGroupInUse() {
      var faceIndexVi = parseInt(faceIndexV);
      var indexPointerV = 3 * (faceIndexVi > 0 ? faceIndexVi - 1 : faceIndexVi + scope.vertices.length / 3);
      var indexPointerC = scope.colors.length > 0 ? indexPointerV : null;
      var vertices = subGroupInUse.vertices;
      vertices.push(scope.vertices[indexPointerV++]);
      vertices.push(scope.vertices[indexPointerV++]);
      vertices.push(scope.vertices[indexPointerV]);

      if (indexPointerC !== null) {
        var colors = subGroupInUse.colors;
        colors.push(scope.colors[indexPointerC++]);
        colors.push(scope.colors[indexPointerC++]);
        colors.push(scope.colors[indexPointerC]);
      }

      if (faceIndexU) {
        var faceIndexUi = parseInt(faceIndexU);
        var indexPointerU = 2 * (faceIndexUi > 0 ? faceIndexUi - 1 : faceIndexUi + scope.uvs.length / 2);
        var uvs = subGroupInUse.uvs;
        uvs.push(scope.uvs[indexPointerU++]);
        uvs.push(scope.uvs[indexPointerU]);
      }

      if (faceIndexN && !scope.disregardNormals) {
        var faceIndexNi = parseInt(faceIndexN);
        var indexPointerN = 3 * (faceIndexNi > 0 ? faceIndexNi - 1 : faceIndexNi + scope.normals.length / 3);
        var normals = subGroupInUse.normals;
        normals.push(scope.normals[indexPointerN++]);
        normals.push(scope.normals[indexPointerN++]);
        normals.push(scope.normals[indexPointerN]);
      }
    };

    if (this.useIndices) {
      if (this.disregardNormals) faceIndexN = undefined;
      var mappingName = faceIndexV + (faceIndexU ? '_' + faceIndexU : '_n') + (faceIndexN ? '_' + faceIndexN : '_n');
      var indicesPointer = subGroupInUse.indexMappings[mappingName];

      if (indicesPointer === undefined || indicesPointer === null) {
        indicesPointer = this.rawMesh.subGroupInUse.vertices.length / 3;
        updateSubGroupInUse();
        subGroupInUse.indexMappings[mappingName] = indicesPointer;
        subGroupInUse.indexMappingsCount++;
      } else {
        this.rawMesh.counts.doubleIndicesCount++;
      }

      subGroupInUse.indices.push(indicesPointer);
    } else {
      updateSubGroupInUse();
    }

    this.rawMesh.counts.faceCount++;
  },
  _createRawMeshReport: function _createRawMeshReport(inputObjectCount) {
    return 'Input Object number: ' + inputObjectCount + '\n\tObject name: ' + this.rawMesh.objectName + '\n\tGroup name: ' + this.rawMesh.groupName + '\n\tMtllib name: ' + this.rawMesh.mtllibName + '\n\tVertex count: ' + this.vertices.length / 3 + '\n\tNormal count: ' + this.normals.length / 3 + '\n\tUV count: ' + this.uvs.length / 2 + '\n\tSmoothingGroup count: ' + this.rawMesh.counts.smoothingGroupCount + '\n\tMaterial count: ' + this.rawMesh.counts.mtlCount + '\n\tReal MeshOutputGroup count: ' + this.rawMesh.subGroups.length;
  },

  /**
   * Clear any empty subGroup and calculate absolute vertex, normal and uv counts
   */
  _finalizeRawMesh: function _finalizeRawMesh() {
    var meshOutputGroupTemp = [];
    var meshOutputGroup;
    var absoluteVertexCount = 0;
    var absoluteIndexMappingsCount = 0;
    var absoluteIndexCount = 0;
    var absoluteColorCount = 0;
    var absoluteNormalCount = 0;
    var absoluteUvCount = 0;
    var indices;

    for (var name in this.rawMesh.subGroups) {
      meshOutputGroup = this.rawMesh.subGroups[name];

      if (meshOutputGroup.vertices.length > 0) {
        indices = meshOutputGroup.indices;

        if (indices.length > 0 && absoluteIndexMappingsCount > 0) {
          for (var i = 0; i < indices.length; i++) {
            indices[i] = indices[i] + absoluteIndexMappingsCount;
          }
        }

        meshOutputGroupTemp.push(meshOutputGroup);
        absoluteVertexCount += meshOutputGroup.vertices.length;
        absoluteIndexMappingsCount += meshOutputGroup.indexMappingsCount;
        absoluteIndexCount += meshOutputGroup.indices.length;
        absoluteColorCount += meshOutputGroup.colors.length;
        absoluteUvCount += meshOutputGroup.uvs.length;
        absoluteNormalCount += meshOutputGroup.normals.length;
      }
    } // do not continue if no result


    var result = null;

    if (meshOutputGroupTemp.length > 0) {
      result = {
        name: this.rawMesh.groupName !== '' ? this.rawMesh.groupName : this.rawMesh.objectName,
        subGroups: meshOutputGroupTemp,
        absoluteVertexCount: absoluteVertexCount,
        absoluteIndexCount: absoluteIndexCount,
        absoluteColorCount: absoluteColorCount,
        absoluteNormalCount: absoluteNormalCount,
        absoluteUvCount: absoluteUvCount,
        faceCount: this.rawMesh.counts.faceCount,
        doubleIndicesCount: this.rawMesh.counts.doubleIndicesCount
      };
    }

    return result;
  },
  _processCompletedMesh: function _processCompletedMesh() {
    var result = this._finalizeRawMesh();

    var haveMesh = result !== null;

    if (haveMesh) {
      if (this.colors.length > 0 && this.colors.length !== this.vertices.length) {
        this.callbacks.onError('Vertex Colors were detected, but vertex count and color count do not match!');
      }

      if (this.logging.enabled && this.logging.debug) console.debug(this._createRawMeshReport(this.inputObjectCount));
      this.inputObjectCount++;

      this._buildMesh(result);

      var progressBytesPercent = this.globalCounts.currentByte / this.globalCounts.totalBytes;

      this._onProgress('Completed [o: ' + this.rawMesh.objectName + ' g:' + this.rawMesh.groupName + '' + '] Total progress: ' + (progressBytesPercent * 100).toFixed(2) + '%');

      this._resetRawMesh();
    }

    return haveMesh;
  },

  /**
   * SubGroups are transformed to too intermediate format that is forwarded to the MeshReceiver.
   * It is ensured that SubGroups only contain objects with vertices (no need to check).
   *
   * @param result
   */
  _buildMesh: function _buildMesh(result) {
    var meshOutputGroups = result.subGroups;
    var vertexFA = new Float32Array(result.absoluteVertexCount);
    this.globalCounts.vertices += result.absoluteVertexCount / 3;
    this.globalCounts.faces += result.faceCount;
    this.globalCounts.doubleIndicesCount += result.doubleIndicesCount;
    var indexUA = result.absoluteIndexCount > 0 ? new Uint32Array(result.absoluteIndexCount) : null;
    var colorFA = result.absoluteColorCount > 0 ? new Float32Array(result.absoluteColorCount) : null;
    var normalFA = result.absoluteNormalCount > 0 ? new Float32Array(result.absoluteNormalCount) : null;
    var uvFA = result.absoluteUvCount > 0 ? new Float32Array(result.absoluteUvCount) : null;
    var haveVertexColors = colorFA !== null;
    var meshOutputGroup;
    var materialNames = [];
    var createMultiMaterial = meshOutputGroups.length > 1;
    var materialIndex = 0;
    var materialIndexMapping = [];
    var selectedMaterialIndex;
    var materialGroup;
    var materialGroups = [];
    var vertexFAOffset = 0;
    var indexUAOffset = 0;
    var colorFAOffset = 0;
    var normalFAOffset = 0;
    var uvFAOffset = 0;
    var materialGroupOffset = 0;
    var materialGroupLength = 0;
    var materialOrg, material, materialName, materialNameOrg; // only one specific face type

    for (var oodIndex in meshOutputGroups) {
      if (!meshOutputGroups.hasOwnProperty(oodIndex)) continue;
      meshOutputGroup = meshOutputGroups[oodIndex];
      materialNameOrg = meshOutputGroup.materialName;

      if (this.rawMesh.faceType < 4) {
        materialName = materialNameOrg + (haveVertexColors ? '_vertexColor' : '') + (meshOutputGroup.smoothingGroup === 0 ? '_flat' : '');
      } else {
        materialName = this.rawMesh.faceType === 6 ? 'defaultPointMaterial' : 'defaultLineMaterial';
      }

      materialOrg = this.materials[materialNameOrg];
      material = this.materials[materialName]; // both original and derived names do not lead to an existing material => need to use a default material

      if ((materialOrg === undefined || materialOrg === null) && (material === undefined || material === null)) {
        materialName = haveVertexColors ? 'defaultVertexColorMaterial' : 'defaultMaterial';
        material = this.materials[materialName];

        if (this.logging.enabled) {
          console.info('object_group "' + meshOutputGroup.objectName + '_' + meshOutputGroup.groupName + '" was defined with unresolvable material "' + materialNameOrg + '"! Assigning "' + materialName + '".');
        }
      }

      if (material === undefined || material === null) {
        var materialCloneInstructions = {
          materialNameOrg: materialNameOrg,
          materialName: materialName,
          materialProperties: {
            vertexColors: haveVertexColors ? 2 : 0,
            flatShading: meshOutputGroup.smoothingGroup === 0
          }
        };
        var payload = {
          cmd: 'assetAvailable',
          type: 'material',
          materials: {
            materialCloneInstructions: materialCloneInstructions
          }
        };
        this.callbacks.onAssetAvailable(payload); // only set materials if they don't exist, yet

        var matCheck = this.materials[materialName];

        if (matCheck === undefined || matCheck === null) {
          this.materials[materialName] = materialCloneInstructions;
        }
      }

      if (createMultiMaterial) {
        // re-use material if already used before. Reduces materials array size and eliminates duplicates
        selectedMaterialIndex = materialIndexMapping[materialName];

        if (!selectedMaterialIndex) {
          selectedMaterialIndex = materialIndex;
          materialIndexMapping[materialName] = materialIndex;
          materialNames.push(materialName);
          materialIndex++;
        }

        materialGroupLength = this.useIndices ? meshOutputGroup.indices.length : meshOutputGroup.vertices.length / 3;
        materialGroup = {
          start: materialGroupOffset,
          count: materialGroupLength,
          index: selectedMaterialIndex
        };
        materialGroups.push(materialGroup);
        materialGroupOffset += materialGroupLength;
      } else {
        materialNames.push(materialName);
      }

      vertexFA.set(meshOutputGroup.vertices, vertexFAOffset);
      vertexFAOffset += meshOutputGroup.vertices.length;

      if (indexUA) {
        indexUA.set(meshOutputGroup.indices, indexUAOffset);
        indexUAOffset += meshOutputGroup.indices.length;
      }

      if (colorFA) {
        colorFA.set(meshOutputGroup.colors, colorFAOffset);
        colorFAOffset += meshOutputGroup.colors.length;
      }

      if (normalFA) {
        normalFA.set(meshOutputGroup.normals, normalFAOffset);
        normalFAOffset += meshOutputGroup.normals.length;
      }

      if (uvFA) {
        uvFA.set(meshOutputGroup.uvs, uvFAOffset);
        uvFAOffset += meshOutputGroup.uvs.length;
      }

      if (this.logging.enabled && this.logging.debug) {
        var materialIndexLine = selectedMaterialIndex === undefined || selectedMaterialIndex === null ? '' : '\n\t\tmaterialIndex: ' + selectedMaterialIndex;
        var createdReport = '\tOutput Object no.: ' + this.outputObjectCount + '\n\t\tgroupName: ' + meshOutputGroup.groupName + '\n\t\tIndex: ' + meshOutputGroup.index + '\n\t\tfaceType: ' + this.rawMesh.faceType + '\n\t\tmaterialName: ' + meshOutputGroup.materialName + '\n\t\tsmoothingGroup: ' + meshOutputGroup.smoothingGroup + materialIndexLine + '\n\t\tobjectName: ' + meshOutputGroup.objectName + '\n\t\t#vertices: ' + meshOutputGroup.vertices.length / 3 + '\n\t\t#indices: ' + meshOutputGroup.indices.length + '\n\t\t#colors: ' + meshOutputGroup.colors.length / 3 + '\n\t\t#uvs: ' + meshOutputGroup.uvs.length / 2 + '\n\t\t#normals: ' + meshOutputGroup.normals.length / 3;
        console.debug(createdReport);
      }
    }

    this.outputObjectCount++;
    this.callbacks.onAssetAvailable({
      cmd: 'assetAvailable',
      type: 'mesh',
      progress: {
        numericalValue: this.globalCounts.currentByte / this.globalCounts.totalBytes
      },
      params: {
        meshName: result.name
      },
      materials: {
        multiMaterial: createMultiMaterial,
        materialNames: materialNames,
        materialGroups: materialGroups
      },
      buffers: {
        vertices: vertexFA,
        indices: indexUA,
        colors: colorFA,
        normals: normalFA,
        uvs: uvFA
      },
      // 0: mesh, 1: line, 2: point
      geometryType: this.rawMesh.faceType < 4 ? 0 : this.rawMesh.faceType === 6 ? 2 : 1
    }, [vertexFA.buffer], indexUA !== null ? [indexUA.buffer] : null, colorFA !== null ? [colorFA.buffer] : null, normalFA !== null ? [normalFA.buffer] : null, uvFA !== null ? [uvFA.buffer] : null);
  },
  _finalizeParsing: function _finalizeParsing() {
    if (this.logging.enabled) console.info('Global output object count: ' + this.outputObjectCount);

    if (this._processCompletedMesh() && this.logging.enabled) {
      var parserFinalReport = 'Overall counts: ' + '\n\tVertices: ' + this.globalCounts.vertices + '\n\tFaces: ' + this.globalCounts.faces + '\n\tMultiple definitions: ' + this.globalCounts.doubleIndicesCount;
      console.info(parserFinalReport);
    }
  }
};