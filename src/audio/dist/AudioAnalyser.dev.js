"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioAnalyser = AudioAnalyser;

/**
 * @author mrdoob / http://mrdoob.com/
 */
function AudioAnalyser(audio, fftSize) {
  this.analyser = audio.context.createAnalyser();
  this.analyser.fftSize = fftSize !== undefined ? fftSize : 2048;
  this.data = new Uint8Array(this.analyser.frequencyBinCount);
  audio.getOutput().connect(this.analyser);
}

Object.assign(AudioAnalyser.prototype, {
  getFrequencyData: function getFrequencyData() {
    this.analyser.getByteFrequencyData(this.data);
    return this.data;
  },
  getAverageFrequency: function getAverageFrequency() {
    var value = 0,
        data = this.getFrequencyData();

    for (var i = 0; i < data.length; i++) {
      value += data[i];
    }

    return value / data.length;
  }
});