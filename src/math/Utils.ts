import {
	vec3,
	mat4,
} from 'gl-matrix';
import Vector2 from '../math/Vector2';
import Vector3 from '../math/Vector3';

export function degToRad(degrees: number) {
	return degrees * (Math.PI / 180);
}

export function radToDeg(radians: number) {
	return radians * (180 / Math.PI);
}

export function clamp(value: number, min: number, max: number) {
	return Math.max(Math.min(value, max), min);
}

export function lerp(min: number, max: number, alpha: number) {
	return min + ((max - min) * alpha);
}

export function barycoordFromPoint(point: vec3, a: vec3, b: vec3, c: vec3) {
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

/*
http://stackoverflow.com/questions/5531827/random-point-on-a-given-sphere
	*/
export function randomSpherePoint(x0: number, y0: number, z0: number, radius: number) {
	const u = Math.random();
	const v = Math.random();
	const theta = 2 * Math.PI * u;
	const phi = Math.acos(2 * v - 1);
	const x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
	const y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
	const z = z0 + (radius * Math.cos(phi));
	return [x, y, z];
}

// https://github.com/hughsk/from-3d-to-2d/blob/master/index.js
export function from3DTo2D(position: Vector3, pVMatrix: mat4) {
	const ix = position.x;
	const iy = position.y;
	const iz = position.z;

	const ox = pVMatrix[0] * ix + pVMatrix[4] * iy + pVMatrix[8] * iz + pVMatrix[12];
	const oy = pVMatrix[1] * ix + pVMatrix[5] * iy + pVMatrix[9] * iz + pVMatrix[13];
	const ow = pVMatrix[3] * ix + pVMatrix[7] * iy + pVMatrix[11] * iz + pVMatrix[15];

	const screenPosition = new Vector2();
	screenPosition.x = (ox / ow + 1) / 2;
	screenPosition.y = 1 - (oy / ow + 1) / 2;

	return screenPosition;
}
