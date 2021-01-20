"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Face4 = Face4;
exports.MeshFaceMaterial = MeshFaceMaterial;
exports.MultiMaterial = MultiMaterial;
exports.PointCloud = PointCloud;
exports.Particle = Particle;
exports.ParticleSystem = ParticleSystem;
exports.PointCloudMaterial = PointCloudMaterial;
exports.ParticleBasicMaterial = ParticleBasicMaterial;
exports.ParticleSystemMaterial = ParticleSystemMaterial;
exports.Vertex = Vertex;
exports.DynamicBufferAttribute = DynamicBufferAttribute;
exports.Int8Attribute = Int8Attribute;
exports.Uint8Attribute = Uint8Attribute;
exports.Uint8ClampedAttribute = Uint8ClampedAttribute;
exports.Int16Attribute = Int16Attribute;
exports.Uint16Attribute = Uint16Attribute;
exports.Int32Attribute = Int32Attribute;
exports.Uint32Attribute = Uint32Attribute;
exports.Float32Attribute = Float32Attribute;
exports.Float64Attribute = Float64Attribute;
exports.ClosedSplineCurve3 = ClosedSplineCurve3;
exports.SplineCurve3 = SplineCurve3;
exports.Spline = Spline;
exports.AxisHelper = AxisHelper;
exports.BoundingBoxHelper = BoundingBoxHelper;
exports.EdgesHelper = EdgesHelper;
exports.WireframeHelper = WireframeHelper;
exports.XHRLoader = XHRLoader;
exports.BinaryTextureLoader = BinaryTextureLoader;
exports.CanvasRenderer = CanvasRenderer;
exports.JSONLoader = JSONLoader;
exports.LensFlare = LensFlare;
Object.defineProperty(exports, "CubeGeometry", {
  enumerable: true,
  get: function get() {
    return _BoxGeometry.BoxGeometry;
  }
});
exports.SceneUtils = exports.GeometryUtils = exports.LinePieces = exports.LineStrip = void 0;

var _Audio = require("./audio/Audio.js");

var _AudioAnalyser = require("./audio/AudioAnalyser.js");

var _PerspectiveCamera = require("./cameras/PerspectiveCamera.js");

var _constants = require("./constants.js");

var _BufferAttribute = require("./core/BufferAttribute.js");

var _BufferGeometry = require("./core/BufferGeometry.js");

var _InterleavedBuffer = require("./core/InterleavedBuffer.js");

var _Face = require("./core/Face3.js");

var _Geometry = require("./core/Geometry.js");

var _Object3D = require("./core/Object3D.js");

var _Uniform = require("./core/Uniform.js");

var _Curve = require("./extras/core/Curve.js");

var _CurvePath = require("./extras/core/CurvePath.js");

var _Path = require("./extras/core/Path.js");

var _CatmullRomCurve = require("./extras/curves/CatmullRomCurve3.js");

var _AxesHelper = require("./helpers/AxesHelper.js");

var _BoxHelper = require("./helpers/BoxHelper.js");

var _GridHelper = require("./helpers/GridHelper.js");

var _SkeletonHelper = require("./helpers/SkeletonHelper.js");

var _BoxGeometry = require("./geometries/BoxGeometry.js");

var _EdgesGeometry = require("./geometries/EdgesGeometry.js");

var _ExtrudeGeometry = require("./geometries/ExtrudeGeometry.js");

var _ShapeGeometry = require("./geometries/ShapeGeometry.js");

var _WireframeGeometry = require("./geometries/WireframeGeometry.js");

var _Light = require("./lights/Light.js");

var _Loader = require("./loaders/Loader.js");

var _LoaderUtils = require("./loaders/LoaderUtils.js");

var _FileLoader = require("./loaders/FileLoader.js");

var _AudioLoader = require("./loaders/AudioLoader.js");

var _CubeTextureLoader = require("./loaders/CubeTextureLoader.js");

var _DataTextureLoader = require("./loaders/DataTextureLoader.js");

var _ObjectLoader = require("./loaders/ObjectLoader.js");

var _TextureLoader = require("./loaders/TextureLoader.js");

var _Material = require("./materials/Material.js");

var _LineBasicMaterial = require("./materials/LineBasicMaterial.js");

var _MeshPhongMaterial = require("./materials/MeshPhongMaterial.js");

var _PointsMaterial = require("./materials/PointsMaterial.js");

var _ShaderMaterial = require("./materials/ShaderMaterial.js");

var _Box = require("./math/Box2.js");

var _Box2 = require("./math/Box3.js");

var _Color = require("./math/Color.js");

var _Line = require("./math/Line3.js");

var _Math2 = require("./math/Math.js");

var _Matrix = require("./math/Matrix3.js");

var _Matrix2 = require("./math/Matrix4.js");

var _Plane = require("./math/Plane.js");

var _Quaternion = require("./math/Quaternion.js");

var _Ray = require("./math/Ray.js");

var _Triangle = require("./math/Triangle.js");

var _Vector = require("./math/Vector2.js");

var _Vector2 = require("./math/Vector3.js");

var _Vector3 = require("./math/Vector4.js");

var _LineSegments = require("./objects/LineSegments.js");

var _LOD = require("./objects/LOD.js");

var _Points = require("./objects/Points.js");

var _Sprite = require("./objects/Sprite.js");

var _Skeleton = require("./objects/Skeleton.js");

var _SkinnedMesh = require("./objects/SkinnedMesh.js");

var _WebGLRenderer = require("./renderers/WebGLRenderer.js");

var _WebGLRenderTarget = require("./renderers/WebGLRenderTarget.js");

var _WebGLRenderTargetCube = require("./renderers/WebGLRenderTargetCube.js");

var _WebGLShadowMap = require("./renderers/webgl/WebGLShadowMap.js");

var _WebVRManager = require("./renderers/webvr/WebVRManager.js");

var _ImageUtils = require("./extras/ImageUtils.js");

var _Shape = require("./extras/core/Shape.js");

var _CubeCamera = require("./cameras/CubeCamera.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function Face4(a, b, c, d, normal, color, materialIndex) {
  console.warn('THREE.Face4 has been removed. A THREE.Face3 will be created instead.');
  return new _Face.Face3(a, b, c, normal, color, materialIndex);
}

