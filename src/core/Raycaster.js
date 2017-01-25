import { mat4, vec3 } from 'gl-matrix';
import Vector3 from 'math/Vector3';
import Ray from 'math/Ray';
import { barycoordFromPoint } from 'math/Utils';

const inversedProjectionMatrix = mat4.create();
const cameraDirection = vec3.create();
const directionVector = new Vector3();

let face;
let barycoord;
const fvA = new Vector3();
const fvB = new Vector3();
const fvC = new Vector3();
const uvA = new Vector3();
const uvB = new Vector3();
const uvC = new Vector3();

export default class RayCaster {
	constructor(origin, direction, near, far) {
		this.ray = new Ray(origin, direction);
		this.near = near || 0;
		this.far = far || Infinity;
	}

	setFromCamera(coords, scene, camera) {
		if (camera && camera.isPespectiveCamera) {
			this.ray.origin.copy(camera.position);

			vec3.copy(cameraDirection, [coords.x, coords.y, 0.5]);

			mat4.multiply(inversedProjectionMatrix, camera.projectionMatrix, scene.modelViewMatrix);
			mat4.invert(inversedProjectionMatrix, inversedProjectionMatrix);

			vec3.transformMat4(cameraDirection, cameraDirection, inversedProjectionMatrix);

			vec3.sub(cameraDirection, cameraDirection, camera.position.v);
			vec3.normalize(cameraDirection, cameraDirection);

			directionVector.set(cameraDirection[0], cameraDirection[1], cameraDirection[2]);

			this.ray.direction.copy(directionVector);
		}
	}

	uvIntersection(point, v0, v1, v2, uvA, uvB, uvC) {
		barycoord = barycoordFromPoint(point.v, v0.v, v1.v, v2.v);
		uvA.scale(barycoord.x);
		uvB.scale(barycoord.y);
		uvC.scale(barycoord.z);
		uvA.add(uvB).add(uvC);
		return uvA.clone();
	}

	intersectObject(object) {
		let intersect;
		let uv;
		for (let i = 0; i < object.geometry.faces.length; i++) {
			face = object.geometry.faces[i];
			vec3.copy(fvA.v, face.vertices[0].v);
			vec3.copy(fvB.v, face.vertices[1].v);
			vec3.copy(fvC.v, face.vertices[2].v);

			// Multiply vertices by object matrix
			vec3.transformMat4(fvA.v, fvA.v, object.modelMatrix);
			vec3.transformMat4(fvB.v, fvB.v, object.modelMatrix);
			vec3.transformMat4(fvC.v, fvC.v, object.modelMatrix);

			intersect = this.ray.intersectTriangle(fvA, fvB, fvC);

			if (intersect) {
				// Get uv intersection
				vec3.copy(uvA.v, object.geometry.uvs[face.uvs[0]].v);
				vec3.copy(uvB.v, object.geometry.uvs[face.uvs[1]].v);
				vec3.copy(uvC.v, object.geometry.uvs[face.uvs[2]].v);
				uv = this.uvIntersection(intersect, fvA, fvB, fvC, uvA, uvB, uvC);
				break;
			}
		}

		return intersect ? {
			point: intersect,
			uv,
		} : null;
	}
}
