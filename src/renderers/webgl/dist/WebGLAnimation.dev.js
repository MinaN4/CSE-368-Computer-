"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLAnimation = WebGLAnimation;

/**
 * @author mrdoob / http://mrdoob.com/
 */
function WebGLAnimation() {
  var context = null;
  var isAnimating = false;
  var animationLoop = null;

  function onAnimationFrame(time, frame) {
    if (isAnimating === false) return;
    animationLoop(time, frame);
    context.requestAnimationFrame(onAnimationFrame);
  }

  return {
    start: function start() {
      if (isAnimating === true) return;
      if (animationLoop === null) return;
      context.requestAnimationFrame(onAnimationFrame);
      isAnimating = true;
    },
    stop: function stop() {
      isAnimating = false;
    },
    setAnimationLoop: function setAnimationLoop(callback) {
      animationLoop = callback;
    },
    setContext: function setContext(value) {
      context = value;
    }
  };
}