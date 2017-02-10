import {
	createUniformBuffer,
} from 'core/GL';

export default class UniformBuffer {
	constructor(data) {
		this.data = data;
		this.buffer = createUniformBuffer(data);
	}

	setValues(values, offset = 0) {
		// TypedArray.prototype.set
		this.data.set(values, offset);
	}
}
