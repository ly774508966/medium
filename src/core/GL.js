import { WEBGL2_CONTEXT } from 'core/Constants';

let gl;
let contextType;
let webgl2;

/*
	Set the gl instance
	This is set from the renderer
*/
export function set(_gl, _contextType) {
	gl = _gl;
	contextType = _contextType;
	webgl2 = contextType === WEBGL2_CONTEXT;
}

/*
	Get the gl instance
*/
export function get() {
	return gl;
}

/**
 * createBuffer
 * @return {Buffer}
 */
function createBuffer(type, data) {
	const buffer = gl.createBuffer();
	const ArrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;
	gl.bindBuffer(type, buffer);
	gl.bufferData(type, new ArrayView(data), gl.STATIC_DRAW);
	gl.bindBuffer(type, null);
	return buffer;
}

/**
 * createUniformBuffer
 * @return {Buffer}
 */
function createUniformBuffer(data) {
	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.UNIFORM_BUFFER, buffer);
	gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);
	gl.bindBuffer(gl.UNIFORM_BUFFER, null);
	return buffer;
}

export {
	webgl2,
	createBuffer,
	createUniformBuffer,
};
