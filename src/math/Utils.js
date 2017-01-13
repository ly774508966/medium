import {
	vec3,
} from 'gl-matrix';
import Vector3 from 'math/Vector3';

export function degToRad(degrees) {
	return degrees * (Math.PI / 180);
}

export function radToDeg(radians) {
	return radians * (180 / Math.PI);
}

export function clamp(value, min, max) {
	return Math.max(Math.min(value, max), min);
}

export function lerp(min, max, alpha) {
	return min + ((max - min) * alpha);
}

export function barycoordFromPoint(point, a, b, c) {
	const v0 = vec3.create();
	const v1 = vec3.create();
	const v2 = vec3.create();

	vec3.sub(v0, c, a);
	vec3.sub(v1, b, a);
	vec3.sub(v2, point, a);

	const dot00 = vec3.dot(v0, v0);
	const dot01 = vec3.dot(v0, v1);
	const dot02 = vec3.dot(v0, v2);
	const dot11 = vec3.dot(v1, v1);
	const dot12 = vec3.dot(v1, v2);

	const denom = (dot00 * dot11 - dot01 * dot01);

	const result = new Vector3();

	// collinear or singular triangle
	if (denom === 0) {
		// arbitrary location outside of triangle?
		// not sure if this is the best idea, maybe should be returning undefined
		return result.set(-2, -1, -1);
	}

	const invDenom = 1 / denom;
	const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
	const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

	// barycentric coordinates must always sum to 1
	return result.set(1 - u - v, v, u);
}
