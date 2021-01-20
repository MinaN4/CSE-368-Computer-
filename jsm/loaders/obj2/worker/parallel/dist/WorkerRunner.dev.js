"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectManipulator = exports.DefaultWorkerPayloadHandler = exports.WorkerRunner = void 0;

/**
 * @author Kai Salmen / https://kaisalmen.de
 * Development repository: https://github.com/kaisalmen/WWOBJLoader
 */
var ObjectManipulator = {
  /**
   * Applies values from parameter object via set functions or via direct assignment.
   *
   * @param {Object} objToAlter The objToAlter instance
   * @param {Object} params The parameter object
   */
  applyProperties: function applyProperties(objToAlter, params, forceCreation) {
    // fast-fail
    if (objToAlter === undefined || objToAlter === null || params === undefined || params === null) return;
    var property, funcName, values;

    for (property in params) {
      funcName = 'set' + property.substring(0, 1).toLocaleUpperCase() + property.substring(1);
      values = params[property];

      if (typeof objToAlter[funcName] === 'function') {
        objToAlter[funcName](values);
      } else if (objToAlter.hasOwnProperty(property) || forceCreation) {
        objToAlter[property] = values;
      }
    }
  }
};
exports.ObjectManipulator = ObjectManipulator;

var DefaultWorkerPayloadHandler = function DefaultWorkerPayloadHandler(parser) {
  this.parser = parser;
  this.logging = {
    enabled: false,
    debug: false
  };
};

exports.DefaultWorkerPayloadHandler = DefaultWorkerPayloadHandler;
DefaultWorkerPayloadHandler.prototype = {
  constructor: DefaultWorkerPayloadHandler,
  handlePayload: function handlePayload(payload) {
    if (payload.logging) {
      this.logging.enabled = payload.logging.enabled === true;
      this.logging.debug = payload.logging.debug === true;
    }

    if (payload.cmd === 'parse') {
      var scope = this;
      var callbacks = {
        callbackOnAssetAvailable: function callbackOnAssetAvailable(payload) {
          self.postMessage(payload);
        },
        callbackOnProgress: function callbackOnProgress(text) {
          if (scope.logging.enabled && scope.logging.debug) console.debug('WorkerRunner: progress: ' + text);
        }
      };
      var parser = this.parser;

      if (typeof parser['setLogging'] === 'function') {
        parser.setLogging(this.logging.enabled, this.logging.debug);
      }

      ObjectManipulator.applyProperties(parser, payload.params, false);
      ObjectManipulator.applyProperties(parser, callbacks, false);
      var arraybuffer = payload.data.input;
      var executeFunctionName = 'execute';
      if (typeof parser.getParseFunctionName === 'function') executeFunctionName = parser.getParseFunctionName();

      if (payload.usesMeshDisassembler) {// TODO: Allow to plug and use generic MeshDisassembler
      } else {
        parser[executeFunctionName](arraybuffer, payload.data.options);
      }

      if (this.logging.enabled) console.log('WorkerRunner: Run complete!');
      self.postMessage({
        cmd: 'completeOverall',
        msg: 'WorkerRunner completed run.'
      });
    } else {
      console.error('WorkerRunner: Received unknown command: ' + payload.cmd);
    }
  }
};
/**
 * Default implementation of the WorkerRunner responsible for creation and configuration of the parser within the worker.
 * @constructor
 */

var WorkerRunner = function WorkerRunner(payloadHandler) {
  this.payloadHandler = payloadHandler;
  var scope = this;

  var scopedRunner = function scopedRunner(event) {
    scope.processMessage(event.data);
  };

  self.addEventListener('message', scopedRunner, false);
};

exports.WorkerRunner = WorkerRunner;
WorkerRunner.prototype = {
  constructor: WorkerRunner,

  /**
   * Configures the Parser implementation according the supplied configuration object.
   *
   * @param {Object} payload Raw mesh description (buffers, params, materials) used to build one to many meshes.
   */
  processMessage: function processMessage(payload) {
    this.payloadHandler.handlePayload(payload);
  }
};