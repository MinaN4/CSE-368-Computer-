"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Raycaster = Raycaster;

var _Ray = require("../math/Ray.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author bhouston / http://clara.io/
 * @author stephomi / http://stephaneginier.com/
 */
function Raycaster(origin, direction, near, far) {
  this.ray = new _Ray.Ray(origin, direction); // direction is assumed to be normalized (for accurate distance calculations)

  this.near = near || 0;
  this.far = far || Infinity;
  this.camera = null;
  this.params = {
    Mesh: {},
    Line: {},
    LOD: {},
    Points: {
      threshold: 1
    },
    Sprite: {}
  };
  Object.defineProperties(this.params, {
    PointCloud: {
      get: function get() {
        console.warn('THREE.Raycaster: params.PointCloud has been renamed to params.Points.');
        return this.Points;
      }
    }
  });
}

function ascSort(a, b) {
  return a.distance - b.distance;
}

function _intersectObject(object, raycaster, intersects, recursive) {
  if (object.visible === false) return;
  object.raycast(raycaster, intersects);

  if (recursive === true) {
    var children = object.children;

    for (var i = 0, l = children.length; i < l; i++) {
      _intersectObject(children[i], raycaster, intersects, true);
    }
  }
}

Object.assign(Raycaster.prototype, {
  linePrecision: 1,
  set: function set(origin, direction) {
    // direction is assumed to be normalized (for accurate distance calculations)
    this.ray.set(origin, direction);
  },
  setFromCamera: function setFromCamera(coords, camera) {
    if (camera && camera.isPerspectiveCamera) {
      this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
      this.ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(this.ray.origin).normalize();
      this.camera = camera;
    } else if (camera && camera.isOrthographicCamera) {
      this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera); // set origin in plane of camera

      this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld);
      this.camera = camera;
    } else {
      console.error('THREE.Raycaster: Unsupported camera type.');
    }
  },
  intersectObject: function intersectObject(object, recursive, optionalTarget) {
    var intersects = optionalTarget || [];

    _intersectObject(object, this, intersects, recursive);

    intersects.sort(ascSort);
    return intersects;
  },
  intersectObjects: function intersectObjects(objects, recursive, optionalTarget) {
    var intersects = optionalTarget || [];

    if (Array.isArray(objects) === false) {
      console.warn('THREE.Raycaster.intersectObjects: objects is not an Array.');
      return intersects;
    }

    for (var i = 0, l = objects.length; i < l; i++) {
      _intersectObject(objects[i], this, intersects, recursive);
    }

    intersects.sort(ascSort);
    return intersects;
  }
});