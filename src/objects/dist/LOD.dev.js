"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOD = LOD;

var _Vector = require("../math/Vector3.js");

var _Object3D = require("../core/Object3D.js");

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
var _v1 = new _Vector.Vector3();

var _v2 = new _Vector.Vector3();

function LOD() {
  _Object3D.Object3D.call(this);

  this.type = 'LOD';
  Object.defineProperties(this, {
    levels: {
      enumerable: true,
      value: []
    }
  });
  this.autoUpdate = true;
}

LOD.prototype = Object.assign(Object.create(_Object3D.Object3D.prototype), {
  constructor: LOD,
  isLOD: true,
  copy: function copy(source) {
    _Object3D.Object3D.prototype.copy.call(this, source, false);

    var levels = source.levels;

    for (var i = 0, l = levels.length; i < l; i++) {
      var level = levels[i];
      this.addLevel(level.object.clone(), level.distance);
    }

    this.autoUpdate = source.autoUpdate;
    return this;
  },
  addLevel: function addLevel(object, distance) {
    if (distance === undefined) distance = 0;
    distance = Math.abs(distance);
    var levels = this.levels;

    for (var l = 0; l < levels.length; l++) {
      if (distance < levels[l].distance) {
        break;
      }
    }

    levels.splice(l, 0, {
      distance: distance,
      object: object
    });
    this.add(object);
    return this;
  },
  getObjectForDistance: function getObjectForDistance(distance) {
    var levels = this.levels;

    if (levels.length > 0) {
      for (var i = 1, l = levels.length; i < l; i++) {
        if (distance < levels[i].distance) {
          break;
        }
      }

      return levels[i - 1].object;
    }

    return null;
  },
  raycast: function raycast(raycaster, intersects) {
    var levels = this.levels;

    if (levels.length > 0) {
      _v1.setFromMatrixPosition(this.matrixWorld);

      var distance = raycaster.ray.origin.distanceTo(_v1);
      this.getObjectForDistance(distance).raycast(raycaster, intersects);
    }
  },
  update: function update(camera) {
    var levels = this.levels;

    if (levels.length > 1) {
      _v1.setFromMatrixPosition(camera.matrixWorld);

      _v2.setFromMatrixPosition(this.matrixWorld);

      var distance = _v1.distanceTo(_v2);

      levels[0].object.visible = true;

      for (var i = 1, l = levels.length; i < l; i++) {
        if (distance >= levels[i].distance) {
          levels[i - 1].object.visible = false;
          levels[i].object.visible = true;
        } else {
          break;
        }
      }

      for (; i < l; i++) {
        levels[i].object.visible = false;
      }
    }
  },
  toJSON: function toJSON(meta) {
    var data = _Object3D.Object3D.prototype.toJSON.call(this, meta);

    if (this.autoUpdate === false) data.object.autoUpdate = false;
    data.object.levels = [];
    var levels = this.levels;

    for (var i = 0, l = levels.length; i < l; i++) {
      var level = levels[i];
      data.object.levels.push({
        object: level.object.uuid,
        distance: level.distance
      });
    }

    return data;
  }
});