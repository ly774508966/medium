import * as GL from 'core/GL';

let gl;

export default class BufferAttribute {
	constructor(type, data, itemSize, shaderAttribute = true) {
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

	dispose() {
		gl = GL.get();
		gl.deleteBuffer(this.buffer);
		this.buffer = null;
	}
}