var LineStrip = 0;
exports.LineStrip = LineStrip;
var LinePieces = 1;
exports.LinePieces = LinePieces;

function MeshFaceMaterial(materials) {
  console.warn('THREE.MeshFaceMaterial has been removed. Use an Array instead.');
  return materials;
}

function MultiMaterial(materials) {
  if (materials === undefined) materials = [];
  console.warn('THREE.MultiMaterial has been removed. Use an Array instead.');
  materials.isMultiMaterial = true;
  materials.materials = materials;

  materials.clone = function () {
    return materials.slice();
  };

  return materials;
}

function PointCloud(geometry, material) {
  console.warn('THREE.PointCloud has been renamed to THREE.Points.');
  return new _Points.Points(geometry, material);
}

function Particle(material) {
  console.warn('THREE.Particle has been renamed to THREE.Sprite.');
  return new _Sprite.Sprite(material);
}

function ParticleSystem(geometry, material) {
  console.warn('THREE.ParticleSystem has been renamed to THREE.Points.');
  return new _Points.Points(geometry, material);
}

function PointCloudMaterial(parameters) {
  console.warn('THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial.');
  return new _PointsMaterial.PointsMaterial(parameters);
}

function ParticleBasicMaterial(parameters) {
  console.warn('THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial.');
  return new _PointsMaterial.PointsMaterial(parameters);
}

function ParticleSystemMaterial(parameters) {
  console.warn('THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial.');
  return new _PointsMaterial.PointsMaterial(parameters);
}

function Vertex(x, y, z) {
  console.warn('THREE.Vertex has been removed. Use THREE.Vector3 instead.');
  return new _Vector2.Vector3(x, y, z);
} //


function DynamicBufferAttribute(array, itemSize) {
  console.warn('THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead.');
  return new _BufferAttribute.BufferAttribute(array, itemSize).setDynamic(true);
}

function Int8Attribute(array, itemSize) {
  console.warn('THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead.');
  return new _BufferAttribute.Int8BufferAttribute(array, itemSize);
}

function Uint8Attribute(array, itemSize) {
  console.warn('THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead.');
  return new _BufferAttribute.Uint8BufferAttribute(array, itemSize);
}

function Uint8ClampedAttribute(array, itemSize) {
  console.warn('THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead.');
  return new _BufferAttribute.Uint8ClampedBufferAttribute(array, itemSize);
}

function Int16Attribute(array, itemSize) {
  console.warn('THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead.');
  return new _BufferAttribute.Int16BufferAttribute(array, itemSize);
}

function Uint16Attribute(array, itemSize) {
  console.warn('THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead.');
  return new _BufferAttribute.Uint16BufferAttribute(array, itemSize);
}

function Int32Attribute(array, itemSize) {
  console.warn('THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead.');
  return new _BufferAttribute.Int32BufferAttribute(array, itemSize);
}

function Uint32Attribute(array, itemSize) {
  console.warn('THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead.');
  return new _BufferAttribute.Uint32BufferAttribute(array, itemSize);
}

function Float32Attribute(array, itemSize) {
  console.warn('THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead.');
  return new _BufferAttribute.Float32BufferAttribute(array, itemSize);
}

function Float64Attribute(array, itemSize) {
  console.warn('THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead.');
  return new _BufferAttribute.Float64BufferAttribute(array, itemSize);
} //


_Curve.Curve.create = function (construct, getPoint) {
  console.log('THREE.Curve.create() has been deprecated');
  construct.prototype = Object.create(_Curve.Curve.prototype);
  construct.prototype.constructor = construct;
  construct.prototype.getPoint = getPoint;
  return construct;
}; //


Object.assign(_CurvePath.CurvePath.prototype, {
  createPointsGeometry: function createPointsGeometry(divisions) {
    console.warn('THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.'); // generate geometry from path points (for Line or Points objects)

    var pts = this.getPoints(divisions);
    return this.createGeometry(pts);
  },
  createSpacedPointsGeometry: function createSpacedPointsGeometry(divisions) {
    console.warn('THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.'); // generate geometry from equidistant sampling along the path

    var pts = this.getSpacedPoints(divisions);
    return this.createGeometry(pts);
  },
  createGeometry: function createGeometry(points) {
    console.warn('THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.');
    var geometry = new _Geometry.Geometry();

    for (var i = 0, l = points.length; i < l; i++) {
      var point = points[i];
      geometry.vertices.push(new _Vector2.Vector3(point.x, point.y, point.z || 0));
    }

    return geometry;
  }
}); //

Object.assign(_Path.Path.prototype, {
  fromPoints: function fromPoints(points) {
    console.warn('THREE.Path: .fromPoints() has been renamed to .setFromPoints().');
    return this.setFromPoints(points);
  }
}); //

function ClosedSplineCurve3(points) {
  console.warn('THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.');

  _CatmullRomCurve.CatmullRomCurve3.call(this, points);

  this.type = 'catmullrom';
  this.closed = true;
}

ClosedSplineCurve3.prototype = Object.create(_CatmullRomCurve.CatmullRomCurve3.prototype); //

function SplineCurve3(points) {
  console.warn('THREE.SplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.');

  _CatmullRomCurve.CatmullRomCurve3.call(this, points);

  this.type = 'catmullrom';
}

SplineCurve3.prototype = Object.create(_CatmullRomCurve.CatmullRomCurve3.prototype); //

function Spline(points) {
  console.warn('THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead.');

  _CatmullRomCurve.CatmullRomCurve3.call(this, points);

  this.type = 'catmullrom';
}

Spline.prototype = Object.create(_CatmullRomCurve.CatmullRomCurve3.prototype);
Object.assign(Spline.prototype, {
  initFromArray: function initFromArray()
  /* a */
  {
    console.error('THREE.Spline: .initFromArray() has been removed.');
  },
  getControlPointsArray: function getControlPointsArray()
  /* optionalTarget */
  {
    console.error('THREE.Spline: .getControlPointsArray() has been removed.');
  },
  reparametrizeByArcLength: function reparametrizeByArcLength()
  /* samplingCoef */
  {
    console.error('THREE.Spline: .reparametrizeByArcLength() has been removed.');
  }
}); //

