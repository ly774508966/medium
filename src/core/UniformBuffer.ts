import {
	createUniformBuffer,
} from './GL';

export default class UniformBuffer {
	data: Float32Array;
	buffer: WebGLBuffer;

	constructor(data: Float32Array) {
		this.data = data;
		this.buffer = createUniformBuffer(data);
	}

	setValues(values: Float32Array, offset = 0) {
		this.data.set(values, offset);
	}
}
