import {
	mat4,
} from 'gl-matrix';
import Mesh from '../core/Mesh';
import Lights from '../lights/Lights';

export default class Scene {
	objects: Array<Mesh>;
	ambientLight: Lights;
	pointLights: Lights;
	directionalLights: Lights;

	constructor() {
		this.objects = [];
		this.pointLights = undefined;
		this.directionalLights = undefined;
	}

	add(object: Mesh) {
		this.objects.push(object);
	}

	remove(object: Mesh, dispose = false) {
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
		if (this.ambientLight) {
			this.ambientLight.update();
			this.ambientLight.bind();
		}
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
