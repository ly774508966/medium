import {
	mat4,
} from 'gl-matrix';
import {
	OBJECT_TYPE_LIGHT,
} from 'core/Constants';

export default class Scene {

	constructor() {
		this.lights = [];
		this.objects = [];
		this.modelViewMatrix = mat4.create();
	}

	add(object) {
		switch (object.type) {
			case OBJECT_TYPE_LIGHT:
				this.lights.push(object);
				break;
			default:
				this.objects.push(object);
		}
	}

	remove(object, dispose = false) {
		const objectIndex = this.objects.indexOf(object);
		if (objectIndex !== -1) {
			this.objects.splice(objectIndex, 1);
			if (dispose) {
				object.dispose();
				object = undefined;
			}
		}
	}

	update() {
		this.lights.forEach(light => {
			light.update();
		});
	}
}
