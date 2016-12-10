"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	try {
		return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl");
	} catch (error) {
		return false;
	}
};