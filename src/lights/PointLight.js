import Light from './Light';
import Vector3 from 'math/Vector3';
import Color from 'math/Color';

export default class PointLight extends Light {
	constructor(options = {}) {
		super();
		this.uniforms = {
			uPointLightColor: {
				type: '3f',
				value: new Color(0xFFFFFF).v,
			},
			uPointLightSpecularColor: {
				type: '3f',
				value: new Color(0xFFFFFF).v,
			},
			uPointLightPosition: {
				type: '3f',
				value: new Vector3(0, 0, 0).v,
			},
			uPointLightShininess: {
				type: 'f',
				value: 100,
			},
		};
		Object.assign(this.uniforms, options);
		this.position = new Vector3();
	}

	update() {
		this.uniforms.uPointLightPosition.value[0] = this.position.x;
		this.uniforms.uPointLightPosition.value[1] = this.position.y;
		this.uniforms.uPointLightPosition.value[2] = this.position.z;
	}
}
