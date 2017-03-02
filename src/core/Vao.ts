import * as GL from './GL';
import { extensions } from './Capabilities';

let gl;

export default class Vao {
	vao: any;

	constructor() {
		gl = GL.get();
		if (GL.webgl2) {
			this.vao = gl.createVertexArray();
		} else if (extensions.vertexArrayObject) {
			this.vao = extensions.vertexArrayObject.createVertexArrayOES();
		}
	}

	bind() {
		if (GL.webgl2) {
			gl.bindVertexArray(this.vao);
		} else if (extensions.vertexArrayObject) {
			extensions.vertexArrayObject.bindVertexArrayOES(this.vao);
		}
	}

	unbind() {
		if (GL.webgl2) {
			gl.bindVertexArray(null);
		} else if (extensions.vertexArrayObject) {
			extensions.vertexArrayObject.bindVertexArrayOES(null);
		}
	}

	dispose() {
		if (GL.webgl2) {
			gl.deleteVertexArray(this.vao);
		} else if (extensions.vertexArrayObject) {
			extensions.vertexArrayObject.deleteVertexArrayOES(this.vao);
		}
		this.vao = null;
	}
}
