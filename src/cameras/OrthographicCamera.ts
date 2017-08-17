import {
	mat4,
} from 'gl-matrix';
import Vector3 from '../math/Vector3';
import Camera from './Camera';

interface Options {
	near?: number;
	far?: number;
	fov?: number;
	position?: Vector3;
	target?: Vector3;
	up?: Vector3;
}

export default class OrthographicCamera extends Camera {
	constructor(options: Options) {
		super(options);
		this.isOrthographicCamera = true;
	}

	updateProjectionMatrix() {
		mat4.ortho(this.projectionMatrix, -1.0, 1.0, -1.0, 1.0, this.near, this.far);
	}
}
