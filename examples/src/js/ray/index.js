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
	Color,
	DirectionalLight,
	RayCaster,
	Vector2,
	SphereGeometry,
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

const light = new DirectionalLight();
light.position.set(0.75, 1, 0.75);

const geometry = new BoxGeometry(1, 1, 1);
const material = new Shader({
	name: 'Box',
	uniforms: {
		uDiffuse: {
			type: '3f',
			value: new Color(0xFF0000).v,
		},
	},
	directionalLights: [light.uniforms],
});
const box = new Mesh(geometry, material);

// box.position.z = 2;

const sphere = new Mesh(new SphereGeometry(0.2), new Shader({
	uniforms: {
		uDiffuse: {
			type: '3f',
			value: new Color(0x00FF00).v,
		},
	},
}));

sphere.position.y = 2;

scene.add(light);
scene.add(box);
scene.add(sphere);

const raycaster = new RayCaster();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

controls.update();

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
}
resize();

const mouse = new Vector2();

function onMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = (event.pageY / window.innerHeight) * 2 - 1;
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', onMouseMove);

function update() {
	requestAnimationFrame(update);

	raycaster.setFromCamera(mouse, camera);
	const intersect = raycaster.intersectObject(box);

	if (intersect) {
		sphere.position.copy(intersect);
	}

	renderer.render(scene, camera);
}
update();
