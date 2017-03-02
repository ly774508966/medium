import {
	vec2,
} from 'gl-matrix';

export default class Vector2 {
	v: Float32Array;

	constructor(x = 0, y = 0) {
		this.v = new Float32Array(2);
		this.set(x, y);
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
	set(x, y) {
		vec2.set(this.v, x, y);
		return this;
	}
	clone() {
		return new Vector2(this.v[0], this.v[1]);
	}
	copy(vector2) {
		vec2.copy(this.v, vector2.v);
		return this;
	}
	add(vector2) {
		vec2.add(this.v, this.v, vector2.v);
		return this;
	}
	subtract(vector2) {
		vec2.subtract(this.v, this.v, vector2.v);
		return this;
	}
	subtractVectors(vector0, vector1) {
		const out = vec2.create();
		vec2.subtract(out, vector0.v, vector1.v);
		return out;
	}
	scale(value) {
		vec2.scale(this.v, this.v, value);
		return this;
	}
	distance(vector2) {
		return vec2.distance(this.v, vector2.v);
	}
	length() {
		return vec2.length(this.v);
	}
	negate() {
		vec2.negate(this.v, this.v);
		return this;
	}
	normalize() {
		vec2.normalize(this.v, this.v);
		return this;
	}
	lerp(vector2, value) {
		vec2.lerp(this.v, this.v, vector2.v, value);
		return this;
	}
	equals(vector2) {
		return vec2.equals(this.v, vector2.v);
	}
}
