import {
	Renderer,
	Scene,
	PerspectiveCamera,
	Mesh,
	Shader,
	BoxGeometry,
	GridHelper,
	OrbitControls,
	AxisHelper,
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

const light = new DirectionalLight();
light.position.set(1, 1, 1);

const texture = new Texture({
	src: '/assets/textures/texture.jpg',
});
const geometry = new BoxGeometry(1, 1, 1);
const material = new Shader({
	name: 'Box',
	hookFragmentPre: `
		uniform sampler2D uTexture0;
	`,
	hookFragmentMain: `
		color = texture(uTexture0, vUv).rgb;
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

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
const gui = new dat.GUI();
const cameraGUI = gui.addFolder('camera');
cameraGUI.open();
const lightingGUI = gui.addFolder('lighting');
lightingGUI.open();

const range = 10;
gui.add(box.position, 'x', -range, range);
gui.add(box.position, 'y', -range, range);
gui.add(box.position, 'z', -range, range);

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
	// plane.rotation.x += 0.01;
	// plane.rotation.y += 0.01;
	renderer.render(scene, camera);
}
update();
