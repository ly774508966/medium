import {
	createUniformBuffer,
} from 'core/GL';

export default class UniformBuffer {
	constructor(data) {
		this.data = data;
		this.buffer = createUniformBuffer(data);
	}

	/**
	 * Set values for the indices in data
	 */
	setValues(indices, values) {
		indices.forEach((index, i) => {
			this.data[index] = values[i];
		});
	}
}
