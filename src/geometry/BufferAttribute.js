import {
	createBuffer,
} from 'core/GL';
import uuidV1 from 'uuid/v1';

export default class BufferAttribute {
	constructor(gl, type, data, itemSize, shaderAttribute = true) {
		this.uuid = uuidV1();
		this.itemSize = itemSize;
		this.numItems = data.length / itemSize;
		this.buffer = createBuffer(gl, type, data);
		this.shaderAttribute = shaderAttribute;
	}

	dispose(gl) {
		gl.deleteBuffer(this.buffer);
	}
}
