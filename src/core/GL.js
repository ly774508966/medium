let gl = undefined;

/*
	Set the gl instance
	This is set from the renderer
*/
export function set(_gl) {
	gl = _gl;
}

/*
	Get the gl instance
*/
export function get() {
	return gl;
}

/**
 * createBuffer
 * Utility to create buffers
 * https://github.com/frenchtoast747/webgl-obj-loader/blob/master/webgl-obj-loader.js
 * @return {Buffer}
 */
export function createBuffer(type, data) {
	const buffer = gl.createBuffer();
	const ArrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;
	gl.bindBuffer(type, buffer);
	gl.bufferData(type, new ArrayView(data), gl.STATIC_DRAW);
	gl.bindBuffer(type, null);
	return buffer;
}
