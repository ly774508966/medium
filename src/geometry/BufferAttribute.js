import {
	createBuffer,
} from 'core/GL';

export default class BufferAttribute {
	constructor(gl, type, data, itemSize) {
		this.itemSize = itemSize;
		this.numItems = data.length / itemSize;
		this.buffer = createBuffer(gl, type, data);
	}
}
