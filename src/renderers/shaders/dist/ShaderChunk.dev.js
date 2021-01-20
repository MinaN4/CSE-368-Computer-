"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShaderChunk = void 0;

var _alphamap_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/alphamap_fragment.glsl.js"));

var _alphamap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/alphamap_pars_fragment.glsl.js"));

var _alphatest_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/alphatest_fragment.glsl.js"));

var _aomap_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/aomap_fragment.glsl.js"));

var _aomap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/aomap_pars_fragment.glsl.js"));

var _begin_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/begin_vertex.glsl.js"));

var _beginnormal_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/beginnormal_vertex.glsl.js"));

var _bsdfsGlsl = _interopRequireDefault(require("./ShaderChunk/bsdfs.glsl.js"));

var _bumpmap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/bumpmap_pars_fragment.glsl.js"));

var _clipping_planes_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/clipping_planes_fragment.glsl.js"));

var _clipping_planes_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/clipping_planes_pars_fragment.glsl.js"));

var _clipping_planes_pars_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/clipping_planes_pars_vertex.glsl.js"));

var _clipping_planes_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/clipping_planes_vertex.glsl.js"));

var _color_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/color_fragment.glsl.js"));

var _color_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/color_pars_fragment.glsl.js"));

var _color_pars_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/color_pars_vertex.glsl.js"));

var _color_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/color_vertex.glsl.js"));

var _commonGlsl = _interopRequireDefault(require("./ShaderChunk/common.glsl.js"));

var _cube_uv_reflection_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/cube_uv_reflection_fragment.glsl.js"));

var _defaultnormal_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/defaultnormal_vertex.glsl.js"));

var _displacementmap_pars_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/displacementmap_pars_vertex.glsl.js"));

var _displacementmap_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/displacementmap_vertex.glsl.js"));

var _emissivemap_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/emissivemap_fragment.glsl.js"));

var _emissivemap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/emissivemap_pars_fragment.glsl.js"));

var _encodings_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/encodings_fragment.glsl.js"));

var _encodings_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/encodings_pars_fragment.glsl.js"));

var _envmap_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/envmap_fragment.glsl.js"));

var _envmap_common_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/envmap_common_pars_fragment.glsl.js"));

var _envmap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/envmap_pars_fragment.glsl.js"));

var _envmap_pars_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/envmap_pars_vertex.glsl.js"));

var _envmap_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/envmap_vertex.glsl.js"));

var _fog_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/fog_vertex.glsl.js"));

var _fog_pars_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/fog_pars_vertex.glsl.js"));

var _fog_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/fog_fragment.glsl.js"));

var _fog_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/fog_pars_fragment.glsl.js"));

var _gradientmap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/gradientmap_pars_fragment.glsl.js"));

var _lightmap_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/lightmap_fragment.glsl.js"));

var _lightmap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/lightmap_pars_fragment.glsl.js"));

var _lights_lambert_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/lights_lambert_vertex.glsl.js"));

var _lights_pars_beginGlsl = _interopRequireDefault(require("./ShaderChunk/lights_pars_begin.glsl.js"));

var _envmap_physical_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/envmap_physical_pars_fragment.glsl.js"));

var _lights_phong_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/lights_phong_fragment.glsl.js"));

var _lights_phong_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/lights_phong_pars_fragment.glsl.js"));

var _lights_physical_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/lights_physical_fragment.glsl.js"));

var _lights_physical_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/lights_physical_pars_fragment.glsl.js"));

var _lights_fragment_beginGlsl = _interopRequireDefault(require("./ShaderChunk/lights_fragment_begin.glsl.js"));

var _lights_fragment_mapsGlsl = _interopRequireDefault(require("./ShaderChunk/lights_fragment_maps.glsl.js"));

var _lights_fragment_endGlsl = _interopRequireDefault(require("./ShaderChunk/lights_fragment_end.glsl.js"));

var _logdepthbuf_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/logdepthbuf_fragment.glsl.js"));

var _logdepthbuf_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/logdepthbuf_pars_fragment.glsl.js"));

var _logdepthbuf_pars_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/logdepthbuf_pars_vertex.glsl.js"));

