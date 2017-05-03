import uuid from 'uuid/v1';
import Bezier from 'bezier-js';
import { GUI } from 'dat-gui';
import EventDispatcher from 'happens';
import { DRAW_LINES } from '../core/Constants';
import LineGeometry from '../geometry/LineGeometry';
import SphereGeometry from '../geometry/SphereGeometry';
import Mesh from '../core/Mesh';
import Scene from '../core/Scene';
import Shader from '../core/Shader';
import PerspectiveCamera from '../core/PerspectiveCamera';

interface IDollyCurves {
	origin: Bezier;
	lookat: Bezier;
}

class Dolly {
	curves: IDollyCurves;
	origin: Array<object>;
	lookat: Array<object>;
	constructor(origin, lookat, steps = 50) {
		this.origin = origin;
		this.lookat = lookat;
		let originPoints = [];
		let lookatPoints = [];

		origin.forEach(point => {
			originPoints = originPoints.concat(point);
		});

		lookat.forEach(point => {
			lookatPoints = lookatPoints.concat(point);
		});

		this.curves = {
			origin: new Bezier(originPoints),
			lookat: new Bezier(lookatPoints),
		};
	}

	get(time = 0) {
		const origin = this.curves.origin.get(time);
		const lookat = this.curves.lookat.get(time);
		return {
			origin,
			lookat,
		};
	}

	rebuild() {
		this.curves.origin.update();
		this.curves.lookat.update();
	}

	destroy() {
		this.curves.origin = null;
		this.curves.lookat = null;
	}
}

interface IDollyHelperLines {
	origin: Mesh;
	lookat: Mesh;
}

interface IDollyHelperPoints {
	origin: Array<Mesh>;
	lookat: Array<Mesh>;
}

class DollyHelper {
	id: string;
	dolly: Dolly;
	scene: Scene;
	gui: GUI;
	guiOrigin: GUI;
	guiLookat: GUI;
	steps: number;
	range: number;
	lines: IDollyHelperLines;
	points: IDollyHelperPoints;
	// EventDispatcher
	on: Function;
	once: Function;
	off: Function;
	emit: Function;
	constructor(dolly: Dolly, scene: Scene, gui: GUI, steps = 50, range = 100, guiOpen = false, guiOpenOrigin = false, guiOpenLookat = false) {
		EventDispatcher(this);
		this.id = uuid();
		this.dolly = dolly;
		this.scene = scene;
		this.gui = gui.addFolder(`Dolly ${this.id}`);
		if (guiOpen) {
			this.gui.open();
		}
		this.steps = steps;
		this.range = range;
		this.lines = {
			origin: null,
			lookat: null,
		};
		this.points = {
			origin: [],
			lookat: [],
		};
		this.createPoints('origin', this.dolly.origin);
		this.createPoints('lookat', this.dolly.lookat);
		this.createLine('origin', this.dolly.curves.origin.getLUT(this.steps));
		this.createLine('lookat', this.dolly.curves.lookat.getLUT(this.steps));

		// Create gui folders
		this.guiOrigin = this.gui.addFolder(`origin`);
		this.guiLookat = this.gui.addFolder(`lookat`);

		if (guiOpenOrigin) {
			this.guiOrigin.open();
		}

		if (guiOpenLookat) {
			this.guiLookat.open();
		}
		this.guiLookat.open();

		this.dolly.curves.origin.points.forEach((point, i) => {
			const folder = this.guiOrigin.addFolder(`${i}`);
			folder.open();
			folder.add(point, 'x', -this.range, this.range).onChange(this._rebuild);
			folder.add(point, 'y', -this.range, this.range).onChange(this._rebuild);
			folder.add(point, 'z', -this.range, this.range).onChange(this._rebuild);
		});

		this.dolly.curves.lookat.points.forEach((point, i) => {
			const folder = this.guiLookat.addFolder(`${i}`);
			folder.open();
			folder.add(point, 'x', -this.range, this.range).onChange(this._rebuild);
			folder.add(point, 'y', -this.range, this.range).onChange(this._rebuild);
			folder.add(point, 'z', -this.range, this.range).onChange(this._rebuild);
		});
	}

	_rebuild = () => {
		this.dolly.rebuild();
		this.updateLine('origin', this.dolly.curves.origin.getLUT(this.steps));
		this.updateLine('lookat', this.dolly.curves.lookat.getLUT(this.steps));
		this.updatePoints('origin', this.dolly.curves.origin.points);
		this.updatePoints('lookat', this.dolly.curves.lookat.points);
		this.emit('rebuild');
	}

