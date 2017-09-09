import {
	Renderer,
	Scene,
	PerspectiveCamera,
	GridHelper,
	OrbitControls,
	AxisHelper,
	CameraHelper,
	CameraDolly,
} from '../../../../src/index.ts';
import data0 from './data0.json';
import data1 from './data1.json';

const {
	gui,
	guiController
} = require('../gui')();

guiController.debug = true;
gui.add(guiController, 'debug');

// Renderer
const renderer = new Renderer({
	ratio: window.innerWidth / window.innerHeight,
	prefferedContext: guiController.context
});
renderer.setDevicePixelRatio(window.devicePixelRatio);
renderer.setSissorTest(true);
document.body.appendChild(renderer.canvas);

// Scene
const scene = new Scene();

// Camera
const cameras = {
	dev: new PerspectiveCamera({
		fov: 45,
		far: 500,
		ratio: window.innerWidth / window.innerHeight
	}),
	main: new PerspectiveCamera({
		fov: 45,
		far: 500,
		ratio: window.innerWidth / window.innerHeight
	})
}

const zoom = 5;
cameras.dev.position.set(10 * zoom, 5 * zoom, 10 * zoom);
cameras.dev.lookAt();

cameras.main.position.set(10 * zoom, 5 * zoom, 10 * zoom);
cameras.main.lookAt();

const cameraDolly = new CameraDolly({
	camera: cameras.main,
	scene,
	gui,
	curveSteps: 50,
	guiSliderRange: 100,
	guiOpen: false,
	guiOpenOrigin: false,
	guiOpenLookat: false,
});
cameraDolly.add('0', data0);
cameraDolly.add('1', data1);

gui.add(cameraDolly, 'destroy');

const keys = Object.keys(cameraDolly.dollies);

gui.add(cameraDolly, 'dolly', keys).onChange(() => {
	cameraDolly.update();
});

gui.add(cameraDolly, 'time', 0, 1).onChange(val => {
	cameraDolly.update();
});

cameraDolly.update();

// Helpers
const controls = new OrbitControls(cameras.dev, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

const cameraHelper = new CameraHelper(cameras.main);
scene.add(cameraHelper);

controls.update();

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
	cameras.dev.ratio = width / height;
	cameras.dev.updateProjectionMatrix();
	cameras.main.ratio = width / height;
	cameras.main.updateProjectionMatrix();

}
resize();

window.addEventListener('resize', resize);

function render(camera, x, y, width, height) {
	renderer.setSissor(
		x,
		y,
		width * window.innerWidth,
		height * window.innerHeight
	);
	renderer.setViewport(
		x,
		y,
		width * window.innerWidth,
		height * window.innerHeight
	);
	renderer.render(scene, camera);
}

function update() {
	requestAnimationFrame(update);

	cameraHelper.update();

	cameras.dev.updateMatrixWorld();
	cameras.main.updateMatrixWorld();

	if (guiController.debug) {
		render(cameras.dev, 0, 0, 1, 1);
		render(cameras.main, 0, 0, 0.25, 0.25);
	} else {
		render(cameras.main, 0, 0, 1, 1);
	}
}
update();