function AxisHelper(size) {
  console.warn('THREE.AxisHelper has been renamed to THREE.AxesHelper.');
  return new _AxesHelper.AxesHelper(size);
}

function BoundingBoxHelper(object, color) {
  console.warn('THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead.');
  return new _BoxHelper.BoxHelper(object, color);
}

function EdgesHelper(object, hex) {
  console.warn('THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead.');
  return new _LineSegments.LineSegments(new _EdgesGeometry.EdgesGeometry(object.geometry), new _LineBasicMaterial.LineBasicMaterial({
    color: hex !== undefined ? hex : 0xffffff
  }));
}

_GridHelper.GridHelper.prototype.setColors = function () {
  console.error('THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.');
};

_SkeletonHelper.SkeletonHelper.prototype.update = function () {
  console.error('THREE.SkeletonHelper: update() no longer needs to be called.');
};

function WireframeHelper(object, hex) {
  console.warn('THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead.');
  return new _LineSegments.LineSegments(new _WireframeGeometry.WireframeGeometry(object.geometry), new _LineBasicMaterial.LineBasicMaterial({
    color: hex !== undefined ? hex : 0xffffff
  }));
} //


Object.assign(_Loader.Loader.prototype, {
  extractUrlBase: function extractUrlBase(url) {
    console.warn('THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead.');
    return _LoaderUtils.LoaderUtils.extractUrlBase(url);
  }
});
_Loader.Loader.Handlers = {
  add: function add()
  /* regex, loader */
  {
    console.error('THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.');
  },
  get: function get()
  /* file */
  {
    console.error('THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.');
  }
};

function XHRLoader(manager) {
  console.warn('THREE.XHRLoader has been renamed to THREE.FileLoader.');
  return new _FileLoader.FileLoader(manager);
}

function BinaryTextureLoader(manager) {
  console.warn('THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader.');
  return new _DataTextureLoader.DataTextureLoader(manager);
}

Object.assign(_ObjectLoader.ObjectLoader.prototype, {
  setTexturePath: function setTexturePath(value) {
    console.warn('THREE.ObjectLoader: .setTexturePath() has been renamed to .setResourcePath().');
    return this.setResourcePath(value);
  }
}); //

Object.assign(_Box.Box2.prototype, {
  center: function center(optionalTarget) {
    console.warn('THREE.Box2: .center() has been renamed to .getCenter().');
    return this.getCenter(optionalTarget);
  },
  empty: function empty() {
    console.warn('THREE.Box2: .empty() has been renamed to .isEmpty().');
    return this.isEmpty();
  },
  isIntersectionBox: function isIntersectionBox(box) {
    console.warn('THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox().');
    return this.intersectsBox(box);
  },
  size: function size(optionalTarget) {
    console.warn('THREE.Box2: .size() has been renamed to .getSize().');
    return this.getSize(optionalTarget);
  }
});
Object.assign(_Box2.Box3.prototype, {
  center: function center(optionalTarget) {
    console.warn('THREE.Box3: .center() has been renamed to .getCenter().');
    return this.getCenter(optionalTarget);
  },
  empty: function empty() {
    console.warn('THREE.Box3: .empty() has been renamed to .isEmpty().');
    return this.isEmpty();
  },
  isIntersectionBox: function isIntersectionBox(box) {
    console.warn('THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox().');
    return this.intersectsBox(box);
  },
  isIntersectionSphere: function isIntersectionSphere(sphere) {
    console.warn('THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere().');
    return this.intersectsSphere(sphere);
  },
  size: function size(optionalTarget) {
    console.warn('THREE.Box3: .size() has been renamed to .getSize().');
    return this.getSize(optionalTarget);
  }
});

_Line.Line3.prototype.center = function (optionalTarget) {
  console.warn('THREE.Line3: .center() has been renamed to .getCenter().');
  return this.getCenter(optionalTarget);
};

