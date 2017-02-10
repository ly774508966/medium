import {
	mat4,
} from 'gl-matrix';

export default class Scene {

	constructor() {
		this.objects = [];
		this.pointLights = false;
		this.directionalLights = false;
		this.modelViewMatrix = mat4.create();
	}

	add(object) {
		switch (object.type) {
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
		if (this.directionalLights) {
			this.directionalLights.update();
			this.directionalLights.bind();
		}
		if (this.pointLights) {
			this.pointLights.update();
			this.pointLights.bind();
		}
	}
}
