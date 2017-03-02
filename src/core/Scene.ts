import {
	mat4,
} from 'gl-matrix';
import Mesh from '../core/Mesh';
import Lights from '../lights/Lights';

export default class Scene {
	objects: Array<Mesh>;
	pointLights: Lights;
	directionalLights: Lights;
	modelViewMatrix: mat4;

	constructor() {
		this.objects = [];
		this.pointLights = undefined;
		this.directionalLights = undefined;
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
