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
const light = new DirectionalLight();
light.position.set(1, 1, 1);

// const texture = new Texture({
// 	src: '/assets/textures/texture.jpg',
// });
const geometry = new BoxGeometry(1, 1, 1);
const material = new Shader({
	name: 'Box',
	// hookFragmentPre: `
	// 	uniform sampler2D uTexture0;
	// `,
	// hookFragmentMain: `
	// 	color = texture2D(uTexture0, vUv).rgb;
	// `,
	uniforms: {
		// uTexture0: {
		// 	type: 't',
		// 	value: texture.texture,
		// },
	},
	directionalLights: [light.uniforms],
});
const box = new Mesh(geometry, material);

scene.add(light);
scene.add(box);

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

const grid = new GridHelper(10);
const axis = new AxisHelper(1);

scene.add(grid);
scene.add(axis);

controls.update();

setTimeout(() => {
	scene.remove(box, true);
}, 1000);

// setTimeout(() => {
//
// }, 1200);

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
