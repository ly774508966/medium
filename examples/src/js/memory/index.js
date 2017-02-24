import {
	GL,
	Renderer,
	Scene,
	PerspectiveCamera,
	Mesh,
	Shader,
	BoxGeometry,
	OrbitControls,
	Texture,
} from 'index';
const { guiController } = require('../gui')();

// Renderer
const renderer = new Renderer({
	ratio: window.innerWidth / window.innerHeight,
	prefferedContext: guiController.context,
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

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

controls.update();

let boxes = [];

function removeBox() {
	scene.remove(boxes[0], true);
	boxes = [];
}

let count = 0;

function addBox() {
	const texture = new Texture({
		src: '/assets/textures/texture-nopow2.jpg',
	});
	const geometry = new BoxGeometry(1, 1, 1);
	const material = new Shader({
		name: 'Box',
		hookFragmentPre: `
			uniform sampler2D uTexture0;
		`,
		hookFragmentMain: GL.webgl2 ?
			'color = texture(uTexture0, vUv).rgb;' :
			'color = texture2D(uTexture0, vUv).rgb;',
		uniforms: {
			uTexture0: {
				type: 't',
				value: texture.texture,
			},
		},
	});
	const box = new Mesh(geometry, material);
	box.rotation.x = Math.random();
	box.rotation.y = Math.random();
	box.rotation.z = Math.random();
	scene.add(box);
	boxes.push(box);

	count += 1;

	console.log('boxes', count);
}

setInterval(() => {
	removeBox();
	addBox();
}, 1000);

addBox();

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
