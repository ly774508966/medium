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
	DirectionalLight,
	Color,
	PointLight,
} from 'index';
// import dat from 'dat-gui';

// const gui = new dat.GUI();
// gui.open();

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

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
// const grid = new GridHelper(10);
// scene.add(grid);
// const axis = new AxisHelper(1);
// scene.add(axis);
controls.update();

const directionalLight = new DirectionalLight();

directionalLight.position.set(1, 1, 1);

scene.add(directionalLight);

const pointLight0 = new PointLight();
const pointLight1 = new PointLight();
const pointLight2 = new PointLight();
scene.add(pointLight0);
scene.add(pointLight1);
scene.add(pointLight2);

const lights = [
	pointLight0,
	pointLight1,
	pointLight2,
];

pointLight1.uniforms.color.value[0] = 0;
pointLight1.uniforms.color.value[1] = 0;
pointLight1.uniforms.color.value[2] = 0;

// pointLight2.uniforms.color.value[0] = 0;
// pointLight2.uniforms.color.value[1] = 0;
// pointLight2.uniforms.color.value[2] = 1;

// Obj
new ObjLoader('assets/models/mass.obj').then(objGeometry => {

	console.log('objGeometry', objGeometry);
	const geometry = new Geometry(objGeometry.vertices,
		objGeometry.indices, objGeometry.vertexNormals);

	const material = new Shader({
		// directionalLights: [directionalLight.uniforms],
		pointLights: [pointLight0.uniforms, pointLight1.uniforms, pointLight2.uniforms],
		uniforms: {
			uDiffuse: {
				type: '3f',
				value: new Color(0x000000).v,
			},
		},
	});

	const mesh = new Mesh(geometry, material);

	const scale = 0.25;
	mesh.scale.set(scale, scale, scale);
	scene.add(mesh);

	gui.add(mesh.position, 'y', -10, 10);

	// const normalsHelper = new NormalsHelper(mesh);
	// scene.add(normalsHelper);
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

function update(time) {
	requestAnimationFrame(update);

	const radius = 20;
	const t = time * 0.0005;

	lights.forEach((light, i) => {
		const theta = (i / lights.length) * Math.PI * 2;
		const x = Math.cos(t + theta) * radius;
		const y = Math.cos(t + theta) * radius;
		const z = Math.sin(t + theta) * radius;
		light.position.set(x, y, z);
	});

	renderer.render(scene, camera);
}
update();
