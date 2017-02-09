import Light from './Light';
import Vector3 from 'math/Vector3';
import Color from 'math/Color';
import UniformBuffer from 'core/UniformBuffer';

export default class PointLight extends Light {
	constructor(uniforms = {}) {
		super();
		this.uniforms = {
			position: {
				type: '3f',
				value: new Vector3(0, 0, 0).v,
			},
			position1: {
				type: '3f',
				value: new Vector3(0, 0, 0).v,
			},
			color: {
				type: '3f',
				value: new Color(0xFFFFFF).v,
			},
			specularColor: {
				type: '3f',
				value: new Color(0xFFFFFF).v,
			},
			shininess: {
				type: 'f',
				value: 1,
			},
			intensity: {
				type: 'f',
				value: 1,
			},
		};
		Object.assign(this.uniforms, uniforms);

		this.position = new Vector3();
		this.position1 = new Vector3();

		// Prepare data
		const data = new Float32Array([
			...this.uniforms.position.value, 0.0,
			...this.uniforms.color.value, 0.0,
			...this.uniforms.specularColor.value, 0.0,
			this.uniforms.shininess.value, 0.0, 0.0, 0.0,
			this.uniforms.intensity.value, 0.0, 0.0, 0.0,
			//
			...this.uniforms.position1.value, 0.0,
			0, 1, 0, 0.0,
			...this.uniforms.specularColor.value, 0.0,
			this.uniforms.shininess.value, 0.0, 0.0, 0.0,
			this.uniforms.intensity.value, 0.0, 0.0, 0.0,
		]);

		this.uniformBuffer = new UniformBuffer(data);
	}

	update() {
		this.uniformBuffer.setValues([0, 1, 2], this.position.v);
		this.uniformBuffer.setValues([21, 22, 23], this.position1.v);
	}
}
