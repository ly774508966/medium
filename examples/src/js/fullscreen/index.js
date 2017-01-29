import {
	Renderer,
	Scene,
	OrthographicCamera,
	Mesh,
	Shader,
	PlaneGeometry,
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
const camera = new OrthographicCamera();
camera.position.set(0, 0, 1);

const geometry = new PlaneGeometry(1, 1);
const material = new Shader({
	name: 'Plane',
	hookFragmentEnd: `
		outputColor = vec4(vUv, 1.0, 1.0);
 `,
});

const plane = new Mesh(geometry, material);

scene.add(plane);

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
