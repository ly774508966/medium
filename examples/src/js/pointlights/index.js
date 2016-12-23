import {
	Renderer,
	Scene,
	PerspectiveCamera,
	AxisHelper,
	GridHelper,
	OrbitControls,
	ObjLoader,
	Geometry,
	SphereGeometry,
	Shader,
	Mesh,
	NormalsHelper,
	// BoxGeometry,
	Constants as CONSTANTS,
	DirectionalLight,
	PointLight,
	Color,
} from 'index';
import dat from 'dat-gui';

const gui = new dat.GUI();
gui.open();

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
const grid = new GridHelper(10);
scene.add(grid);
const axis = new AxisHelper(1);
scene.add(axis);
controls.update();

const directionalLight = new DirectionalLight();
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

pointLight0.uniforms.color.value[0] = 1;
pointLight0.uniforms.color.value[1] = 0;
pointLight0.uniforms.color.value[2] = 0;

pointLight1.uniforms.color.value[0] = 0;
pointLight1.uniforms.color.value[1] = 1;
pointLight1.uniforms.color.value[2] = 0;

pointLight2.uniforms.color.value[0] = 0;
pointLight2.uniforms.color.value[1] = 0;
pointLight2.uniforms.color.value[2] = 1;


// pointLight0.position.set(10, 10, 10);
// pointLight1.position.set(-10, -10, -10);

// const range = 10;
// gui.add(pointLight.position, 'x', -range, range);
// gui.add(pointLight.position, 'y', -range, range);
// gui.add(pointLight.position, 'z', -range, range);

const material = new Shader({
	pointLights: [pointLight0.uniforms, pointLight1.uniforms, pointLight2.uniforms],
	uniforms: Object.assign({
			uDiffuse: {
				type: '3f',
				value: new Color(0x000000).v,
			},
			uCameraPosition: {
				type: '3f',
				value: camera.position.v,
			},
		},
		directionalLight.uniforms,
	),
	// drawType: CONSTANTS.DRAW_LINES,
});

const geometry = new SphereGeometry(10, 64, 64);
let mesh;
mesh = new Mesh(geometry, material);

const scale = 0.25;
mesh.scale.set(scale, scale, scale);

scene.add(mesh);

gui.add(mesh.position, 'y', -10, 10);

// const normalsHelper = new NormalsHelper(mesh);
// scene.add(normalsHelper);

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

	// if (mesh) {
	// 	mesh.shader.uniforms.uCameraPosition.value[0] = camera.position.x;
	// 	mesh.shader.uniforms.uCameraPosition.value[1] = camera.position.y;
	// 	mesh.shader.uniforms.uCameraPosition.value[2] = camera.position.z;
	// }

	renderer.render(scene, camera);
}
update();
