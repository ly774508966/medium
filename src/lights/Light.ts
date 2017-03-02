export default class Light {
	data: Float32Array;

	update() {return; }

	setValues(values: Array<number> | Float32Array, offset = 0) {
		this.data.set(values, offset);
	}
}