Object.assign(_Math2._Math, {
  random16: function random16() {
    console.warn('THREE.Math: .random16() has been deprecated. Use Math.random() instead.');
    return Math.random();
  },
  nearestPowerOfTwo: function nearestPowerOfTwo(value) {
    console.warn('THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo().');
    return _Math2._Math.floorPowerOfTwo(value);
  },
  nextPowerOfTwo: function nextPowerOfTwo(value) {
    console.warn('THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo().');
    return _Math2._Math.ceilPowerOfTwo(value);
  }
});
Object.assign(_Matrix.Matrix3.prototype, {
  flattenToArrayOffset: function flattenToArrayOffset(array, offset) {
    console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.");
    return this.toArray(array, offset);
  },
  multiplyVector3: function multiplyVector3(vector) {
    console.warn('THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.');
    return vector.applyMatrix3(this);
  },
  multiplyVector3Array: function multiplyVector3Array()
  /* a */
  {
    console.error('THREE.Matrix3: .multiplyVector3Array() has been removed.');
  },
  applyToBuffer: function applyToBuffer(buffer
  /*, offset, length */
  ) {
    console.warn('THREE.Matrix3: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead.');
    return this.applyToBufferAttribute(buffer);
  },
  applyToVector3Array: function applyToVector3Array()
  /* array, offset, length */
  {
    console.error('THREE.Matrix3: .applyToVector3Array() has been removed.');
  }
});
Object.assign(_Matrix2.Matrix4.prototype, {
  extractPosition: function extractPosition(m) {
    console.warn('THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().');
    return this.copyPosition(m);
  },
  flattenToArrayOffset: function flattenToArrayOffset(array, offset) {
    console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.");
    return this.toArray(array, offset);
  },
  getPosition: function getPosition() {
    console.warn('THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.');
    return new _Vector2.Vector3().setFromMatrixColumn(this, 3);
  },
  setRotationFromQuaternion: function setRotationFromQuaternion(q) {
    console.warn('THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().');
    return this.makeRotationFromQuaternion(q);
  },
  multiplyToArray: function multiplyToArray() {
    console.warn('THREE.Matrix4: .multiplyToArray() has been removed.');
  },
  multiplyVector3: function multiplyVector3(vector) {
    console.warn('THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead.');
    return vector.applyMatrix4(this);
  },
  multiplyVector4: function multiplyVector4(vector) {
    console.warn('THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.');
    return vector.applyMatrix4(this);
  },
  multiplyVector3Array: function multiplyVector3Array()
  /* a */
  {
    console.error('THREE.Matrix4: .multiplyVector3Array() has been removed.');
  },
  rotateAxis: function rotateAxis(v) {
    console.warn('THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.');
    v.transformDirection(this);
  },
  crossVector: function crossVector(vector) {
    console.warn('THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.');
    return vector.applyMatrix4(this);
  },
  translate: function translate() {
    console.error('THREE.Matrix4: .translate() has been removed.');
  },
  rotateX: function rotateX() {
    console.error('THREE.Matrix4: .rotateX() has been removed.');
  },
  rotateY: function rotateY() {
    console.error('THREE.Matrix4: .rotateY() has been removed.');
  },
  rotateZ: function rotateZ() {
    console.error('THREE.Matrix4: .rotateZ() has been removed.');
  },
  rotateByAxis: function rotateByAxis() {
    console.error('THREE.Matrix4: .rotateByAxis() has been removed.');
  },
  applyToBuffer: function applyToBuffer(buffer
  /*, offset, length */
  ) {
    console.warn('THREE.Matrix4: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead.');
    return this.applyToBufferAttribute(buffer);
  },
  applyToVector3Array: function applyToVector3Array()
  /* array, offset, length */
  {
    console.error('THREE.Matrix4: .applyToVector3Array() has been removed.');
  },
  makeFrustum: function makeFrustum(left, right, bottom, top, near, far) {
    console.warn('THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead.');
    return this.makePerspective(left, right, top, bottom, near, far);
  }
});

_Plane.Plane.prototype.isIntersectionLine = function (line) {
  console.warn('THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine().');
  return this.intersectsLine(line);
};

_Quaternion.Quaternion.prototype.multiplyVector3 = function (vector) {
  console.warn('THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.');
  return vector.applyQuaternion(this);
};

Object.assign(_Ray.Ray.prototype, {
  isIntersectionBox: function isIntersectionBox(box) {
    console.warn('THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox().');
    return this.intersectsBox(box);
  },
  isIntersectionPlane: function isIntersectionPlane(plane) {
    console.warn('THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane().');
    return this.intersectsPlane(plane);
  },
  isIntersectionSphere: function isIntersectionSphere(sphere) {
    console.warn('THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere().');
    return this.intersectsSphere(sphere);
  }
});
Object.assign(_Triangle.Triangle.prototype, {
  area: function area() {
    console.warn('THREE.Triangle: .area() has been renamed to .getArea().');
    return this.getArea();
  },
  barycoordFromPoint: function barycoordFromPoint(point, target) {
    console.warn('THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().');
    return this.getBarycoord(point, target);
  },
  midpoint: function midpoint(target) {
    console.warn('THREE.Triangle: .midpoint() has been renamed to .getMidpoint().');
    return this.getMidpoint(target);
  },
  normal: function normal(target) {
    console.warn('THREE.Triangle: .normal() has been renamed to .getNormal().');
    return this.getNormal(target);
  },
  plane: function plane(target) {
    console.warn('THREE.Triangle: .plane() has been renamed to .getPlane().');
    return this.getPlane(target);
  }
});
Object.assign(_Triangle.Triangle, {
  barycoordFromPoint: function barycoordFromPoint(point, a, b, c, target) {
    console.warn('THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().');
    return _Triangle.Triangle.getBarycoord(point, a, b, c, target);
  },
  normal: function normal(a, b, c, target) {
    console.warn('THREE.Triangle: .normal() has been renamed to .getNormal().');
    return _Triangle.Triangle.getNormal(a, b, c, target);
  }
});
Object.assign(_Shape.Shape.prototype, {
  extractAllPoints: function extractAllPoints(divisions) {
    console.warn('THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead.');
    return this.extractPoints(divisions);
  },
  extrude: function extrude(options) {
    console.warn('THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead.');
    return new _ExtrudeGeometry.ExtrudeGeometry(this, options);
  },
  makeGeometry: function makeGeometry(options) {
    console.warn('THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead.');
    return new _ShapeGeometry.ShapeGeometry(this, options);
  }
});
Object.assign(_Vector.Vector2.prototype, {
  fromAttribute: function fromAttribute(attribute, index, offset) {
    console.warn('THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute().');
    return this.fromBufferAttribute(attribute, index, offset);
  },
  distanceToManhattan: function distanceToManhattan(v) {
    console.warn('THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo().');
    return this.manhattanDistanceTo(v);
  },
  lengthManhattan: function lengthManhattan() {
    console.warn('THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength().');
    return this.manhattanLength();
  }
});
Object.assign(_Vector2.Vector3.prototype, {
  setEulerFromRotationMatrix: function setEulerFromRotationMatrix() {
    console.error('THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.');
  },
  setEulerFromQuaternion: function setEulerFromQuaternion() {
    console.error('THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.');
  },
  getPositionFromMatrix: function getPositionFromMatrix(m) {
    console.warn('THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().');
    return this.setFromMatrixPosition(m);
  },
  getScaleFromMatrix: function getScaleFromMatrix(m) {
    console.warn('THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().');
    return this.setFromMatrixScale(m);
  },
  getColumnFromMatrix: function getColumnFromMatrix(index, matrix) {
    console.warn('THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().');
    return this.setFromMatrixColumn(matrix, index);
  },
  applyProjection: function applyProjection(m) {
    console.warn('THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead.');
    return this.applyMatrix4(m);
  },
  fromAttribute: function fromAttribute(attribute, index, offset) {
    console.warn('THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute().');
    return this.fromBufferAttribute(attribute, index, offset);
  },
  distanceToManhattan: function distanceToManhattan(v) {
    console.warn('THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo().');
    return this.manhattanDistanceTo(v);
  },
  lengthManhattan: function lengthManhattan() {
    console.warn('THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength().');
    return this.manhattanLength();
  }
});
Object.assign(_Vector3.Vector4.prototype, {
  fromAttribute: function fromAttribute(attribute, index, offset) {
    console.warn('THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute().');
    return this.fromBufferAttribute(attribute, index, offset);
  },
  lengthManhattan: function lengthManhattan() {
    console.warn('THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength().');
    return this.manhattanLength();
  }
}); //

