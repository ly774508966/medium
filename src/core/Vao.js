import * as GL from '../core/GL';

let gl;

export default class Vao {
	constructor() {
		gl = GL.get();
		this.vao = gl.createVertexArray();
	}

	bind() {
		// console.log('vao bind');
		gl.bindVertexArray(this.vao);
	}

	unbind() {
		gl.bindVertexArray(null);
		// console.log('vao unbind');
	}
}
