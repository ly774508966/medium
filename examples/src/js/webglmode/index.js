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
	Lights,
} from 'index';
import dat from 'dat-gui';

// Renderer
const renderer = new Renderer({
	ratio: window.innerWidth / window.innerHeight,
	prefferedContext: 'webgl',
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

const plane = new Mesh(geometry, material1);
plane.position.z = 2;
const planeNormalsHelper = new NormalsHelper(plane);
scene.add(planeNormalsHelper);
planeNormalsHelper.setParent(plane);
scene.add(plane);

colors = [];
for (let i = 0; i < 6; i++) {
	for (let j = 0; j < 3; j++) {
		colors = colors.concat([Math.random(), Math.random(), Math.random()]);
	}
}

const pointLights = new Lights([
	new PointLight({
		intensity: {
			type: 'f',
			value: 0.7,
		},
		color: {
			type: '3f',
			value: new Color(0xff0000).v,
		},
	}),
	new PointLight({
		intensity: {
			type: 'f',
			value: 0.7,
		},
		color: {
			type: '3f',
			value: new Color(0x00FF00).v,
		},
	}),
]);

const directionalLights = new Lights([
	new DirectionalLight({
		intensity: {
			type: 'f',
			value: 0.7,
		},
		color: {
			type: '3f',
			value: new Color(0x0000ff).v,
		},
	}),
	new DirectionalLight({
		intensity: {
			type: 'f',
			value: 0.7,
		},
		color: {
			type: '3f',
			value: new Color(0x00ffff).v,
		},
	}),
]);

directionalLights.get()[0].position.set(0, 1, 0);
directionalLights.get()[1].position.set(0, -1, 0);

scene.pointLights = pointLights;
scene.directionalLights = directionalLights;

const texture = new Texture({
	src: '/assets/textures/texture.jpg',
});
geometry = new BoxGeometry();
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
	directionalLights,
	pointLights,
});
const box = new Mesh(geometry, material);

scene.add(box);

box.position.x = 3;
box.position.y = 3;

const boxNormalsHelper = new NormalsHelper(box);
scene.add(boxNormalsHelper);

boxNormalsHelper.setParent(box);

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
const gui = new dat.GUI();
const cameraGUI = gui.addFolder('camera');
cameraGUI.open();
const lightingGUI = gui.addFolder('lighting');
lightingGUI.open();

// const range = 10;
// lightingGUI.add(light.position, 'x', -range, range);
// lightingGUI.add(light.position, 'y', -range, range);
// lightingGUI.add(light.position, 'z', -range, range);

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
	plane.rotation.x += 0.01;
	plane.rotation.y += 0.01;

	const radius = 30;
	const t = time * 0.0005;

	// pointLights.get().forEach((light, i) => {
	// 	const theta = (i / pointLights.length) * Math.PI * 2;
	// 	const x = Math.cos(t + theta) * radius;
	// 	const y = Math.cos(t + theta) * radius;
	// 	const z = Math.sin(t + theta) * radius;
	// 	light.position.set(x, y, z);
	// });

	renderer.render(scene, camera);
}
update();
