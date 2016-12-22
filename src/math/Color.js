import {
	vec3,
} from 'gl-matrix';

export default class Color {
	constructor(hex = 0xFFFFFF) {
		this.v = new Float32Array(3);
		this.convert(hex);
		return this;
	}
	set r(value) {
		this.v[0] = value;
	}
	get r() {
		return this.v[0];
	}
	set g(value) {
		this.v[1] = value;
	}
	get g() {
		return this.v[1];
	}
	set b(value) {
		this.v[2] = value;
	}
	get b() {
		return this.v[2];
	}
	set(x, y, z) {
		vec3.set(this.v, x, y, z);
		return this;
	}
	convert(hex) {
		const rgb = typeof hex === 'number' ? this.hexIntToRgb(hex) : this.hexStringToRgb(hex);
		vec3.copy(this.v, this.normalize(rgb));
		return this;
	}
	normalize(array) {
		return vec3.fromValues(
			array[0] / 255,
			array[1] / 255,
			array[2] / 255);
	}
	fromArray(array) {
		this.set(array[0], array[1], array[2]);
	}
	componentToHex(c) {
		const hex = c.toString(16);
		return hex.length === 1 ? `0${hex}` : hex;
	}
	rgbToHex(r, g, b) {
		const hexR = this.componentToHex(r);
		const hexG = this.componentToHex(g);
		const hexB = this.componentToHex(b);
		return `#${hexR}${hexG}${hexB}`;
	}
	hexIntToRgb(hex) {
		const r = hex >> 16;
		const g = hex >> 8 & 0xFF;
		const b = hex & 0xFF;
		return vec3.fromValues(r, g, b);
	}
	hexStringToRgb(hex) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? vec3.fromValues(
			parseInt(result[1], 16),
			parseInt(result[2], 16),
			parseInt(result[3], 16),
		) : null;
	}
}
