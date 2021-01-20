"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OBJLoader2Parallel = void 0;

var _threeModule = require("../../../build/three.module.js");

var _WorkerExecutionSupport = require("./obj2/worker/main/WorkerExecutionSupport.js");

var _CodeSerializer = require("./obj2/utils/CodeSerializer.js");

var _OBJLoader = require("./OBJLoader2.js");

var _OBJLoader2Parser = require("./obj2/worker/parallel/OBJLoader2Parser.js");

var _WorkerRunner = require("./obj2/worker/parallel/WorkerRunner.js");

/**
 * @author Kai Salmen / https://kaisalmen.de
 * Development repository: https://github.com/kaisalmen/WWOBJLoader
 */
// Imports only related to wrapper
// Imports only related to worker (when standard workers (modules aren't supported) are used)

/**
 * Creates a new OBJLoader2Parallel. Use it to load OBJ data from files or to parse OBJ data from arraybuffer.
 * It extends {@link OBJLoader2} with the capability to run the parser in a web worker.
 *
 * @param [LoadingManager] manager The loadingManager for the loader to use. Default is {@link LoadingManager}
 * @constructor
 */
var OBJLoader2Parallel = function OBJLoader2Parallel(manager) {
  _OBJLoader.OBJLoader2.call(this, manager);

  this.preferJsmWorker = false;
  this.executeParallel = true;
  this.workerExecutionSupport = new _WorkerExecutionSupport.WorkerExecutionSupport();
};

exports.OBJLoader2Parallel = OBJLoader2Parallel;
OBJLoader2Parallel.OBJLOADER2_PARALLEL_VERSION = '3.1.2';
console.info('Using OBJLoader2Parallel version: ' + OBJLoader2Parallel.OBJLOADER2_PARALLEL_VERSION);
OBJLoader2Parallel.prototype = Object.assign(Object.create(_OBJLoader.OBJLoader2.prototype), {
  constructor: OBJLoader2Parallel,

  /**
   * Execution of parse in parallel via Worker is default, but normal {OBJLoader2} parsing can be enforced via false here.
   *
   * @param executeParallel True or False
   * @return {OBJLoader2Parallel}
   */
  setExecuteParallel: function setExecuteParallel(executeParallel) {
    this.executeParallel = executeParallel === true;
    return this;
  },

  /**
   * Set whether jsm modules in workers should be used. This requires browser support which is currently only experimental.
   * @param preferJsmWorker True or False
   * @return {OBJLoader2Parallel}
   */
  setPreferJsmWorker: function setPreferJsmWorker(preferJsmWorker) {
    this.preferJsmWorker = preferJsmWorker === true;
    return this;
  },

  /**
   * Allow to get hold of {@link WorkerExecutionSupport} for configuration purposes.
   * @return {WorkerExecutionSupport}
   */
  getWorkerExecutionSupport: function getWorkerExecutionSupport() {
    return this.workerExecutionSupport;
  },

  /**
   * Provide instructions on what is to be contained in the worker.
   * @return {CodeBuilderInstructions}
   */
  buildWorkerCode: function buildWorkerCode() {
    var codeBuilderInstructions = new _WorkerExecutionSupport.CodeBuilderInstructions(true, true, this.preferJsmWorker);

    if (codeBuilderInstructions.isSupportsJsmWorker()) {
      codeBuilderInstructions.setJsmWorkerFile('../examples/loaders/jsm/obj2/worker/parallel/jsm/OBJLoader2Worker.js');
    }

    if (codeBuilderInstructions.isSupportsStandardWorker()) {
      var codeOBJLoader2Parser = _CodeSerializer.CodeSerializer.serializeClass('OBJLoader2Parser', _OBJLoader2Parser.OBJLoader2Parser);

      var codeObjectManipulator = _CodeSerializer.CodeSerializer.serializeObject('ObjectManipulator', _WorkerRunner.ObjectManipulator);

      var codeParserPayloadHandler = _CodeSerializer.CodeSerializer.serializeClass('DefaultWorkerPayloadHandler', _WorkerRunner.DefaultWorkerPayloadHandler);

      var codeWorkerRunner = _CodeSerializer.CodeSerializer.serializeClass('WorkerRunner', _WorkerRunner.WorkerRunner);

      codeBuilderInstructions.addCodeFragment(codeOBJLoader2Parser);
      codeBuilderInstructions.addCodeFragment(codeObjectManipulator);
      codeBuilderInstructions.addCodeFragment(codeParserPayloadHandler);
      codeBuilderInstructions.addCodeFragment(codeWorkerRunner);
      codeBuilderInstructions.addStartCode('new WorkerRunner( new DefaultWorkerPayloadHandler( new OBJLoader2Parser() ) );');
    }

    return codeBuilderInstructions;
  },

  /**
   * See {@link OBJLoader2.load}
   */
  load: function load(content, onLoad, onFileLoadProgress, onError, onMeshAlter) {
    var scope = this;

    function interceptOnLoad(object3d, message) {
      if (object3d.name === 'OBJLoader2ParallelDummy') {
        if (scope.parser.logging.enabled && scope.parser.logging.debug) {
          console.debug('Received dummy answer from OBJLoader2Parallel#parse');
        }
      } else {
        onLoad(object3d, message);
      }
    }

    _OBJLoader.OBJLoader2.prototype.load.call(this, content, interceptOnLoad, onFileLoadProgress, onError, onMeshAlter);
  },

  /**
   * See {@link OBJLoader2.parse}
   * The callback onLoad needs to be set to be able to receive the content if used in parallel mode.
   * Fallback is possible via {@link OBJLoader2Parallel#setExecuteParallel}.
   */
  parse: function parse(content) {
    if (this.executeParallel) {
      if (this.parser.callbacks.onLoad === this.parser._onLoad) {
        throw "No callback other than the default callback was provided! Aborting!";
      } // check if worker has been initialize before. If yes, skip init


      if (!this.workerExecutionSupport.isWorkerLoaded(this.preferJsmWorker)) {
        var scopedOnLoad = function scopedOnLoad(message) {
          scope.parser.callbacks.onLoad(scope.baseObject3d, message);
        };

        this.workerExecutionSupport.buildWorker(this.buildWorkerCode());
        var scope = this;

        var scopedOnAssetAvailable = function scopedOnAssetAvailable(payload) {
          scope._onAssetAvailable(payload);
        };

        this.workerExecutionSupport.updateCallbacks(scopedOnAssetAvailable, scopedOnLoad);
      } // Create default materials beforehand, but do not override previously set materials (e.g. during init)


      this.materialHandler.createDefaultMaterials(false);
      this.workerExecutionSupport.executeParallel({
        params: {
          modelName: this.modelName,
          instanceNo: this.instanceNo,
          useIndices: this.parser.useIndices,
          disregardNormals: this.parser.disregardNormals,
          materialPerSmoothingGroup: this.parser.materialPerSmoothingGroup,
          useOAsMesh: this.parser.useOAsMesh,
          materials: this.materialHandler.getMaterialsJSON()
        },
        data: {
          input: content,
          options: null
        },
        logging: {
          enabled: this.parser.logging.enabled,
          debug: this.parser.logging.debug
        }
      });
      var dummy = new _threeModule.Object3D();
      dummy.name = 'OBJLoader2ParallelDummy';
      return dummy;
    } else {
      return _OBJLoader.OBJLoader2.prototype.parse.call(this, content);
    }
  }
});