export default class Face {
	constructor(iA, iB, iC, vA, vB, vC) {
		this.indices = [iA, iB, iC];
		this.vertices = [vA, vB, vC];
		this.uvs = [iA, iB, iC];
	}
}
