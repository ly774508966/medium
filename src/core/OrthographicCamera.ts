import {
	mat4,
} from 'gl-matrix';
import Vector3 from '../math/Vector3';

interface Options {
	near?: number;
	far?: number;
	fov?: number;
	position?: Vector3;
	center?: Vector3;
	up?: Vector3;
}

export default class OrthographicCamera {
	projectionMatrix: mat4;
	isOrthographicCamera: boolean;
	isPespectiveCamera: boolean;
	near: number;
	far: number;
	fov: number;
	position: Vector3;
	center: Vector3;
	up: Vector3;

	constructor(options: Options) {
		this.projectionMatrix = mat4.create();
		this.isOrthographicCamera = true;
		this.isPespectiveCamera = false;
		this.near = 0.1;
		this.far = 100;
		this.fov = 65;
		this.position = new Vector3();
		this.center = new Vector3();
		this.up = new Vector3(0, 1, 0);
		Object.assign(this, options);
	}

	lookAt(x = 0, y = 0, z = 0) {
		this.center.set(x, y, z);
	}
}
