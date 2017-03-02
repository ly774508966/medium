import * as GL from '../core/GL';

let gl;

export default class BufferAttribute {
	type: number;
	data: Array<number>;
	itemSize: number;
	numItems: number;
	buffer: WebGLBuffer;
	shaderAttribute: boolean;

	constructor(type: number, data: Float32Array | Uint16Array, itemSize: number, shaderAttribute = true) {
		this.type = type;
		this.itemSize = itemSize;
		this.numItems = data.length / itemSize;
		this.buffer = GL.createBuffer(type, data);
		this.shaderAttribute = shaderAttribute;
	}

	bind() {
		gl = GL.get();
		gl.bindBuffer(this.type, this.buffer);
	}

	unbind() {
		gl = GL.get();
		gl.bindBuffer(this.type, null);
	}

	update(data) {
		this.bind();
		gl = GL.get();
		gl.bufferSubData(this.type, 0, data);
		this.unbind();
	}

	dispose() {
		gl = GL.get();
		gl.deleteBuffer(this.buffer);
		this.buffer = null;
	}
}