var _logdepthbuf_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/logdepthbuf_vertex.glsl.js"));

var _map_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/map_fragment.glsl.js"));

var _map_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/map_pars_fragment.glsl.js"));

var _map_particle_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/map_particle_fragment.glsl.js"));

var _map_particle_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/map_particle_pars_fragment.glsl.js"));

var _metalnessmap_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/metalnessmap_fragment.glsl.js"));

var _metalnessmap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/metalnessmap_pars_fragment.glsl.js"));

var _morphnormal_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/morphnormal_vertex.glsl.js"));

var _morphtarget_pars_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/morphtarget_pars_vertex.glsl.js"));

var _morphtarget_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/morphtarget_vertex.glsl.js"));

var _normal_fragment_beginGlsl = _interopRequireDefault(require("./ShaderChunk/normal_fragment_begin.glsl.js"));

var _normal_fragment_mapsGlsl = _interopRequireDefault(require("./ShaderChunk/normal_fragment_maps.glsl.js"));

var _normalmap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/normalmap_pars_fragment.glsl.js"));

var _clearcoat_normal_fragment_beginGlsl = _interopRequireDefault(require("./ShaderChunk/clearcoat_normal_fragment_begin.glsl.js"));

var _clearcoat_normal_fragment_mapsGlsl = _interopRequireDefault(require("./ShaderChunk/clearcoat_normal_fragment_maps.glsl.js"));

var _clearcoat_normalmap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/clearcoat_normalmap_pars_fragment.glsl.js"));

var _packingGlsl = _interopRequireDefault(require("./ShaderChunk/packing.glsl.js"));

var _premultiplied_alpha_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/premultiplied_alpha_fragment.glsl.js"));

var _project_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/project_vertex.glsl.js"));

var _dithering_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/dithering_fragment.glsl.js"));

var _dithering_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/dithering_pars_fragment.glsl.js"));

var _roughnessmap_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/roughnessmap_fragment.glsl.js"));

var _roughnessmap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/roughnessmap_pars_fragment.glsl.js"));

var _shadowmap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/shadowmap_pars_fragment.glsl.js"));

var _shadowmap_pars_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/shadowmap_pars_vertex.glsl.js"));

var _shadowmap_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/shadowmap_vertex.glsl.js"));

var _shadowmask_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/shadowmask_pars_fragment.glsl.js"));

var _skinbase_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/skinbase_vertex.glsl.js"));

var _skinning_pars_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/skinning_pars_vertex.glsl.js"));

var _skinning_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/skinning_vertex.glsl.js"));

var _skinnormal_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/skinnormal_vertex.glsl.js"));

var _specularmap_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/specularmap_fragment.glsl.js"));

var _specularmap_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/specularmap_pars_fragment.glsl.js"));

var _tonemapping_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/tonemapping_fragment.glsl.js"));

var _tonemapping_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/tonemapping_pars_fragment.glsl.js"));

var _uv_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/uv_pars_fragment.glsl.js"));

var _uv_pars_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/uv_pars_vertex.glsl.js"));

var _uv_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/uv_vertex.glsl.js"));

var _uv2_pars_fragmentGlsl = _interopRequireDefault(require("./ShaderChunk/uv2_pars_fragment.glsl.js"));

var _uv2_pars_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/uv2_pars_vertex.glsl.js"));

var _uv2_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/uv2_vertex.glsl.js"));

var _worldpos_vertexGlsl = _interopRequireDefault(require("./ShaderChunk/worldpos_vertex.glsl.js"));

var _background_fragGlsl = _interopRequireDefault(require("./ShaderLib/background_frag.glsl.js"));

var _background_vertGlsl = _interopRequireDefault(require("./ShaderLib/background_vert.glsl.js"));

var _cube_fragGlsl = _interopRequireDefault(require("./ShaderLib/cube_frag.glsl.js"));

var _cube_vertGlsl = _interopRequireDefault(require("./ShaderLib/cube_vert.glsl.js"));

var _depth_fragGlsl = _interopRequireDefault(require("./ShaderLib/depth_frag.glsl.js"));

var _depth_vertGlsl = _interopRequireDefault(require("./ShaderLib/depth_vert.glsl.js"));

