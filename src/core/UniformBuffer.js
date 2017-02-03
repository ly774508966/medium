import {
	createUniformBuffer,
} from 'core/GL';

export default class UniformBuffer {
	constructor(data) {
		this.data = data;
		this.buffer = createUniformBuffer(data);
	}
}
