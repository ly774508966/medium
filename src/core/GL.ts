import { WEBGL2_CONTEXT } from './Constants';

let gl: WebGLRenderingContext;
let contextType: string;
let webgl2: boolean;

/*
	Set the gl instance
	This is set from the renderer
*/
export function set(_gl: WebGLRenderingContext, _contextType: string) {
	gl = _gl;
	contextType = _contextType;
	webgl2 = contextType === WEBGL2_CONTEXT;
}

/*
	Get the gl instance
*/
export function get(): WebGLRenderingContext {
	return gl;
}

/**
	* createBuffer
	* @return {Buffer}
	*/
function createBuffer(type: number, data: Float32Array | Uint16Array, isDynamic: boolean = false) {
	const buffer = gl.createBuffer();
	const ArrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;
	const usage = isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
	gl.bindBuffer(type, buffer);
	gl.bufferData(type, new ArrayView(data), usage);
	gl.bindBuffer(type, null);
	return buffer;
}

/**
	* createUniformBuffer
	* @return {Buffer}
	*/
function createUniformBuffer(data: Float32Array) {
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
