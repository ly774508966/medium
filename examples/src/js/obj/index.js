import {
	Renderer,
	Scene,
	PerspectiveCamera,
	AxisHelper,
	GridHelper,
	OrbitControls,
	ObjLoader,
	Geometry,
	Shader,
	Mesh,
	NormalsHelper,
	Constants as CONSTANTS,
} from 'index';

// Renderer
const renderer = new Renderer();
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
const grid = new GridHelper(10);
scene.add(grid);
const axis = new AxisHelper(1);
scene.add(axis);
controls.update();

// Obj
new ObjLoader('assets/models/sphere.obj').then(objGeometry => {
	const geometry = new Geometry(objGeometry.vertices,
		objGeometry.indices, objGeometry.vertexNormals);
	const material = new Shader({
		drawType: CONSTANTS.DRAW_LINES,
	});

	const mesh = new Mesh(geometry, material);

	const scale = 0.25;
	mesh.scale.set(scale, scale, scale);

	scene.add(mesh);

	// const normalsHelper = new NormalsHelper(geometry);
	// scene.add(normalsHelper);

}).catch(error => {
	console.log('error loading', error);
});

function resize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
}
resize();

window.addEventListener('resize', resize);

function update() {
	requestAnimationFrame(update);
	renderer.render(scene, camera);
}
update();