Object.assign(_Geometry.Geometry.prototype, {
  computeTangents: function computeTangents() {
    console.error('THREE.Geometry: .computeTangents() has been removed.');
  },
  computeLineDistances: function computeLineDistances() {
    console.error('THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead.');
  }
});
Object.assign(_Object3D.Object3D.prototype, {
  getChildByName: function getChildByName(name) {
    console.warn('THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().');
    return this.getObjectByName(name);
  },
  renderDepth: function renderDepth() {
    console.warn('THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.');
  },
  translate: function translate(distance, axis) {
    console.warn('THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.');
    return this.translateOnAxis(axis, distance);
  },
  getWorldRotation: function getWorldRotation() {
    console.error('THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.');
  }
});
Object.defineProperties(_Object3D.Object3D.prototype, {
  eulerOrder: {
    get: function get() {
      console.warn('THREE.Object3D: .eulerOrder is now .rotation.order.');
      return this.rotation.order;
    },
    set: function set(value) {
      console.warn('THREE.Object3D: .eulerOrder is now .rotation.order.');
      this.rotation.order = value;
    }
  },
  useQuaternion: {
    get: function get() {
      console.warn('THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.');
    },
    set: function set() {
      console.warn('THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.');
    }
  }
});
Object.defineProperties(_LOD.LOD.prototype, {
  objects: {
    get: function get() {
      console.warn('THREE.LOD: .objects has been renamed to .levels.');
      return this.levels;
    }
  }
});
Object.defineProperty(_Skeleton.Skeleton.prototype, 'useVertexTexture', {
  get: function get() {
    console.warn('THREE.Skeleton: useVertexTexture has been removed.');
  },
  set: function set() {
    console.warn('THREE.Skeleton: useVertexTexture has been removed.');
  }
});

_SkinnedMesh.SkinnedMesh.prototype.initBones = function () {
  console.error('THREE.SkinnedMesh: initBones() has been removed.');
};

Object.defineProperty(_Curve.Curve.prototype, '__arcLengthDivisions', {
  get: function get() {
    console.warn('THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.');
    return this.arcLengthDivisions;
  },
  set: function set(value) {
    console.warn('THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.');
    this.arcLengthDivisions = value;
  }
}); //

_PerspectiveCamera.PerspectiveCamera.prototype.setLens = function (focalLength, filmGauge) {
  console.warn("THREE.PerspectiveCamera.setLens is deprecated. " + "Use .setFocalLength and .filmGauge for a photographic setup.");
  if (filmGauge !== undefined) this.filmGauge = filmGauge;
  this.setFocalLength(focalLength);
}; //


Object.defineProperties(_Light.Light.prototype, {
  onlyShadow: {
    set: function set() {
      console.warn('THREE.Light: .onlyShadow has been removed.');
    }
  },
  shadowCameraFov: {
    set: function set(value) {
      console.warn('THREE.Light: .shadowCameraFov is now .shadow.camera.fov.');
      this.shadow.camera.fov = value;
    }
  },
  shadowCameraLeft: {
    set: function set(value) {
      console.warn('THREE.Light: .shadowCameraLeft is now .shadow.camera.left.');
      this.shadow.camera.left = value;
    }
  },
  shadowCameraRight: {
    set: function set(value) {
      console.warn('THREE.Light: .shadowCameraRight is now .shadow.camera.right.');
      this.shadow.camera.right = value;
    }
  },
  shadowCameraTop: {
    set: function set(value) {
      console.warn('THREE.Light: .shadowCameraTop is now .shadow.camera.top.');
      this.shadow.camera.top = value;
    }
  },
  shadowCameraBottom: {
    set: function set(value) {
      console.warn('THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom.');
      this.shadow.camera.bottom = value;
    }
  },
  shadowCameraNear: {
    set: function set(value) {
      console.warn('THREE.Light: .shadowCameraNear is now .shadow.camera.near.');
      this.shadow.camera.near = value;
    }
  },
  shadowCameraFar: {
    set: function set(value) {
      console.warn('THREE.Light: .shadowCameraFar is now .shadow.camera.far.');
      this.shadow.camera.far = value;
    }
  },
  shadowCameraVisible: {
    set: function set() {
      console.warn('THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.');
    }
  },
  shadowBias: {
    set: function set(value) {
      console.warn('THREE.Light: .shadowBias is now .shadow.bias.');
      this.shadow.bias = value;
    }
  },
  shadowDarkness: {
    set: function set() {
      console.warn('THREE.Light: .shadowDarkness has been removed.');
    }
  },
  shadowMapWidth: {
    set: function set(value) {
      console.warn('THREE.Light: .shadowMapWidth is now .shadow.mapSize.width.');
      this.shadow.mapSize.width = value;
    }
  },
  shadowMapHeight: {
    set: function set(value) {
      console.warn('THREE.Light: .shadowMapHeight is now .shadow.mapSize.height.');
      this.shadow.mapSize.height = value;
    }
  }
}); //

