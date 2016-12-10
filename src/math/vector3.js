import {
	vec3,
} from 'gl-matrix';

export default class Vector3 {
	constructor(x = 0, y = 0, z = 0) {
		this.v = new Float32Array(3);
		this.set(x, y, z);
		return this;
	}
	set x(value) {
		this.v[0] = value;
	}
	get x() {
		return this.v[0];
	}
	set y(value) {
		this.v[1] = value;
	}
	get y() {
		return this.v[1];
	}
	set z(value) {
		this.v[2] = value;
	}
	get z() {
		return this.v[2];
	}
	set(x, y, z) {
		vec3.set(this.v, x, y, z);
		return this;
	}
	clone() {
		return new Vector3(this.v[0], this.v[1], this.v[2]);
	}
	copy(vector3) {
		vec3.copy(this.v, vector3.v);
		return this;
	}
	add(vector3) {
		vec3.add(this.v, this.v, vector3.v);
		return this;
	}
	subtract(vector3) {
		vec3.subtract(this.v, this.v, vector3.v);
		return this;
	}
	scale(value) {
		vec3.scale(this.v, this.v, value);
		return this;
	}
	distance(vector3) {
		return vec3.distance(this.v, vector3.v);
	}
	length() {
		return vec3.length(this.v);
	}
	negate() {
		vec3.negate(this.v, this.v);
		return this;
	}
	normalize() {
		vec3.normalize(this.v, this.v);
		return this;
	}
	dot(vector3) {
		vec3.dot(this.v, vector3.v);
		return this;
	}
	cross(vector3) {
		vec3.cross(this.v, this.v, vector3.v);
		return this;
	}
	lerp(vector3, value) {
		vec3.lerp(this.v, this.v, vector3.v, value);
		return this;
	}
	equals(vector3) {
		return vec3.equals(this.v, vector3.v);
	}
}
