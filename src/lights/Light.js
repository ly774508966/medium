import {
	OBJECT_TYPE_LIGHT,
} from 'core/Constants';

export default class Light {
	type = OBJECT_TYPE_LIGHT;
	update() {}

	setValues(values, offset = 0) {
		// TypedArray.prototype.set
		this.data.set(values, offset);
	}
}
