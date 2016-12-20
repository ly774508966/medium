import Vector3 from 'math/Vector3';

export default class PointLight {
	constructor(options = {}) {
		this.uniforms = {
			uPointLightColor: {
				type: '3f',
				value: new Vector3(1, 0, 0).v,
			},
			uPointLightPosition: {
				type: '3f',
				value: new Vector3(0, 0, 0).v,
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
