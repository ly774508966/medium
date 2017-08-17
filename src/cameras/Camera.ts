import {
	mat4,
} from 'gl-matrix';
import {
	RENDERER_DEFAULT_RATIO,
} from '../core/Constants';
import Vector3 from '../math/Vector3';
import Object3D from '../core/Object3D';

interface Options {
	near?: number;
	far?: number;
	fov?: number;
	position?: Vector3;
	target?: Vector3;
	up?: Vector3;
}

export default class Camera {
	projectionMatrix: mat4;
	worldInverseMatrix: mat4;
	isCamera: boolean;
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
		this.worldInverseMatrix = mat4.create();
		this.isCamera = true;
		this.isPespectiveCamera = false;
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

	updateMatrixWorld() {
		mat4.identity(this.worldInverseMatrix);
		mat4.lookAt(this.worldInverseMatrix, this.position.v, this.target.v, this.up.v);
	}

	updateProjectionMatrix() {
		// override
	}
}
