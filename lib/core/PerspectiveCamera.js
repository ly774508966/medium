import { vec3 } from 'gl-matrix';

export default class PerspectiveCamera {

	constructor(options) {

		this.position = vec3.fromValues(0, 0, 0);
		this.center = vec3.fromValues(0, 0, 0);
		this.up = vec3.fromValues(0, 1, 0);
	}

	setPosition(x = 0, y = 0, z = 0) {
		vec3.set(this.position, x, y, z);
	}

	setLookAt(x = 0, y = 0, z = 0) {
		vec3.set(this.center, x, y, z);
	}
}