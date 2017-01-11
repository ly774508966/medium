import { mat4, vec3 } from 'gl-matrix';
import Vector3 from 'math/Vector3';
import Ray from 'math/Ray';

const inversedProjectionMatrix = mat4.create();
const cameraDirection = vec3.create();
const directionVector = new Vector3();

export default class RayCaster {
	constructor(origin, direction, near, far) {
		this.ray = new Ray(origin, direction);
		this.near = near || 0;
		this.far = far || Infinity;
	}

	setFromCamera(coords, camera) {
		if (camera && camera.isPespectiveCamera) {
			this.ray.origin.copy(camera.position);

			mat4.multiply(inversedProjectionMatrix, camera.projectionMatrix, camera.modelViewMatrix);
			mat4.invert(inversedProjectionMatrix, inversedProjectionMatrix);

			vec3.transformMat4(cameraDirection,
				vec3.create(coords.x, coords.y, 0.5), inversedProjectionMatrix);
			vec3.sub(cameraDirection, cameraDirection, camera.position.v);
			vec3.normalize(cameraDirection, cameraDirection);

			directionVector.set(cameraDirection[0], cameraDirection[1], cameraDirection[2]);

			this.ray.direction.copy(directionVector);
		}
	}

	intersectObject(object) {
		let intersect;
		for (let i = 0; i < object.geometry.faces.length; i++) {
			const face = object.geometry.faces[i];
			const a = face.vertices[0];
			const b = face.vertices[1];
			const c = face.vertices[2];

			intersect = this.ray.intersectTriangle(a, b, c);

			if (intersect) {
				break;
			}
		}
		// console.log('intersect', intersect);
		return intersect;
	}
}