Object.defineProperties(_BufferAttribute.BufferAttribute.prototype, {
  length: {
    get: function get() {
      console.warn('THREE.BufferAttribute: .length has been deprecated. Use .count instead.');
      return this.array.length;
    }
  },
  dynamic: {
    get: function get() {
      console.warn('THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead.');
      return this.usage === _constants.DynamicDrawUsage;
    },
    set: function set()
    /* value */
    {
      console.warn('THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead.');
      this.setUsage(_constants.DynamicDrawUsage);
    }
  }
});
Object.assign(_BufferAttribute.BufferAttribute.prototype, {
  setDynamic: function setDynamic(value) {
    console.warn('THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead.');
    this.setUsage(value === true ? _constants.DynamicDrawUsage : _constants.StaticDrawUsage);
    return this;
  },
  copyIndicesArray: function copyIndicesArray()
  /* indices */
  {
    console.error('THREE.BufferAttribute: .copyIndicesArray() has been removed.');
  },
  setArray: function setArray()
  /* array */
  {
    console.error('THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers');
  }
});
Object.assign(_BufferGeometry.BufferGeometry.prototype, {
  addIndex: function addIndex(index) {
    console.warn('THREE.BufferGeometry: .addIndex() has been renamed to .setIndex().');
    this.setIndex(index);
  },
  addAttribute: function addAttribute(name, attribute) {
    console.warn('THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute().');

    if (!(attribute && attribute.isBufferAttribute) && !(attribute && attribute.isInterleavedBufferAttribute)) {
      console.warn('THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).');
      return this.setAttribute(name, new _BufferAttribute.BufferAttribute(arguments[1], arguments[2]));
    }

    if (name === 'index') {
      console.warn('THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute.');
      this.setIndex(attribute);
      return this;
    }

    return this.setAttribute(name, attribute);
  },
  addDrawCall: function addDrawCall(start, count, indexOffset) {
    if (indexOffset !== undefined) {
      console.warn('THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset.');
    }

    console.warn('THREE.BufferGeometry: .addDrawCall() is now .addGroup().');
    this.addGroup(start, count);
  },
  clearDrawCalls: function clearDrawCalls() {
    console.warn('THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups().');
    this.clearGroups();
  },
  computeTangents: function computeTangents() {
    console.warn('THREE.BufferGeometry: .computeTangents() has been removed.');
  },
  computeOffsets: function computeOffsets() {
    console.warn('THREE.BufferGeometry: .computeOffsets() has been removed.');
  },
  removeAttribute: function removeAttribute(name) {
    console.warn('THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute().');
    return this.deleteAttribute(name);
  }
});
Object.defineProperties(_BufferGeometry.BufferGeometry.prototype, {
  drawcalls: {
    get: function get() {
      console.error('THREE.BufferGeometry: .drawcalls has been renamed to .groups.');
      return this.groups;
    }
  },
  offsets: {
    get: function get() {
      console.warn('THREE.BufferGeometry: .offsets has been renamed to .groups.');
      return this.groups;
    }
  }
});
Object.defineProperties(_InterleavedBuffer.InterleavedBuffer.prototype, {
  dynamic: {
    get: function get() {
      console.warn('THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead.');
      return this.usage === _constants.DynamicDrawUsage;
    },
    set: function set(value) {
      console.warn('THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead.');
      this.setUsage(value);
    }
  }
});
Object.assign(_InterleavedBuffer.InterleavedBuffer.prototype, {
  setDynamic: function setDynamic(value) {
    console.warn('THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead.');
    this.setUsage(value === true ? _constants.DynamicDrawUsage : _constants.StaticDrawUsage);
    return this;
  },
  setArray: function setArray()
  /* array */
  {
    console.error('THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers');
  }
}); //

Object.assign(_ExtrudeGeometry.ExtrudeBufferGeometry.prototype, {
  getArrays: function getArrays() {
    console.error('THREE.ExtrudeBufferGeometry: .getArrays() has been removed.');
  },
  addShapeList: function addShapeList() {
    console.error('THREE.ExtrudeBufferGeometry: .addShapeList() has been removed.');
  },
  addShape: function addShape() {
    console.error('THREE.ExtrudeBufferGeometry: .addShape() has been removed.');
  }
}); //

Object.defineProperties(_Uniform.Uniform.prototype, {
  dynamic: {
    set: function set() {
      console.warn('THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.');
    }
  },
  onUpdate: {
    value: function value() {
      console.warn('THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead.');
      return this;
    }
  }
}); //

