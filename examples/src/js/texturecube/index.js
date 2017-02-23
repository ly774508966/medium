import {
	GL,
	Renderer,
	Scene,
	PerspectiveCamera,
	GridHelper,
	OrbitControls,
	AxisHelper,
	OrthographicCamera,
	TextureCube,
	Shader,
	Mesh,
	ObjLoader,
	Geometry,
} from 'index';
import {
	guiController,
} from '../gui';

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

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

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
		hookFragmentPre: GL.webgl2 ? `
			uniform samplerCube uTexture0;
		` : `
			uniform samplerCube uTexture0;
		`,
		hookFragmentMain: GL.webgl2 ?
		'color = texture(uTexture0, vNormal).rgb;' :
		'color = textureCube(uTexture0, vNormal).rgb;',
		uniforms: {
			uTexture0: {
				type: 'tc',
				value: texture.texture,
				textureIndex: 0,
			},
		},
	});

	mesh = new Mesh(geometry, material);

	const scale = 0.25;
	mesh.scale.set(scale, scale, scale);
	scene.add(mesh);
}).catch(error => {
	console.log('error loading', error);
});

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
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
