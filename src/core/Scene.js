import {
	OBJECT_TYPE_LIGHT,
} from 'core/Constants';

export default class Scene {

	constructor() {
		this.lights = [];
		this.objects = [];
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

	update() {
		this.lights.forEach(light => {
			light.update();
		});
	}
}