var _distanceRGBA_fragGlsl = _interopRequireDefault(require("./ShaderLib/distanceRGBA_frag.glsl.js"));

var _distanceRGBA_vertGlsl = _interopRequireDefault(require("./ShaderLib/distanceRGBA_vert.glsl.js"));

var _equirect_fragGlsl = _interopRequireDefault(require("./ShaderLib/equirect_frag.glsl.js"));

var _equirect_vertGlsl = _interopRequireDefault(require("./ShaderLib/equirect_vert.glsl.js"));

var _linedashed_fragGlsl = _interopRequireDefault(require("./ShaderLib/linedashed_frag.glsl.js"));

var _linedashed_vertGlsl = _interopRequireDefault(require("./ShaderLib/linedashed_vert.glsl.js"));

var _meshbasic_fragGlsl = _interopRequireDefault(require("./ShaderLib/meshbasic_frag.glsl.js"));

var _meshbasic_vertGlsl = _interopRequireDefault(require("./ShaderLib/meshbasic_vert.glsl.js"));

var _meshlambert_fragGlsl = _interopRequireDefault(require("./ShaderLib/meshlambert_frag.glsl.js"));

var _meshlambert_vertGlsl = _interopRequireDefault(require("./ShaderLib/meshlambert_vert.glsl.js"));

var _meshmatcap_fragGlsl = _interopRequireDefault(require("./ShaderLib/meshmatcap_frag.glsl.js"));

var _meshmatcap_vertGlsl = _interopRequireDefault(require("./ShaderLib/meshmatcap_vert.glsl.js"));

var _meshphong_fragGlsl = _interopRequireDefault(require("./ShaderLib/meshphong_frag.glsl.js"));

var _meshphong_vertGlsl = _interopRequireDefault(require("./ShaderLib/meshphong_vert.glsl.js"));

var _meshphysical_fragGlsl = _interopRequireDefault(require("./ShaderLib/meshphysical_frag.glsl.js"));

var _meshphysical_vertGlsl = _interopRequireDefault(require("./ShaderLib/meshphysical_vert.glsl.js"));

var _normal_fragGlsl = _interopRequireDefault(require("./ShaderLib/normal_frag.glsl.js"));

var _normal_vertGlsl = _interopRequireDefault(require("./ShaderLib/normal_vert.glsl.js"));

var _points_fragGlsl = _interopRequireDefault(require("./ShaderLib/points_frag.glsl.js"));

var _points_vertGlsl = _interopRequireDefault(require("./ShaderLib/points_vert.glsl.js"));

var _shadow_fragGlsl = _interopRequireDefault(require("./ShaderLib/shadow_frag.glsl.js"));

var _shadow_vertGlsl = _interopRequireDefault(require("./ShaderLib/shadow_vert.glsl.js"));

var _sprite_fragGlsl = _interopRequireDefault(require("./ShaderLib/sprite_frag.glsl.js"));

