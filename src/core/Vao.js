import * as GL from '../core/GL';
import { extensions } from 'core/Capabilities';

let gl;

export default class Vao {
	constructor() {
		gl = GL.get();
		if (GL.webgl2) {
			this.vao = gl.createVertexArray();
		} else {
			this.vao = extensions.vertexArrayObject.createVertexArrayOES();
		}
	}

	bind() {
		if (GL.webgl2) {
			gl.bindVertexArray(this.vao);
		} else {
			extensions.vertexArrayObject.bindVertexArrayOES(this.vao);
		}
	}

	unbind() {
		if (GL.webgl2) {
			gl.bindVertexArray(null);
		} else {
			extensions.vertexArrayObject.bindVertexArrayOES(null);
		}
	}

	dispose() {
		if (GL.webgl2) {
			gl.deleteVertexArray(this.vao);
		} else {
			extensions.vertexArrayObject.deleteVertexArrayOES(this.vao);
		}
		this.vao = null;
	}
}
