import {
	mat4,
} from 'gl-matrix';
import {
	RENDERER_DEFAULT_RATIO,
} from 'core/Constants';
import Vector3 from 'math/Vector3';

export default class PerspectiveCamera {
	constructor(options = {}) {
		const defaults = {
			fov: 70,
			near: 0.1,
			far: 100,
			ratio: RENDERER_DEFAULT_RATIO,
			position: new Vector3(),
			center: new Vector3(),
			up: new Vector3(0, 1, 0),
			projectionMatrix: mat4.create(),
			isPespectiveCamera: true,
		};
		Object.assign(this, defaults, options);
	}

	lookAt(x = 0, y = 0, z = 0) {
		this.center.set(x, y, z);
	}
}
