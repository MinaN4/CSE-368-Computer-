"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mesh = Mesh;

var _Vector = require("../math/Vector3.js");

var _Vector2 = require("../math/Vector2.js");

var _Sphere = require("../math/Sphere.js");

var _Ray = require("../math/Ray.js");

var _Matrix = require("../math/Matrix4.js");

var _Object3D = require("../core/Object3D.js");

var _Triangle = require("../math/Triangle.js");

var _Face = require("../core/Face3.js");

var _constants = require("../constants.js");

var _MeshBasicMaterial = require("../materials/MeshBasicMaterial.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author jonobr1 / http://jonobr1.com/
 */
var _inverseMatrix = new _Matrix.Matrix4();

var _ray = new _Ray.Ray();

var _sphere = new _Sphere.Sphere();

var _vA = new _Vector.Vector3();

var _vB = new _Vector.Vector3();

var _vC = new _Vector.Vector3();

var _tempA = new _Vector.Vector3();

var _tempB = new _Vector.Vector3();

var _tempC = new _Vector.Vector3();

var _morphA = new _Vector.Vector3();

var _morphB = new _Vector.Vector3();

var _morphC = new _Vector.Vector3();

var _uvA = new _Vector2.Vector2();

var _uvB = new _Vector2.Vector2();

var _uvC = new _Vector2.Vector2();

var _intersectionPoint = new _Vector.Vector3();

var _intersectionPointWorld = new _Vector.Vector3();

function Mesh(geometry, material) {
  _Object3D.Object3D.call(this);

  this.type = 'Mesh';
  this.geometry = geometry !== undefined ? geometry : new _BufferGeometry.BufferGeometry();
  this.material = material !== undefined ? material : new _MeshBasicMaterial.MeshBasicMaterial({
    color: Math.random() * 0xffffff
  });
  this.drawMode = _constants.TrianglesDrawMode;
  this.updateMorphTargets();
}

Mesh.prototype = Object.assign(Object.create(_Object3D.Object3D.prototype), {
  constructor: Mesh,
  isMesh: true,
  setDrawMode: function setDrawMode(value) {
    this.drawMode = value;
  },
  copy: function copy(source) {
    _Object3D.Object3D.prototype.copy.call(this, source);

    this.drawMode = source.drawMode;

    if (source.morphTargetInfluences !== undefined) {
      this.morphTargetInfluences = source.morphTargetInfluences.slice();
    }

    if (source.morphTargetDictionary !== undefined) {
      this.morphTargetDictionary = Object.assign({}, source.morphTargetDictionary);
    }

    return this;
  },
  updateMorphTargets: function updateMorphTargets() {
    var geometry = this.geometry;
    var m, ml, name;

    if (geometry.isBufferGeometry) {
      var morphAttributes = geometry.morphAttributes;
      var keys = Object.keys(morphAttributes);

      if (keys.length > 0) {
        var morphAttribute = morphAttributes[keys[0]];

        if (morphAttribute !== undefined) {
          this.morphTargetInfluences = [];
          this.morphTargetDictionary = {};

          for (m = 0, ml = morphAttribute.length; m < ml; m++) {
            name = morphAttribute[m].name || String(m);
            this.morphTargetInfluences.push(0);
            this.morphTargetDictionary[name] = m;
          }
        }
      }
    } else {
      var morphTargets = geometry.morphTargets;

      if (morphTargets !== undefined && morphTargets.length > 0) {
        console.error('THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.');
      }
    }
  },
  raycast: function raycast(raycaster, intersects) {
    var geometry = this.geometry;
    var material = this.material;
    var matrixWorld = this.matrixWorld;
    if (material === undefined) return; // Checking boundingSphere distance to ray

    if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

    _sphere.copy(geometry.boundingSphere);

    _sphere.applyMatrix4(matrixWorld);

    if (raycaster.ray.intersectsSphere(_sphere) === false) return; //

    _inverseMatrix.getInverse(matrixWorld);

    _ray.copy(raycaster.ray).applyMatrix4(_inverseMatrix); // Check boundingBox before continuing


    if (geometry.boundingBox !== null) {
      if (_ray.intersectsBox(geometry.boundingBox) === false) return;
    } // check unsupported draw modes


    if (this.drawMode !== _constants.TrianglesDrawMode) {
      console.warn('THREE.Mesh: TriangleStripDrawMode and TriangleFanDrawMode are not supported by .raycast().');
      return;
    }

    var intersection;

    if (geometry.isBufferGeometry) {
      var a, b, c;
      var index = geometry.index;
      var position = geometry.attributes.position;
      var morphPosition = geometry.morphAttributes.position;
      var morphTargetsRelative = geometry.morphTargetsRelative;
      var uv = geometry.attributes.uv;
      var uv2 = geometry.attributes.uv2;
      var groups = geometry.groups;
      var drawRange = geometry.drawRange;
      var i, j, il, jl;
      var group, groupMaterial;
      var start, end;

      if (index !== null) {
        // indexed buffer geometry
        if (Array.isArray(material)) {
          for (i = 0, il = groups.length; i < il; i++) {
            group = groups[i];
            groupMaterial = material[group.materialIndex];
            start = Math.max(group.start, drawRange.start);
            end = Math.min(group.start + group.count, drawRange.start + drawRange.count);

            for (j = start, jl = end; j < jl; j += 3) {
              a = index.getX(j);
              b = index.getX(j + 1);
              c = index.getX(j + 2);
              intersection = checkBufferGeometryIntersection(this, groupMaterial, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c);

              if (intersection) {
                intersection.faceIndex = Math.floor(j / 3); // triangle number in indexed buffer semantics

                intersection.face.materialIndex = group.materialIndex;
                intersects.push(intersection);
              }
            }
          }
        } else {
          start = Math.max(0, drawRange.start);
          end = Math.min(index.count, drawRange.start + drawRange.count);

          for (i = start, il = end; i < il; i += 3) {
            a = index.getX(i);
            b = index.getX(i + 1);
            c = index.getX(i + 2);
            intersection = checkBufferGeometryIntersection(this, material, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c);

            if (intersection) {
              intersection.faceIndex = Math.floor(i / 3); // triangle number in indexed buffer semantics

              intersects.push(intersection);
            }
          }
        }
      } else if (position !== undefined) {
        // non-indexed buffer geometry
        if (Array.isArray(material)) {
          for (i = 0, il = groups.length; i < il; i++) {
            group = groups[i];
            groupMaterial = material[group.materialIndex];
            start = Math.max(group.start, drawRange.start);
            end = Math.min(group.start + group.count, drawRange.start + drawRange.count);

            for (j = start, jl = end; j < jl; j += 3) {
              a = j;
              b = j + 1;
              c = j + 2;
              intersection = checkBufferGeometryIntersection(this, groupMaterial, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c);

              if (intersection) {
                intersection.faceIndex = Math.floor(j / 3); // triangle number in non-indexed buffer semantics

                intersection.face.materialIndex = group.materialIndex;
                intersects.push(intersection);
              }
            }
          }
        } else {
          start = Math.max(0, drawRange.start);
          end = Math.min(position.count, drawRange.start + drawRange.count);

          for (i = start, il = end; i < il; i += 3) {
            a = i;
            b = i + 1;
            c = i + 2;
            intersection = checkBufferGeometryIntersection(this, material, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c);

            if (intersection) {
              intersection.faceIndex = Math.floor(i / 3); // triangle number in non-indexed buffer semantics

              intersects.push(intersection);
            }
          }
        }
      }
    } else if (geometry.isGeometry) {
      var fvA, fvB, fvC;
      var isMultiMaterial = Array.isArray(material);
      var vertices = geometry.vertices;
      var faces = geometry.faces;
      var uvs;
      var faceVertexUvs = geometry.faceVertexUvs[0];
      if (faceVertexUvs.length > 0) uvs = faceVertexUvs;

      for (var f = 0, fl = faces.length; f < fl; f++) {
        var face = faces[f];
        var faceMaterial = isMultiMaterial ? material[face.materialIndex] : material;
        if (faceMaterial === undefined) continue;
        fvA = vertices[face.a];
        fvB = vertices[face.b];
        fvC = vertices[face.c];
        intersection = checkIntersection(this, faceMaterial, raycaster, _ray, fvA, fvB, fvC, _intersectionPoint);

        if (intersection) {
          if (uvs && uvs[f]) {
            var uvs_f = uvs[f];

            _uvA.copy(uvs_f[0]);

            _uvB.copy(uvs_f[1]);

            _uvC.copy(uvs_f[2]);

            intersection.uv = _Triangle.Triangle.getUV(_intersectionPoint, fvA, fvB, fvC, _uvA, _uvB, _uvC, new _Vector2.Vector2());
          }

          intersection.face = face;
          intersection.faceIndex = f;
          intersects.push(intersection);
        }
      }
    }
  },
  clone: function clone() {
    return new this.constructor(this.geometry, this.material).copy(this);
  }
});

function checkIntersection(object, material, raycaster, ray, pA, pB, pC, point) {
  var intersect;

  if (material.side === _constants.BackSide) {
    intersect = ray.intersectTriangle(pC, pB, pA, true, point);
  } else {
    intersect = ray.intersectTriangle(pA, pB, pC, material.side !== _constants.DoubleSide, point);
  }

  if (intersect === null) return null;

  _intersectionPointWorld.copy(point);

  _intersectionPointWorld.applyMatrix4(object.matrixWorld);

  var distance = raycaster.ray.origin.distanceTo(_intersectionPointWorld);
  if (distance < raycaster.near || distance > raycaster.far) return null;
  return {
    distance: distance,
    point: _intersectionPointWorld.clone(),
    object: object
  };
}

function checkBufferGeometryIntersection(object, material, raycaster, ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c) {
  _vA.fromBufferAttribute(position, a);

  _vB.fromBufferAttribute(position, b);

  _vC.fromBufferAttribute(position, c);

  var morphInfluences = object.morphTargetInfluences;

  if (material.morphTargets && morphPosition && morphInfluences) {
    _morphA.set(0, 0, 0);

    _morphB.set(0, 0, 0);

    _morphC.set(0, 0, 0);

    for (var i = 0, il = morphPosition.length; i < il; i++) {
      var influence = morphInfluences[i];
      var morphAttribute = morphPosition[i];
      if (influence === 0) continue;

      _tempA.fromBufferAttribute(morphAttribute, a);

      _tempB.fromBufferAttribute(morphAttribute, b);

      _tempC.fromBufferAttribute(morphAttribute, c);

      if (morphTargetsRelative) {
        _morphA.addScaledVector(_tempA, influence);

        _morphB.addScaledVector(_tempB, influence);

        _morphC.addScaledVector(_tempC, influence);
      } else {
        _morphA.addScaledVector(_tempA.sub(_vA), influence);

        _morphB.addScaledVector(_tempB.sub(_vB), influence);

        _morphC.addScaledVector(_tempC.sub(_vC), influence);
      }
    }

    _vA.add(_morphA);

    _vB.add(_morphB);

    _vC.add(_morphC);
  }

  var intersection = checkIntersection(object, material, raycaster, ray, _vA, _vB, _vC, _intersectionPoint);

  if (intersection) {
    if (uv) {
      _uvA.fromBufferAttribute(uv, a);

      _uvB.fromBufferAttribute(uv, b);

      _uvC.fromBufferAttribute(uv, c);

      intersection.uv = _Triangle.Triangle.getUV(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new _Vector2.Vector2());
    }

    if (uv2) {
      _uvA.fromBufferAttribute(uv2, a);

      _uvB.fromBufferAttribute(uv2, b);

      _uvC.fromBufferAttribute(uv2, c);

      intersection.uv2 = _Triangle.Triangle.getUV(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new _Vector2.Vector2());
    }

    var face = new _Face.Face3(a, b, c);

    _Triangle.Triangle.getNormal(_vA, _vB, _vC, face.normal);

    intersection.face = face;
  }

  return intersection;
}