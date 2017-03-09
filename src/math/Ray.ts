import Vector3 from './Vector3';
import {
	vec3,
} from 'gl-matrix';

const diff = vec3.create();
const edge1 = vec3.create();
const edge2 = vec3.create();
const normal = vec3.create();

export default class Ray {
	origin: Vector3;
	direction: Vector3;

	constructor() {
		this.origin = new Vector3();
		this.direction = new Vector3();
	}

	set(origin: Vector3, direction: Vector3) {
		this.origin.copy(origin);
		this.direction.copy(direction);
	}

	intersectTriangle(a: Vector3, b: Vector3, c: Vector3, culling = true) {
		vec3.sub(edge1, b.v, a.v);
		vec3.sub(edge2, c.v, a.v);
		vec3.cross(normal, edge1, edge2);

		// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
		// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
		//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
		//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
		//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)

		// console.log('normal', normal);
		let DdN = vec3.dot(this.direction.v, normal);
		let sign;

		// console.log('normal', normal);

		if (DdN > 0) {
			if (culling) return null;
			sign = 1;
		} else if (DdN < 0) {
			sign = -1;
			DdN = -DdN;
		} else {
			return null;
		}

		vec3.sub(diff, this.origin.v, a.v);
		vec3.cross(edge2, diff, edge2);
		const DdQxE2 = sign * vec3.dot(this.direction.v, edge2);

		// b1 < 0, no intersection
		if (DdQxE2 < 0) {
			return null;
		}

		vec3.cross(edge1, edge1, diff);
		const DdE1xQ = sign * vec3.dot(this.direction.v, edge1);

		// b2 < 0, no intersection
		if (DdE1xQ < 0) {
			return null;
		}

		// b1+b2 > 1, no intersection
		if (DdQxE2 + DdE1xQ > DdN) {
			return null;
		}

		// Line intersects triangle, check if ray does.
		const QdN = -sign * vec3.dot(diff, normal);

		// t < 0, no intersection
		if (QdN < 0) {
			return null;
		}

		const result = new Vector3();
		result.copy(this.direction).scale(QdN / DdN).add(this.origin);

		return result;
	}
}
