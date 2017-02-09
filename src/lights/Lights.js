export default class Lights {
	constructor(lights) {
		this.lights = lights;
	}
}

export class PointLights extends Lights {
	constructor(lights) {
		super(lights);

		// Setup data
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
	}
}