	flatten(points) {
		let pointsFlat = [];
		points.forEach(point => {
			pointsFlat = pointsFlat.concat([point.x, point.y, point.z]);
		});
		return pointsFlat;
	}

	createPoints(id: string, points: Array<object>) {
		points.forEach((point: any, i) => {
			this.points[id][i] = new Mesh(
				new SphereGeometry(0.2, 4, 5),
				new Shader({
					drawType: DRAW_LINES,
				}),
			);
			this.points[id][i].position.set(point.x, point.y, point.z);
			this.scene.add(this.points[id][i]);
		});
	}

	updatePoints(id: string, points: Array<object>) {
		points.forEach((point: any, i) => {
			this.points[id][i].position.set(point.x, point.y, point.z);
		});
	}

	updateLine(id: string, points: Array<object>) {
		const length = this.lines[id].geometry.vertices.length / 2;
		let i2 = 0;
		let point0;
		let point1;
		for (let i = 0; i < length; i += 1) {
			i2 = i * 2;
			if (i < length) {
				point0 = points[i];
				point1 = points[i + 1];
				this.lines[id].geometry.vertices[i2].set(point0.x, point0.y, point0.z);
				this.lines[id].geometry.vertices[i2 + 1].set(point1.x, point1.y, point1.z);
			}
		}
		this.lines[id].geometry.updateVertices();
	}

	createLine(id: string, points: Array<object>) {
		const bufferVertices = new Float32Array(this.flatten(points));
		this.lines[id] = new Mesh(
			new LineGeometry(bufferVertices),
			new Shader({
				drawType: DRAW_LINES,
			}),
		);
		this.scene.add(this.lines[id]);
	}

	destroy() {
		Object.keys(this.lines).forEach(id => {
			this.scene.remove(this.lines[id], true);
		});
		Object.keys(this.points).forEach(id => {
			this.points[id].forEach(mesh => {
				this.scene.remove(mesh, true);
			});
		});
		this.scene = null;
	}
}

interface ICameraDollyOptions {
	camera: PerspectiveCamera;
	scene: Scene;
	gui: GUI;
	curveSteps: number;
	guiSliderRange: number;
	guiOpen: boolean;
	guiOpenOrigin: boolean;
	guiOpenLookat: boolean;
}

export default class CameraDolly {
	id: string;
	camera: PerspectiveCamera;
	scene: Scene;
	gui: GUI;
	guiFolder: GUI;
	curveSteps: number;
	guiSliderRange: number;
	guiOpen: boolean;
	guiOpenOrigin: boolean;
	guiOpenLookat: boolean;
	dollies: Array<Dolly>;
	helpers: Array<DollyHelper>;
	dolly: string;
	time: number;

	constructor(options: ICameraDollyOptions) {
		this.id = uuid();
		Object.assign(this, options);
		this.dollies = [];
		this.helpers = [];
		this.dolly = '';
		this.time = 0;

		if (this.gui) {
			this.guiFolder = this.gui.addFolder(`Camera Dolly ${this.id}`);
			this.guiFolder.open();
			this.guiFolder.add(this, 'export');
		}
	}

	add(id, data) {
		this.dollies[id] = new Dolly(data.origin, data.lookat, this.curveSteps);
		this.set(id);
		if (this.guiFolder) {
			this.helpers[id] = new DollyHelper(
				this.dollies[id],
				this.scene,
				this.gui,
				this.curveSteps,
				this.guiSliderRange,
				this.guiOpen,
				this.guiOpenOrigin,
				this.guiOpenLookat,
			);
			this.helpers[id].on('rebuild', this.update);
		}
	}

	export() {
		const data = JSON.stringify({
			origin: this.dollies[this.dolly].curves.origin.points,
			lookat: this.dollies[this.dolly].curves.lookat.points,
		}, undefined, 2);
		window.prompt('Copy to clipboard: Ctrl+C, Enter', data);
	}

	set(id) {
		this.dolly = id;
	}

	update = () => {
		const { origin, lookat } = this.dollies[this.dolly].get(this.time);
		this.camera.position.set(origin.x, origin.y, origin.z);
		this.camera.lookAt(lookat.x, lookat.y, lookat.z);
	}

	destroy() {
		Object.keys(this.dollies).forEach(id => {
			this.dollies[id].destroy();
		});
		Object.keys(this.helpers).forEach(id => {
			this.helpers[id].destroy();
		});
	}
}
