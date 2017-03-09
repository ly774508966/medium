import Vector3 from '../math/Vector3';

export default class Face {
	indices: Array<number>;
	vertices: Array<Vector3>;
	uvs: Array<number>;

	constructor(indiceA: number, indiceB: number, indiceC: number, vertexA: Vector3, vertexB: Vector3, vertexC: Vector3) {
		this.indices = [indiceA, indiceB, indiceC];
		this.vertices = [vertexA, vertexB, vertexC];
		this.uvs = [indiceA, indiceB, indiceC];
	}
}
