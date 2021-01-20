"use strict";

var _OBJLoader2Parser = require("../OBJLoader2Parser.js");

var _WorkerRunner = require("../WorkerRunner.js");

/**
 * @author Kai Salmen / https://kaisalmen.de
 * Development repository: https://github.com/kaisalmen/WWOBJLoader
 */
new _WorkerRunner.WorkerRunner(new _WorkerRunner.DefaultWorkerPayloadHandler(new _OBJLoader2Parser.OBJLoader2Parser()));