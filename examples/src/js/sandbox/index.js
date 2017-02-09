import {
	Renderer,
	Scene,
	PerspectiveCamera,
	Mesh,
	Shader,
	PlaneGeometry,
	BoxGeometry,
	SphereGeometry,
	GridHelper,
	OrbitControls,
	AxisHelper,
	NormalsHelper,
	DirectionalLight,
	PointLight,
	Texture,
	Color,
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
});

// const plane = new Mesh(geometry, material1);
// plane.position.z = 2;
// const planeNormalsHelper = new NormalsHelper(plane);
// scene.add(planeNormalsHelper);
// planeNormalsHelper.setParent(plane);
// scene.add(plane);

colors = [];
for (let i = 0; i < 6; i++) {
	for (let j = 0; j < 3; j++) {
		colors = colors.concat([Math.random(), Math.random(), Math.random()]);
	}
}

const light = new DirectionalLight();
light.position.set(1, 1, 1);

const pointLight0 = new PointLight({
	intensity: {
		type: 'f',
		value: 0.7,
	},
	color: {
		type: '3f',
		value: new Color(0xff0000).v,
	},
});

const directionalLights = [
	light,
];

const pointLights = [
	pointLight0,
];

const texture = new Texture({
	src: '/assets/textures/texture.jpg',
});
geometry = new SphereGeometry(3, 32, 32);
const material = new Shader({
	name: 'Box',
	// hookFragmentPre: `
	// 	uniform sampler2D uTexture0;
	// `,
	// hookFragmentMain: `
	// 	color = texture(uTexture0, vUv).rgb;
	// `,
	uniforms: {
		// uTexture0: {
		// 	type: 't',
		// 	value: texture.texture,
		// },
	},
	// directionalLights,
	pointLights,
});
const box = new Mesh(geometry, material);

scene.add(box);

box.position.x = 1;
box.position.y = 1;

// const boxNormalsHelper = new NormalsHelper(box);
// scene.add(boxNormalsHelper);

// boxNormalsHelper.setParent(box);

// directionalLights.forEach(light => {
// 	scene.add(light);
// });

pointLights.forEach(light => {
	scene.add(light);
});

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
const gui = new dat.GUI();
const cameraGUI = gui.addFolder('camera');
cameraGUI.open();
const lightingGUI = gui.addFolder('lighting');
lightingGUI.open();

const range = 10;
lightingGUI.add(light.position, 'x', -range, range);
lightingGUI.add(light.position, 'y', -range, range);
lightingGUI.add(light.position, 'z', -range, range);

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

function update(time) {
	requestAnimationFrame(update);
	box.rotation.x += 0.01;
	box.rotation.y += 0.01;
	// plane.rotation.x += 0.01;
	// plane.rotation.y += 0.01;

	const radius = 30;
	const t = time * 0.0005;

	pointLights.forEach((light, i) => {
		const theta0 = (i / pointLights.length) * Math.PI * 2;
		const theta1 = ((i + 1) / pointLights.length) * Math.PI * 2;
		const x0 = Math.cos(t + theta0) * radius;
		const y0 = Math.cos(t + theta0) * radius;
		const z0 = Math.sin(t + theta0) * radius;
		const x1 = Math.cos(t + theta1) * radius;
		const y1 = Math.cos(t + theta1) * radius;
		const z1 = Math.sin(t + theta1) * radius;
		light.position.set(x0, y0, z0);
		light.position1.set(x1, y1, z1);
	});

	renderer.render(scene, camera);
}
update();
