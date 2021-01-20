"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxBufferGeometry = exports.BoxGeometry = void 0;

var _Geometry2 = require("../core/Geometry.js");

var _BufferGeometry2 = require("../core/BufferGeometry.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _Vector = require("../math/Vector3.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// BoxGeometry
var BoxGeometry =
/*#__PURE__*/
function (_Geometry) {
  _inherits(BoxGeometry, _Geometry);

  function BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
    var _this;

    _classCallCheck(this, BoxGeometry);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BoxGeometry).call(this));
    _this.type = 'BoxGeometry';
    _this.parameters = {
      width: width,
      height: height,
      depth: depth,
      widthSegments: widthSegments,
      heightSegments: heightSegments,
      depthSegments: depthSegments
    };

    _this.fromBufferGeometry(new BoxBufferGeometry(width, height, depth, widthSegments, heightSegments, depthSegments));

    _this.mergeVertices();

    return _this;
  }

  return BoxGeometry;
}(_Geometry2.Geometry); // BoxBufferGeometry


exports.BoxGeometry = BoxGeometry;

var BoxBufferGeometry =
/*#__PURE__*/
function (_BufferGeometry) {
  _inherits(BoxBufferGeometry, _BufferGeometry);

  function BoxBufferGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
    var _this2;

    _classCallCheck(this, BoxBufferGeometry);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(BoxBufferGeometry).call(this));
    _this2.type = 'BoxBufferGeometry';
    _this2.parameters = {
      width: width,
      height: height,
      depth: depth,
      widthSegments: widthSegments,
      heightSegments: heightSegments,
      depthSegments: depthSegments
    };

    var scope = _assertThisInitialized(_this2);

    width = width || 1;
    height = height || 1;
    depth = depth || 1; // segments

    widthSegments = Math.floor(widthSegments) || 1;
    heightSegments = Math.floor(heightSegments) || 1;
    depthSegments = Math.floor(depthSegments) || 1; // buffers

    var indices = [];
    var vertices = [];
    var normals = [];
    var uvs = []; // helper variables

    var numberOfVertices = 0;
    var groupStart = 0; // build each side of the box geometry

    buildPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0); // px

    buildPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1); // nx

    buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py

    buildPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3); // ny

    buildPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4); // pz

    buildPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5); // nz
    // build geometry

    _this2.setIndex(indices);

    _this2.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(vertices, 3));

    _this2.setAttribute('normal', new _BufferAttribute.Float32BufferAttribute(normals, 3));

    _this2.setAttribute('uv', new _BufferAttribute.Float32BufferAttribute(uvs, 2));

    function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
      var segmentWidth = width / gridX;
      var segmentHeight = height / gridY;
      var widthHalf = width / 2;
      var heightHalf = height / 2;
      var depthHalf = depth / 2;
      var gridX1 = gridX + 1;
      var gridY1 = gridY + 1;
      var vertexCounter = 0;
      var groupCount = 0;
      var ix, iy;
      var vector = new _Vector.Vector3(); // generate vertices, normals and uvs

      for (iy = 0; iy < gridY1; iy++) {
        var y = iy * segmentHeight - heightHalf;

        for (ix = 0; ix < gridX1; ix++) {
          var x = ix * segmentWidth - widthHalf; // set values to correct vector component

          vector[u] = x * udir;
          vector[v] = y * vdir;
          vector[w] = depthHalf; // now apply vector to vertex buffer

          vertices.push(vector.x, vector.y, vector.z); // set values to correct vector component

          vector[u] = 0;
          vector[v] = 0;
          vector[w] = depth > 0 ? 1 : -1; // now apply vector to normal buffer

          normals.push(vector.x, vector.y, vector.z); // uvs

          uvs.push(ix / gridX);
          uvs.push(1 - iy / gridY); // counters

          vertexCounter += 1;
        }
      } // indices
      // 1. you need three indices to draw a single face
      // 2. a single segment consists of two faces
      // 3. so we need to generate six (2*3) indices per segment


      for (iy = 0; iy < gridY; iy++) {
        for (ix = 0; ix < gridX; ix++) {
          var a = numberOfVertices + ix + gridX1 * iy;
          var b = numberOfVertices + ix + gridX1 * (iy + 1);
          var c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
          var d = numberOfVertices + (ix + 1) + gridX1 * iy; // faces

          indices.push(a, b, d);
          indices.push(b, c, d); // increase counter

          groupCount += 6;
        }
      } // add a group to the geometry. this will ensure multi material support


      scope.addGroup(groupStart, groupCount, materialIndex); // calculate new start value for groups

      groupStart += groupCount; // update total number of vertices

      numberOfVertices += vertexCounter;
    }

    return _this2;
  }

  return BoxBufferGeometry;
}(_BufferGeometry2.BufferGeometry);

exports.BoxBufferGeometry = BoxBufferGeometry;