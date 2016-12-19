import {
	Renderer,
	Scene,
	PerspectiveCamera,
	Mesh,
	Shader,
	PlaneGeometry,
	BoxGeometry,
	Grid,
	OrbitControls,
	Axis,
	Constants as CONSTANTS,
} from 'index';
import dat from 'dat-gui';

// Renderer
const renderer = new Renderer();
renderer.setDevicePixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.canvas);

// Scene
const scene = new Scene();

// Camera
const camera = new PerspectiveCamera({
	fov: 45,
});

camera.position.set(10, 5, 10);
camera.lookAt();

// Objects
let colors = [];
colors = colors.concat([1, 0, 0, 1.0]);
colors = colors.concat([0, 1, 0, 1.0]);
colors = colors.concat([0, 0, 1, 1.0]);
colors = colors.concat([1, 1, 0, 1.0]);

let geometry = new PlaneGeometry(1, 1, colors);
const material1 = new Shader({
	drawType: CONSTANTS.DRAW_LINES,
});

const plane = new Mesh(geometry, material1);
const material2 = new Shader();
const plane2 = new Mesh(geometry, material2);

plane.position.x = 2;
plane2.position.z = 1.1;

scene.add(plane);
scene.add(plane2);

colors = [];
for (let i = 0; i < 6; i++) {
	for (let j = 0; j < 4; j++) {
		colors = colors.concat([Math.random(), Math.random(), Math.random(), 1.0]);
	}
}

geometry = new BoxGeometry(1, 1, 1, colors);
const material = new Shader({
});
const box = new Mesh(geometry, material);

scene.add(box);

box.position.x = 3;
box.position.y = 3;

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
const gui = new dat.GUI();
const cameraGUI = gui.addFolder('camera');
cameraGUI.open();
const lightingGUI = gui.addFolder('lighting');
lightingGUI.open();

const grid = new Grid(10);
scene.add(grid);

const axis = new Axis(1);
scene.add(axis);

controls.update();

function resize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
}
resize();

window.addEventListener('resize', resize);

function update() {
	requestAnimationFrame(update);
	renderer.render(scene, camera);
}
update();
