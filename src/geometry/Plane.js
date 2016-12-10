import Geometry from './Geometry';

export default class Plane extends Geometry {
	constructor(width = 1, height = 1) {
		/*
			(-1, 1)  (0, 1)  (1, 1)

			(-1, 0)  (0, 0)  (1, 0)

			(-1,-1)  (0,-1)  (1,-1)
		 */

		const vertices = [
			-1.0, -1.0, 0.0,
			1.0, -1.0, 0.0,
			1.0, 1.0, 0.0,
			-1.0, 1.0, 0.0,
		];

		for (let i = 0; i < vertices.length; i += 3) {
			vertices[i] *= width;
			vertices[i + 2] *= height;
		}

		const indices = [
			0, 1, 2,
			0, 2, 3,
		];

		const normals = [
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
		];

		const uvs = [
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
		];

		super(vertices, indices, normals, uvs);
	}
}
