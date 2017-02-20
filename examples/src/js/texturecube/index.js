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
		'/assets/textures/cube/px.jpg',
		'/assets/textures/cube/nx.jpg',
		'/assets/textures/cube/py.jpg',
		'/assets/textures/cube/ny.jpg',
		'/assets/textures/cube/pz.jpg',
		'/assets/textures/cube/nz.jpg',
	],
});

let mesh;

new ObjLoader('assets/models/mass.obj').then(objGeometry => {
	const geometry = new Geometry(objGeometry.vertices,
		objGeometry.indices, objGeometry.vertexNormals);

	const material = new Shader({
		hookVertexPre: GL.webgl2 ?
		'out vec3 vTexturePosition;' :
		'varying vec3 vTexturePosition;',
		hookVertexEnd: `
			vTexturePosition = (uModelMatrix * vec4(aVertexPosition, 1.0)).xyz;
		`,
		hookFragmentPre: GL.webgl2 ? `
			uniform samplerCube uTexture0;
			in vec3 vTexturePosition;
		` : `
			uniform samplerCube uTexture0;
			varying vec3 vTexturePosition;
		`,
		hookFragmentMain: GL.webgl2 ?
		'color = texture(uTexture0, vTexturePosition).rgb;' :
		'color = textureCube(uTexture0, vTexturePosition).rgb;',
		uniforms: {
			uTexture0: {
				type: 'tc',
				value: texture.texture,
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
