import * as GL from './GL';
import { extensions } from './Capabilities';

let gl: WebGL2RenderingContext | WebGLRenderingContext;

export default class Vao {
	vao: any;

	constructor() {
		gl = GL.get();
		if (gl instanceof WebGL2RenderingContext) {
			this.vao = gl.createVertexArray();
		} else if (extensions.vertexArrayObject) {
			this.vao = extensions.vertexArrayObject.createVertexArrayOES();
		}
	}

	bind() {
		if (gl instanceof WebGL2RenderingContext) {
			gl.bindVertexArray(this.vao);
		} else if (extensions.vertexArrayObject) {
			extensions.vertexArrayObject.bindVertexArrayOES(this.vao);
		}
	}

	unbind() {
		if (gl instanceof WebGL2RenderingContext) {
			gl.bindVertexArray(null);
		} else if (extensions.vertexArrayObject) {
			extensions.vertexArrayObject.bindVertexArrayOES(null);
		}
	}

	dispose() {
		if (gl instanceof WebGL2RenderingContext) {
			gl.deleteVertexArray(this.vao);
		} else if (extensions.vertexArrayObject) {
			extensions.vertexArrayObject.deleteVertexArrayOES(this.vao);
		}
		this.vao = null;
	}
}