var _sprite_vertGlsl = _interopRequireDefault(require("./ShaderLib/sprite_vert.glsl.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ShaderChunk = {
  alphamap_fragment: _alphamap_fragmentGlsl["default"],
  alphamap_pars_fragment: _alphamap_pars_fragmentGlsl["default"],
  alphatest_fragment: _alphatest_fragmentGlsl["default"],
  aomap_fragment: _aomap_fragmentGlsl["default"],
  aomap_pars_fragment: _aomap_pars_fragmentGlsl["default"],
  begin_vertex: _begin_vertexGlsl["default"],
  beginnormal_vertex: _beginnormal_vertexGlsl["default"],
  bsdfs: _bsdfsGlsl["default"],
  bumpmap_pars_fragment: _bumpmap_pars_fragmentGlsl["default"],
  clipping_planes_fragment: _clipping_planes_fragmentGlsl["default"],
  clipping_planes_pars_fragment: _clipping_planes_pars_fragmentGlsl["default"],
  clipping_planes_pars_vertex: _clipping_planes_pars_vertexGlsl["default"],
  clipping_planes_vertex: _clipping_planes_vertexGlsl["default"],
  color_fragment: _color_fragmentGlsl["default"],
  color_pars_fragment: _color_pars_fragmentGlsl["default"],
  color_pars_vertex: _color_pars_vertexGlsl["default"],
  color_vertex: _color_vertexGlsl["default"],
  common: _commonGlsl["default"],
  cube_uv_reflection_fragment: _cube_uv_reflection_fragmentGlsl["default"],
  defaultnormal_vertex: _defaultnormal_vertexGlsl["default"],
  displacementmap_pars_vertex: _displacementmap_pars_vertexGlsl["default"],
  displacementmap_vertex: _displacementmap_vertexGlsl["default"],
  emissivemap_fragment: _emissivemap_fragmentGlsl["default"],
  emissivemap_pars_fragment: _emissivemap_pars_fragmentGlsl["default"],
  encodings_fragment: _encodings_fragmentGlsl["default"],
  encodings_pars_fragment: _encodings_pars_fragmentGlsl["default"],
  envmap_fragment: _envmap_fragmentGlsl["default"],
  envmap_common_pars_fragment: _envmap_common_pars_fragmentGlsl["default"],
  envmap_pars_fragment: _envmap_pars_fragmentGlsl["default"],
  envmap_pars_vertex: _envmap_pars_vertexGlsl["default"],
  envmap_physical_pars_fragment: _envmap_physical_pars_fragmentGlsl["default"],
  envmap_vertex: _envmap_vertexGlsl["default"],
  fog_vertex: _fog_vertexGlsl["default"],
  fog_pars_vertex: _fog_pars_vertexGlsl["default"],
  fog_fragment: _fog_fragmentGlsl["default"],
  fog_pars_fragment: _fog_pars_fragmentGlsl["default"],
  gradientmap_pars_fragment: _gradientmap_pars_fragmentGlsl["default"],
  lightmap_fragment: _lightmap_fragmentGlsl["default"],
  lightmap_pars_fragment: _lightmap_pars_fragmentGlsl["default"],
  lights_lambert_vertex: _lights_lambert_vertexGlsl["default"],
  lights_pars_begin: _lights_pars_beginGlsl["default"],
  lights_phong_fragment: _lights_phong_fragmentGlsl["default"],
  lights_phong_pars_fragment: _lights_phong_pars_fragmentGlsl["default"],
  lights_physical_fragment: _lights_physical_fragmentGlsl["default"],
  lights_physical_pars_fragment: _lights_physical_pars_fragmentGlsl["default"],
  lights_fragment_begin: _lights_fragment_beginGlsl["default"],
  lights_fragment_maps: _lights_fragment_mapsGlsl["default"],
  lights_fragment_end: _lights_fragment_endGlsl["default"],
  logdepthbuf_fragment: _logdepthbuf_fragmentGlsl["default"],
  logdepthbuf_pars_fragment: _logdepthbuf_pars_fragmentGlsl["default"],
  logdepthbuf_pars_vertex: _logdepthbuf_pars_vertexGlsl["default"],
  logdepthbuf_vertex: _logdepthbuf_vertexGlsl["default"],
  map_fragment: _map_fragmentGlsl["default"],
  map_pars_fragment: _map_pars_fragmentGlsl["default"],
  map_particle_fragment: _map_particle_fragmentGlsl["default"],
  map_particle_pars_fragment: _map_particle_pars_fragmentGlsl["default"],
  metalnessmap_fragment: _metalnessmap_fragmentGlsl["default"],
  metalnessmap_pars_fragment: _metalnessmap_pars_fragmentGlsl["default"],
  morphnormal_vertex: _morphnormal_vertexGlsl["default"],
  morphtarget_pars_vertex: _morphtarget_pars_vertexGlsl["default"],
  morphtarget_vertex: _morphtarget_vertexGlsl["default"],
  normal_fragment_begin: _normal_fragment_beginGlsl["default"],
  normal_fragment_maps: _normal_fragment_mapsGlsl["default"],
  normalmap_pars_fragment: _normalmap_pars_fragmentGlsl["default"],
  clearcoat_normal_fragment_begin: _clearcoat_normal_fragment_beginGlsl["default"],
  clearcoat_normal_fragment_maps: _clearcoat_normal_fragment_mapsGlsl["default"],
  clearcoat_normalmap_pars_fragment: _clearcoat_normalmap_pars_fragmentGlsl["default"],
  packing: _packingGlsl["default"],
  premultiplied_alpha_fragment: _premultiplied_alpha_fragmentGlsl["default"],
  project_vertex: _project_vertexGlsl["default"],
  dithering_fragment: _dithering_fragmentGlsl["default"],
  dithering_pars_fragment: _dithering_pars_fragmentGlsl["default"],
  roughnessmap_fragment: _roughnessmap_fragmentGlsl["default"],
  roughnessmap_pars_fragment: _roughnessmap_pars_fragmentGlsl["default"],
  shadowmap_pars_fragment: _shadowmap_pars_fragmentGlsl["default"],
  shadowmap_pars_vertex: _shadowmap_pars_vertexGlsl["default"],
  shadowmap_vertex: _shadowmap_vertexGlsl["default"],
  shadowmask_pars_fragment: _shadowmask_pars_fragmentGlsl["default"],
  skinbase_vertex: _skinbase_vertexGlsl["default"],
  skinning_pars_vertex: _skinning_pars_vertexGlsl["default"],
  skinning_vertex: _skinning_vertexGlsl["default"],
  skinnormal_vertex: _skinnormal_vertexGlsl["default"],
  specularmap_fragment: _specularmap_fragmentGlsl["default"],
  specularmap_pars_fragment: _specularmap_pars_fragmentGlsl["default"],
  tonemapping_fragment: _tonemapping_fragmentGlsl["default"],
  tonemapping_pars_fragment: _tonemapping_pars_fragmentGlsl["default"],
  uv_pars_fragment: _uv_pars_fragmentGlsl["default"],
  uv_pars_vertex: _uv_pars_vertexGlsl["default"],
  uv_vertex: _uv_vertexGlsl["default"],
  uv2_pars_fragment: _uv2_pars_fragmentGlsl["default"],
  uv2_pars_vertex: _uv2_pars_vertexGlsl["default"],
  uv2_vertex: _uv2_vertexGlsl["default"],
  worldpos_vertex: _worldpos_vertexGlsl["default"],
  background_frag: _background_fragGlsl["default"],
  background_vert: _background_vertGlsl["default"],
  cube_frag: _cube_fragGlsl["default"],
  cube_vert: _cube_vertGlsl["default"],
  depth_frag: _depth_fragGlsl["default"],
  depth_vert: _depth_vertGlsl["default"],
  distanceRGBA_frag: _distanceRGBA_fragGlsl["default"],
  distanceRGBA_vert: _distanceRGBA_vertGlsl["default"],
  equirect_frag: _equirect_fragGlsl["default"],
  equirect_vert: _equirect_vertGlsl["default"],
  linedashed_frag: _linedashed_fragGlsl["default"],
  linedashed_vert: _linedashed_vertGlsl["default"],
  meshbasic_frag: _meshbasic_fragGlsl["default"],
  meshbasic_vert: _meshbasic_vertGlsl["default"],
  meshlambert_frag: _meshlambert_fragGlsl["default"],
  meshlambert_vert: _meshlambert_vertGlsl["default"],
  meshmatcap_frag: _meshmatcap_fragGlsl["default"],
  meshmatcap_vert: _meshmatcap_vertGlsl["default"],
  meshphong_frag: _meshphong_fragGlsl["default"],
  meshphong_vert: _meshphong_vertGlsl["default"],
  meshphysical_frag: _meshphysical_fragGlsl["default"],
  meshphysical_vert: _meshphysical_vertGlsl["default"],
  normal_frag: _normal_fragGlsl["default"],
  normal_vert: _normal_vertGlsl["default"],
  points_frag: _points_fragGlsl["default"],
  points_vert: _points_vertGlsl["default"],
  shadow_frag: _shadow_fragGlsl["default"],
  shadow_vert: _shadow_vertGlsl["default"],
  sprite_frag: _sprite_fragGlsl["default"],
  sprite_vert: _sprite_vertGlsl["default"]
};
exports.ShaderChunk = ShaderChunk;