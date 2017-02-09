import Light from './Light';
import Vector3 from 'math/Vector3';
import Color from 'math/Color';
import UniformBuffer from 'core/UniformBuffer';

export default class DirectionalLight extends Light {
	constructor(uniforms = {}) {
		super();
		this.uniforms = {
			position: {
				type: '3f',
				value: new Vector3(0, 0, 0).v,
			},
			color: {
				type: '3f',
				value: new Color(0xffffff).v,
			},
			intensity: {
				type: 'f',
				value: 1,
			},
		};
		Object.assign(this.uniforms, uniforms);

		this.position = new Vector3();

		// Prepare data
		const data = new Float32Array([
			...this.uniforms.position.value, 0.0,
			...this.uniforms.color.value, 0.0,
			this.uniforms.intensity.value, 0.0, 0.0, 0.0,
		]);

		this.uniformBuffer = new UniformBuffer(data);
	}

	update() {
		this.uniformBuffer.setValues([0, 1, 2], this.position.v);
	}
}
