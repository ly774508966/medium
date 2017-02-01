import {
	vec3,
	mat4,
	quat,
} from 'gl-matrix';
import Vector3 from 'math/Vector3';

let axisAngle = 0;
const quaternionAxisAngle = vec3.create();

export default class Object3D {
	constructor() {
		this.children = [];
		this.localMatrix = mat4.create();
		this.modelMatrix = mat4.create();
		this.position = new Vector3();
		this.rotation = new Vector3();
		this.scale = new Vector3(1, 1, 1);
		this._quaternion = quat.create();
		this.isObject3D = true;
	}

	updateMatrix() {
		// Reset
		mat4.identity(this.localMatrix);
		mat4.identity(this.modelMatrix);
		quat.identity(this._quaternion);

		// If Object3D has a parent, copy the computed modelMatrix into localMatrix
		if (this.parent) {
			mat4.copy(this.localMatrix, this.parent.modelMatrix);
			mat4.multiply(this.modelMatrix, this.modelMatrix, this.localMatrix);
		}

		// Apply local transitions to modelMatrix
		mat4.translate(this.modelMatrix, this.modelMatrix, this.position.v);
		quat.rotateX(this._quaternion, this._quaternion, this.rotation.x);
		quat.rotateY(this._quaternion, this._quaternion, this.rotation.y);
		quat.rotateZ(this._quaternion, this._quaternion, this.rotation.z);
		axisAngle = quat.getAxisAngle(quaternionAxisAngle, this._quaternion);
		mat4.rotate(this.modelMatrix, this.modelMatrix, axisAngle, quaternionAxisAngle);
		mat4.scale(this.modelMatrix, this.modelMatrix, this.scale.v);
	}

	setParent(parent) {
		this.unParent();
		if (parent.isObject3D) {
			parent.children.push(this);
			this.parent = parent;
		}
	}

	unParent() {
		if (this.parent === undefined) return;
		const objectIndex = this.parent.children.indexOf(this);
		if (objectIndex !== -1) {
			this.parent.children.splice(objectIndex, 1);
			this.parent = null;
		}
	}

	dispose() {
		this.unParent();
		this.children = [];
		this.localMatrix = null;
		this.modelMatrix = null;
		this.position = null;
		this.rotation = null;
		this.scale = null;
		this._quaternion = null;
		this.isObject3D = null;
	}
}
