import {
	Renderer,
	Scene,
	PerspectiveCamera,
	GridHelper,
	OrbitControls,
	AxisHelper,
	Texture,
	BoxGeometry,
	Shader,
	Mesh,
	TextureCube,
} from '../../../../src/index';
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
	far: 500,
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


const texture = new Texture({
	src: '/assets/textures/texture.jpg',
});

const textureCube = new TextureCube({
	src: [
		'/assets/textures/cube/blackice/px.jpg',
		'/assets/textures/cube/blackice/nx.jpg',
		'/assets/textures/cube/blackice/py.jpg',
		'/assets/textures/cube/blackice/ny.jpg',
		'/assets/textures/cube/blackice/pz.jpg',
		'/assets/textures/cube/blackice/nz.jpg',
	],
});

const geometry = new BoxGeometry();
const material = new Shader({
	name: 'Box',
	hookFragmentPre: `
		uniform sampler2D uTexture0;
		uniform samplerCube uTexture1;
	`,
	hookFragmentMain: `
		color = texture(uTexture0, vUv).rgb;
		color += texture(uTexture1, vec3(0.0)).rgb;
	`,
	uniforms: {
		uTexture0: {
			type: 't',
			value: texture.texture,
			textureIndex: 0,
		},
		uTexture1: {
			type: 'tc',
			value: textureCube.texture,
			textureIndex: 1,
		},
	},
});
const box = new Mesh(geometry, material);
scene.add(box);

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
	camera.ratio = width / height;
	camera.updateProjectionMatrix();
}
resize();

window.addEventListener('resize', resize);

function update() {
	requestAnimationFrame(update);
	renderer.render(scene, camera);
}
update();
