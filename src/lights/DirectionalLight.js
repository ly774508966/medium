import {
	createUniformBuffer,
} from 'core/GL';
import Light from './Light';
import Vector3 from 'math/Vector3';
import Color from 'math/Color';

export default class DirectionalLight extends Light {
	constructor(options = {}) {
		super();
		const defaults = {
			color: {
				type: '3f',
				value: new Color(0xFFFFFF).v,
			},
			position: {
				type: '3f',
				value: new Vector3(0, 0, 0).v,
			},
			intensity: {
				type: 'f',
				value: 1,
			},
		};
		Object.assign(this, defaults, options);

		// Prepare data
		// const bufferData = [
		// 	...this.color.value, 0.0,
		// 	...this.position.value, 0.0,
		// 	this.intensity.value, 0.0, 0.0, 0.0,
		// ];

		// console.log('bufferData', bufferData);

		// bind buffer within vao setup

		// this.uniformBuffer = createUniformBuffer(bufferData);
		this.position = new Vector3();
	}

	update() {
		// this.uniforms.position.value[0] = this.position.x;
		// this.uniforms.position.value[1] = this.position.y;
		// this.uniforms.position.value[2] = this.position.z;
	}
}
