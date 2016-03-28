"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.set = set;
exports.get = get;
var gl = undefined;

/*
	Set the gl instance
	This is set from the renderer
*/
function set(_gl) {
	gl = _gl;
}

/*
	Get the gl instance
*/
function get() {
	return gl;
}