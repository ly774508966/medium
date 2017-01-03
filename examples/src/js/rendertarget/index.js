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
	OrthographicCamera,
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


// Camera
const cameras = {
	dev: new PerspectiveCamera({
		fov: 45,
	}),
	main: new OrthographicCamera({
		fov: 45,
	}),
};

cameras.dev.position.set(10, 5, 10);
cameras.dev.lookAt();

cameras.main.position.set(0, 0, 1);
cameras.main.lookAt(0, 0, 0);

// Helpers
const controls = new OrbitControls(cameras.dev, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

controls.update();

const material = new Shader({
	uniforms: {
		uTexture0: {
			type: 't',
			value: renderTarget.texture,
		},
		uTime: {
			type: 'f',
			value: 0,
		},
	},
	fragmentShader,
});

const plane = new Mesh(new PlaneGeometry(1, 1), material);
scene2.add(plane);

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
}
resize();

window.addEventListener('resize', resize);

function update(time) {
	requestAnimationFrame(update);

	const t = time * 0.2;

	plane.shader.uniforms.uTime.value = t * 0.01;

	renderTarget.render(scene, cameras.dev);

	renderer.render(scene2, cameras.main);
}
update();
