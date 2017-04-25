import {
	mat4,
} from 'gl-matrix';
import {
	RENDERER_DEFAULT_RATIO,
} from './Constants';
import Vector3 from '../math/Vector3';

interface Options {
	near?: number;
	far?: number;
	fov?: number;
	position?: Vector3;
	target?: Vector3;
	up?: Vector3;
}

export default class PerspectiveCamera {
	projectionMatrix: mat4;
	isPespectiveCamera: boolean;
	isOrthographicCamera: boolean;
	near: number;
	far: number;
	fov: number;
	ratio: number;
	position: Vector3;
	target: Vector3;
	up: Vector3;

	constructor(options: Options) {
		this.projectionMatrix = mat4.create();
		this.isPespectiveCamera = true;
		this.isOrthographicCamera = false;
		this.near = 0.1;
		this.far = 100;
		this.fov = 70;
		this.ratio = RENDERER_DEFAULT_RATIO;
		this.position = new Vector3();
		this.target = new Vector3();
		this.up = new Vector3(0, 1, 0);
		Object.assign(this, options);
	}

	lookAt(x = 0, y = 0, z = 0) {
		this.target.set(x, y, z);
	}

	updateProjectionMatrix() {
		mat4.perspective(this.projectionMatrix, this.fov, this.ratio, this.near, this.far);
	}
}