Object.defineProperties(_Material.Material.prototype, {
  wrapAround: {
    get: function get() {
      console.warn('THREE.Material: .wrapAround has been removed.');
    },
    set: function set() {
      console.warn('THREE.Material: .wrapAround has been removed.');
    }
  },
  overdraw: {
    get: function get() {
      console.warn('THREE.Material: .overdraw has been removed.');
    },
    set: function set() {
      console.warn('THREE.Material: .overdraw has been removed.');
    }
  },
  wrapRGB: {
    get: function get() {
      console.warn('THREE.Material: .wrapRGB has been removed.');
      return new _Color.Color();
    }
  },
  shading: {
    get: function get() {
      console.error('THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
    },
    set: function set(value) {
      console.warn('THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
      this.flatShading = value === _constants.FlatShading;
    }
  },
  stencilMask: {
    get: function get() {
      console.warn('THREE.' + this.type + ': .stencilMask has been removed. Use .stencilFuncMask instead.');
      return this.stencilFuncMask;
    },
    set: function set(value) {
      console.warn('THREE.' + this.type + ': .stencilMask has been removed. Use .stencilFuncMask instead.');
      this.stencilFuncMask = value;
    }
  }
});
Object.defineProperties(_MeshPhongMaterial.MeshPhongMaterial.prototype, {
  metal: {
    get: function get() {
      console.warn('THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead.');
      return false;
    },
    set: function set() {
      console.warn('THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead');
    }
  }
});
Object.defineProperties(_ShaderMaterial.ShaderMaterial.prototype, {
  derivatives: {
    get: function get() {
      console.warn('THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives.');
      return this.extensions.derivatives;
    },
    set: function set(value) {
      console.warn('THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives.');
      this.extensions.derivatives = value;
    }
  }
}); //

Object.assign(_WebGLRenderer.WebGLRenderer.prototype, {
  clearTarget: function clearTarget(renderTarget, color, depth, stencil) {
    console.warn('THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead.');
    this.setRenderTarget(renderTarget);
    this.clear(color, depth, stencil);
  },
  animate: function animate(callback) {
    console.warn('THREE.WebGLRenderer: .animate() is now .setAnimationLoop().');
    this.setAnimationLoop(callback);
  },
  getCurrentRenderTarget: function getCurrentRenderTarget() {
    console.warn('THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget().');
    return this.getRenderTarget();
  },
  getMaxAnisotropy: function getMaxAnisotropy() {
    console.warn('THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy().');
    return this.capabilities.getMaxAnisotropy();
  },
  getPrecision: function getPrecision() {
    console.warn('THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision.');
    return this.capabilities.precision;
  },
  resetGLState: function resetGLState() {
    console.warn('THREE.WebGLRenderer: .resetGLState() is now .state.reset().');
    return this.state.reset();
  },
  supportsFloatTextures: function supportsFloatTextures() {
    console.warn('THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( \'OES_texture_float\' ).');
    return this.extensions.get('OES_texture_float');
  },
  supportsHalfFloatTextures: function supportsHalfFloatTextures() {
    console.warn('THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( \'OES_texture_half_float\' ).');
    return this.extensions.get('OES_texture_half_float');
  },
  supportsStandardDerivatives: function supportsStandardDerivatives() {
    console.warn('THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( \'OES_standard_derivatives\' ).');
    return this.extensions.get('OES_standard_derivatives');
  },
  supportsCompressedTextureS3TC: function supportsCompressedTextureS3TC() {
    console.warn('THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( \'WEBGL_compressed_texture_s3tc\' ).');
    return this.extensions.get('WEBGL_compressed_texture_s3tc');
  },
  supportsCompressedTexturePVRTC: function supportsCompressedTexturePVRTC() {
    console.warn('THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( \'WEBGL_compressed_texture_pvrtc\' ).');
    return this.extensions.get('WEBGL_compressed_texture_pvrtc');
  },
  supportsBlendMinMax: function supportsBlendMinMax() {
    console.warn('THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( \'EXT_blend_minmax\' ).');
    return this.extensions.get('EXT_blend_minmax');
  },
  supportsVertexTextures: function supportsVertexTextures() {
    console.warn('THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures.');
    return this.capabilities.vertexTextures;
  },
  supportsInstancedArrays: function supportsInstancedArrays() {
    console.warn('THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( \'ANGLE_instanced_arrays\' ).');
    return this.extensions.get('ANGLE_instanced_arrays');
  },
  enableScissorTest: function enableScissorTest(_boolean) {
    console.warn('THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest().');
    this.setScissorTest(_boolean);
  },
  initMaterial: function initMaterial() {
    console.warn('THREE.WebGLRenderer: .initMaterial() has been removed.');
  },
  addPrePlugin: function addPrePlugin() {
    console.warn('THREE.WebGLRenderer: .addPrePlugin() has been removed.');
  },
  addPostPlugin: function addPostPlugin() {
    console.warn('THREE.WebGLRenderer: .addPostPlugin() has been removed.');
  },
  updateShadowMap: function updateShadowMap() {
    console.warn('THREE.WebGLRenderer: .updateShadowMap() has been removed.');
  },
  setFaceCulling: function setFaceCulling() {
    console.warn('THREE.WebGLRenderer: .setFaceCulling() has been removed.');
  },
  allocTextureUnit: function allocTextureUnit() {
    console.warn('THREE.WebGLRenderer: .allocTextureUnit() has been removed.');
  },
  setTexture: function setTexture() {
    console.warn('THREE.WebGLRenderer: .setTexture() has been removed.');
  },
  setTexture2D: function setTexture2D() {
    console.warn('THREE.WebGLRenderer: .setTexture2D() has been removed.');
  },
  setTextureCube: function setTextureCube() {
    console.warn('THREE.WebGLRenderer: .setTextureCube() has been removed.');
  },
  getActiveMipMapLevel: function getActiveMipMapLevel() {
    console.warn('THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel().');
    return this.getActiveMipmapLevel();
  }
});
Object.defineProperties(_WebGLRenderer.WebGLRenderer.prototype, {
  shadowMapEnabled: {
    get: function get() {
      return this.shadowMap.enabled;
    },
    set: function set(value) {
      console.warn('THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled.');
      this.shadowMap.enabled = value;
    }
  },
  shadowMapType: {
    get: function get() {
      return this.shadowMap.type;
    },
    set: function set(value) {
      console.warn('THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type.');
      this.shadowMap.type = value;
    }
  },
  shadowMapCullFace: {
    get: function get() {
      console.warn('THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.');
      return undefined;
    },
    set: function set()
    /* value */
    {
      console.warn('THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.');
    }
  },
  context: {
    get: function get() {
      console.warn('THREE.WebGLRenderer: .context has been removed. Use .getContext() instead.');
      return this.getContext();
    }
  }
});
Object.defineProperties(_WebGLShadowMap.WebGLShadowMap.prototype, {
  cullFace: {
    get: function get() {
      console.warn('THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.');
      return undefined;
    },
    set: function set()
    /* cullFace */
    {
      console.warn('THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.');
    }
  },
  renderReverseSided: {
    get: function get() {
      console.warn('THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.');
      return undefined;
    },
    set: function set() {
      console.warn('THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.');
    }
  },
  renderSingleSided: {
    get: function get() {
      console.warn('THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.');
      return undefined;
    },
    set: function set() {
      console.warn('THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.');
    }
  }
}); //

Object.defineProperties(_WebGLRenderTargetCube.WebGLRenderTargetCube.prototype, {
  activeCubeFace: {
    set: function set()
    /* value */
    {
      console.warn('THREE.WebGLRenderTargetCube: .activeCubeFace has been removed. It is now the second parameter of WebGLRenderer.setRenderTarget().');
    }
  },
  activeMipMapLevel: {
    set: function set()
    /* value */
    {
      console.warn('THREE.WebGLRenderTargetCube: .activeMipMapLevel has been removed. It is now the third parameter of WebGLRenderer.setRenderTarget().');
    }
  }
}); //

Object.defineProperties(_WebGLRenderTarget.WebGLRenderTarget.prototype, {
  wrapS: {
    get: function get() {
      console.warn('THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.');
      return this.texture.wrapS;
    },
    set: function set(value) {
      console.warn('THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.');
      this.texture.wrapS = value;
    }
  },
  wrapT: {
    get: function get() {
      console.warn('THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.');
      return this.texture.wrapT;
    },
    set: function set(value) {
      console.warn('THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.');
      this.texture.wrapT = value;
    }
  },
  magFilter: {
    get: function get() {
      console.warn('THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.');
      return this.texture.magFilter;
    },
    set: function set(value) {
      console.warn('THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.');
      this.texture.magFilter = value;
    }
  },
  minFilter: {
    get: function get() {
      console.warn('THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.');
      return this.texture.minFilter;
    },
    set: function set(value) {
      console.warn('THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.');
      this.texture.minFilter = value;
    }
  },
  anisotropy: {
    get: function get() {
      console.warn('THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.');
      return this.texture.anisotropy;
    },
    set: function set(value) {
      console.warn('THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.');
      this.texture.anisotropy = value;
    }
  },
  offset: {
    get: function get() {
      console.warn('THREE.WebGLRenderTarget: .offset is now .texture.offset.');
      return this.texture.offset;
    },
    set: function set(value) {
      console.warn('THREE.WebGLRenderTarget: .offset is now .texture.offset.');
      this.texture.offset = value;
    }
  },
  repeat: {
    get: function get() {
      console.warn('THREE.WebGLRenderTarget: .repeat is now .texture.repeat.');
      return this.texture.repeat;
    },
    set: function set(value) {
      console.warn('THREE.WebGLRenderTarget: .repeat is now .texture.repeat.');
      this.texture.repeat = value;
    }
  },
  format: {
    get: function get() {
      console.warn('THREE.WebGLRenderTarget: .format is now .texture.format.');
      return this.texture.format;
    },
    set: function set(value) {
      console.warn('THREE.WebGLRenderTarget: .format is now .texture.format.');
      this.texture.format = value;
    }
  },
  type: {
    get: function get() {
      console.warn('THREE.WebGLRenderTarget: .type is now .texture.type.');
      return this.texture.type;
    },
    set: function set(value) {
      console.warn('THREE.WebGLRenderTarget: .type is now .texture.type.');
      this.texture.type = value;
    }
  },
  generateMipmaps: {
    get: function get() {
      console.warn('THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.');
      return this.texture.generateMipmaps;
    },
    set: function set(value) {
      console.warn('THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.');
      this.texture.generateMipmaps = value;
    }
  }
}); //

Object.defineProperties(_WebVRManager.WebVRManager.prototype, {
  standing: {
    set: function set()
    /* value */
    {
      console.warn('THREE.WebVRManager: .standing has been removed.');
    }
  },
  userHeight: {
    set: function set()
    /* value */
    {
      console.warn('THREE.WebVRManager: .userHeight has been removed.');
    }
  }
}); //

Object.defineProperties(_Audio.Audio.prototype, {
  load: {
    value: function value(file) {
      console.warn('THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.');
      var scope = this;
      var audioLoader = new _AudioLoader.AudioLoader();
      audioLoader.load(file, function (buffer) {
        scope.setBuffer(buffer);
      });
      return this;
    }
  },
  startTime: {
    set: function set() {
      console.warn('THREE.Audio: .startTime is now .play( delay ).');
    }
  }
});

_AudioAnalyser.AudioAnalyser.prototype.getData = function () {
  console.warn('THREE.AudioAnalyser: .getData() is now .getFrequencyData().');
  return this.getFrequencyData();
}; //


_CubeCamera.CubeCamera.prototype.updateCubeMap = function (renderer, scene) {
  console.warn('THREE.CubeCamera: .updateCubeMap() is now .update().');
  return this.update(renderer, scene);
}; //


var GeometryUtils = {
  merge: function merge(geometry1, geometry2, materialIndexOffset) {
    console.warn('THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.');
    var matrix;

    if (geometry2.isMesh) {
      geometry2.matrixAutoUpdate && geometry2.updateMatrix();
      matrix = geometry2.matrix;
      geometry2 = geometry2.geometry;
    }

    geometry1.merge(geometry2, matrix, materialIndexOffset);
  },
  center: function center(geometry) {
    console.warn('THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.');
    return geometry.center();
  }
};
exports.GeometryUtils = GeometryUtils;
_ImageUtils.ImageUtils.crossOrigin = undefined;

_ImageUtils.ImageUtils.loadTexture = function (url, mapping, onLoad, onError) {
  console.warn('THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.');
  var loader = new _TextureLoader.TextureLoader();
  loader.setCrossOrigin(this.crossOrigin);
  var texture = loader.load(url, onLoad, undefined, onError);
  if (mapping) texture.mapping = mapping;
  return texture;
};

_ImageUtils.ImageUtils.loadTextureCube = function (urls, mapping, onLoad, onError) {
  console.warn('THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.');
  var loader = new _CubeTextureLoader.CubeTextureLoader();
  loader.setCrossOrigin(this.crossOrigin);
  var texture = loader.load(urls, onLoad, undefined, onError);
  if (mapping) texture.mapping = mapping;
  return texture;
};

_ImageUtils.ImageUtils.loadCompressedTexture = function () {
  console.error('THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.');
};

_ImageUtils.ImageUtils.loadCompressedTextureCube = function () {
  console.error('THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.');
}; //


function CanvasRenderer() {
  console.error('THREE.CanvasRenderer has been removed');
} //


function JSONLoader() {
  console.error('THREE.JSONLoader has been removed.');
} //


var SceneUtils = {
  createMultiMaterialObject: function createMultiMaterialObject()
  /* geometry, materials */
  {
    console.error('THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js');
  },
  detach: function detach()
  /* child, parent, scene */
  {
    console.error('THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js');
  },
  attach: function attach()
  /* child, scene, parent */
  {
    console.error('THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js');
  }
}; //

exports.SceneUtils = SceneUtils;

function LensFlare() {
  console.error('THREE.LensFlare has been moved to /examples/js/objects/Lensflare.js');
}