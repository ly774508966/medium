import Vector3 from '../math/Vector3';

export default class Face {
	indices: Array<number>;
	vertices: Array<Vector3>;
	uvs: Array<number>;

	constructor(iA: number, iB: number, iC: number, vA: Vector3, vB: Vector3, vC: Vector3) {
		this.indices = [iA, iB, iC];
		this.vertices = [vA, vB, vC];
		this.uvs = [iA, iB, iC];
	}
}
