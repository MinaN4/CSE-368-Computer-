"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointLightHelper = PointLightHelper;

var _Mesh = require("../objects/Mesh.js");

var _MeshBasicMaterial = require("../materials/MeshBasicMaterial.js");

var _SphereGeometry = require("../geometries/SphereGeometry.js");

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
function PointLightHelper(light, sphereSize, color) {
  this.light = light;
  this.light.updateMatrixWorld();
  this.color = color;
  var geometry = new _SphereGeometry.SphereBufferGeometry(sphereSize, 4, 2);
  var material = new _MeshBasicMaterial.MeshBasicMaterial({
    wireframe: true,
    fog: false
  });

  _Mesh.Mesh.call(this, geometry, material);

  this.matrix = this.light.matrixWorld;
  this.matrixAutoUpdate = false;
  this.update();
  /*
  var distanceGeometry = new THREE.IcosahedronBufferGeometry( 1, 2 );
  var distanceMaterial = new THREE.MeshBasicMaterial( { color: hexColor, fog: false, wireframe: true, opacity: 0.1, transparent: true } );
  	this.lightSphere = new THREE.Mesh( bulbGeometry, bulbMaterial );
  this.lightDistance = new THREE.Mesh( distanceGeometry, distanceMaterial );
  	var d = light.distance;
  	if ( d === 0.0 ) {
  		this.lightDistance.visible = false;
  	} else {
  		this.lightDistance.scale.set( d, d, d );
  	}
  	this.add( this.lightDistance );
  */
}

PointLightHelper.prototype = Object.create(_Mesh.Mesh.prototype);
PointLightHelper.prototype.constructor = PointLightHelper;

PointLightHelper.prototype.dispose = function () {
  this.geometry.dispose();
  this.material.dispose();
};

PointLightHelper.prototype.update = function () {
  if (this.color !== undefined) {
    this.material.color.set(this.color);
  } else {
    this.material.color.copy(this.light.color);
  }
  /*
  var d = this.light.distance;
  	if ( d === 0.0 ) {
  		this.lightDistance.visible = false;
  	} else {
  		this.lightDistance.visible = true;
  	this.lightDistance.scale.set( d, d, d );
  	}
  */

};