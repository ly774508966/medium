import {
	mat4,
} from 'gl-matrix';
import Vector3 from 'math/Vector3';

export default class OrthographicCamera {
	constructor(options = {}) {
		const defaults = {
			projectionMatrix: mat4.create(),
			near: 0.1,
			far: 100,
			position: new Vector3(),
			center: new Vector3(),
			up: new Vector3(0, 1, 0),
			fov: 65,
			isOrthographicCamera: true,
		};
		Object.assign(this, defaults, options);
	}

	lookAt(x = 0, y = 0, z = 0) {
		this.center.set(x, y, z);
	}
}
