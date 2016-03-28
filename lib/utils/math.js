"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.degToRad = degToRad;
exports.radToDeg = radToDeg;
exports.clamp = clamp;
exports.lerp = lerp;
function degToRad(degrees) {
	return degrees * (Math.PI / 180);
}

function radToDeg(radians) {
	return radians * (180 / Math.PI);
}

function clamp(value, min, max) {
	return Math.max(Math.min(value, max), min);
}

function lerp(min, max, alpha) {
	return min + (max - min) * alpha;
}