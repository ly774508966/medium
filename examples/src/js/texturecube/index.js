import {
	GL,
	Renderer,
	Scene,
	PerspectiveCamera,
	OrbitControls,
	OrthographicCamera,
	TextureCube,
	Shader,
	Mesh,
	ObjLoader,
	Geometry,
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

controls.update();

const texture = new TextureCube({
	src: [
		'/assets/textures/cube/blackice/px.jpg',
		'/assets/textures/cube/blackice/nx.jpg',
		'/assets/textures/cube/blackice/py.jpg',
		'/assets/textures/cube/blackice/ny.jpg',
		'/assets/textures/cube/blackice/pz.jpg',
		'/assets/textures/cube/blackice/nz.jpg',
	],
});

let mesh;

new ObjLoader('assets/models/mass.obj').then(objGeometry => {
	const geometry = new Geometry(objGeometry.vertices,
		objGeometry.indices, objGeometry.vertexNormals);

	const material = new Shader({
		hookFragmentPre: `
			uniform samplerCube uTexture0;
		`,
		hookFragmentMain: `
			color = texture(uTexture0, vNormal).rgb;
		`,
		uniforms: {
			uTexture0: {
				type: 'tc',
				value: texture.texture,
			},
		},
	});

	mesh = new Mesh(geometry, material);

	const scale = 2.25;
	mesh.scale.set(scale, scale, scale);
	scene.add(mesh);
}).catch(error => {
	console.log('error loading', error);
});

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
	cameras.dev.ratio = width / height;
	cameras.dev.updateProjectionMatrix();
}
resize();

window.addEventListener('resize', resize);

function update() {
	requestAnimationFrame(update);

	if (mesh) {
		mesh.rotation.y += 0.003;
	}

	renderer.render(scene, cameras.dev);
}
update();
