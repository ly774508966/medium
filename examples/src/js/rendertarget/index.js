import {
	Renderer,
	Scene,
	PerspectiveCamera,
	GridHelper,
	OrbitControls,
	AxisHelper,
	RenderTarget,
	Shader,
	Mesh,
	PlaneGeometry,
	BoxGeometry,
} from 'index';
import {
	fragmentShader,
} from './shader.glsl';

// Renderer
const renderer = new Renderer({
	ratio: window.innerWidth / window.innerHeight,
});
renderer.setDevicePixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.canvas);

// Render target
const renderTarget = new RenderTarget({
	width: window.innerWidth,
	height: window.innerHeight,
});

// Scene
const scene = new Scene();
const scene2 = new Scene();

const boxGeometry = new BoxGeometry(1, 1, 1);
const boxMaterial = new Shader({
});
const box = new Mesh(boxGeometry, boxMaterial);
scene2.add(box);

// Camera
const camera = new PerspectiveCamera({
	fov: 45,
});

camera.position.set(10, 5, 10);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

controls.update();

const material = new Shader({
	uniforms: {
		texture0: {
			type: 't',
			value: renderTarget.texture,
		},
	},
	fragmentShader,
});

const plane = new Mesh(new PlaneGeometry(2, 2), material);
scene.add(plane);

plane.position.y = 3;

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
}
resize();

window.addEventListener('resize', resize);

function update() {
	requestAnimationFrame(update);

	renderTarget.render(scene, camera);

	renderer.render(scene, camera);
}
update();
