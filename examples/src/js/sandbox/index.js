import {
	Renderer,
	Scene,
	PerspectiveCamera,
	Mesh,
	Shader,
	PlaneGeometry,
	BoxGeometry,
	GridHelper,
	OrbitControls,
	AxisHelper,
	NormalsHelper,
	DirectionalLight,
	Texture,
} from 'index';
import dat from 'dat-gui';

// Renderer
const renderer = new Renderer({
	ratio: window.innerWidth / window.innerHeight,
});
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
colors = colors.concat([1, 0, 0]);
colors = colors.concat([0, 1, 0]);
colors = colors.concat([0, 0, 1]);
colors = colors.concat([1, 1, 0]);

let geometry = new PlaneGeometry(1, 1, colors);
const material1 = new Shader({
	name: 'Plane',
	// drawType: CONSTANTS.DRAW_LINES,
});

const plane = new Mesh(geometry, material1);
// const material2 = new Shader();
// const plane2 = new Mesh(geometry, material2);

plane.position.z = 2;
// plane2.position.z = 1.1;

const planeNormalsHelper = new NormalsHelper(plane);
scene.add(planeNormalsHelper);


scene.add(plane);
// scene.add(plane2);

colors = [];
for (let i = 0; i < 6; i++) {
	for (let j = 0; j < 3; j++) {
		colors = colors.concat([Math.random(), Math.random(), Math.random()]);
	}
}

const light = new DirectionalLight();
light.position.set(1, 1, 1);

const texture = new Texture({
	src: '/assets/textures/texture.jpg',
});
geometry = new BoxGeometry(1, 1, 1);
const material = new Shader({
	name: 'Box',
	hookFragmentPre: `
		uniform sampler2D uTexture0;
	`,
	hookFragmentMain: `
		color = texture2D(uTexture0, vUv).rgb;
	`,
	uniforms: {
		uTexture0: {
			type: 't',
			value: texture.texture,
		},
	},
	directionalLights: [light.uniforms],
});
const box = new Mesh(geometry, material);

scene.add(light);
scene.add(box);

box.position.x = 3;
box.position.y = 3;

const boxNormalsHelper = new NormalsHelper(box);
scene.add(boxNormalsHelper);


// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
const gui = new dat.GUI();
const cameraGUI = gui.addFolder('camera');
cameraGUI.open();
const lightingGUI = gui.addFolder('lighting');
lightingGUI.open();

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

controls.update();

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
}
resize();

window.addEventListener('resize', resize);

function update() {
	requestAnimationFrame(update);
	box.rotation.x += 0.01;
	box.rotation.y += 0.01;
	renderer.render(scene, camera);
}
update();
