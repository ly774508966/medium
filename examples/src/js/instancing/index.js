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
	Constants,
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

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

controls.update();

// Content
const totalInstances = 20;
const geometry = new BoxGeometry();

const data = new Float32Array(totalInstances * 3);
const range = 10;
let i3 = 0;
for (let i = 0; i < totalInstances; i++) {
	i3 = i * 3;
	data[i3] = Math.random() * range;
	data[i3 + 1] = Math.random() * range;
	data[i3 + 2] = Math.random() * range;
}

geometry.addInstancedBufferAttribute('offset', data, 3);

const mesh = new Mesh(geometry, new Shader({
	uniforms: {
		uDiffuse: {
			type: '3f',
			value: new Color(0xFF0000).v,
		},
	},
	hookVertexPre: `
		attribute vec3 aOffset;
	`,
	hookVertexMain: `
		transformed = aOffset;
	`,
	drawType: Constants.DRAW_LINES,
}));

mesh.setInstanceCount(totalInstances);

console.log('mesh', mesh);


scene.add(mesh);

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
