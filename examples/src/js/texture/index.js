import {
	Renderer,
	Scene,
	PerspectiveCamera,
	Mesh,
	Shader,
	PlaneGeometry,
	GridHelper,
	OrbitControls,
	AxisHelper,
	Texture,
} from 'index';

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

const texture = new Texture({
	src: '/assets/textures/texture-nopow2.jpg',
});

const geometry = new PlaneGeometry(1, 1, colors);
const material1 = new Shader({
	name: 'Plane',
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
});

const plane = new Mesh(geometry, material1);
scene.add(plane);

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);
//
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
	renderer.render(scene, camera);
}
update();
