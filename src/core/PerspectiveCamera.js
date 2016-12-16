import Vector3 from 'math/Vector3';

export default class PerspectiveCamera {
	constructor(options = {}) {
		const defaults = {
			fov: 70,
		};
		const settings = Object.assign({}, defaults, options);
		this.near = 0.1;
		this.far = 100;
		this.position = new Vector3();
		this.center = new Vector3();
		this.up = new Vector3(0, 1, 0);
		this.fov = settings.fov;
	}

	lookAt(x = 0, y = 0, z = 0) {
		this.center.set(x, y, z);
	}
}
