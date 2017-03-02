export default class ImageData {
	width: number;
	height: number;
	data: Float32Array;

	constructor(width: number, height: number, data: Float32Array) {
		this.width = width;
		this.height = height;
		this.data = data;
	}
}
