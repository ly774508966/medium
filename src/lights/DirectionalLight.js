import Light from './Light';
import Vector3 from 'math/Vector3';

export default class DirectionalLight extends Light {
	constructor(options = {}) {
		super();
		this.uniforms = {
			uDirectionalLightColor: {
				type: '3f',
				value: new Vector3(1, 1, 1).v,
			},
			uDirectionalLightPosition: {
				type: '3f',
				value: new Vector3(1, 1, 1).v,
			},
		};
		Object.assign(this.uniforms, options);
	}
}
