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
	ShaderChunks,
	Lights,
} from 'index';
import { Sierpinski } from '../fractal';
import dat from 'dat-gui';

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
	far: 500,
});

const s = 2;
camera.position.set(20 * s, 5 * s, 20 * s);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

// const grid = new GridHelper(10);
// scene.add(grid);

// const axis = new AxisHelper(1);
// scene.add(axis);

controls.update();

// Content

const directionalLights = new Lights([
	new DirectionalLight({
		intensity: {
			type: 'f',
			value: 1,
		},
		color: {
			type: '3f',
			value: new Color(0xcccccc).v,
		},
	}),
]);

directionalLights.get()[0].position.set(0.1, 1, 0.1);

scene.directionalLights = directionalLights;

const sierpinski = new Sierpinski();

let holes = [];
for (let i = 0; i < 27; i++) {
	holes.push(i);
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

holes = shuffle(holes);
// holes = holes.splice(0, 10);
holes = [7, 11, 12, 13, 17, 27, 32, 35, 36, 37, 38, 39, 42, 47, 51, 52, 53, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 77, 81, 82, 83, 85, 86, 87, 88, 89, 91, 92, 93, 97, 107, 111, 112, 113, 117];

const positions = sierpinski.generate(40, 2, 5, holes);

const totalInstances = positions.length;
const data = new Float32Array(totalInstances * 3);
let i3 = 0;
for (let i = 0; i < totalInstances; i++) {
	i3 = i * 3;
	data[i3] = positions[i][0];
	data[i3 + 1] = positions[i][1];
	data[i3 + 2] = positions[i][2];
}

console.log('data', data.length / 3);

const size = sierpinski.logarithmicScale() / 2;
const geometry = new BoxGeometry(size, size, size);
geometry.addInstancedBufferAttribute('aOffset', data, 3);

const mesh = new Mesh(geometry, new Shader({
	uniforms: {
		uDiffuse: {
			type: '3f',
			value: new Color(0xFFFFFF).v,
		},
		uFogStart: {
			type: 'f',
			value: 0.0,
		},
		uFogEnd: {
			type: 'f',
			value: 50.0,
		},
		uFogDensity: {
			type: 'f',
			// value: 0.054,
			value: 0.027,
		},
	},
	hookVertexPre: `
		in vec3 aOffset;
		uniform float uFogStart;
		uniform float uFogEnd;
		uniform float uFogDensity;
		out float vFogAmount;
		${ShaderChunks.Fog.exp2}
	`,
	hookVertexMain: `
		transformed = aOffset;
	`,
	hookVertexEnd: `
		float fogDistance = length(gl_Position.xyz);
		// vFogAmount = fogLinear(fogDistance, uFogStart, uFogEnd);
		vFogAmount = fogExp2(fogDistance, uFogDensity);
		//vFogAmount = 0.0;
	`,
	hookFragmentPre: `
		in float vFogAmount;
	`,
	hookFragmentEnd: `
		vec3 fogColor = vec3(0.0);
		outputColor = vec4(mix(color, fogColor, vFogAmount), 1.0);
	`,
	// drawType: Constants.DRAW_LINES,
	directionalLights,
}));


mesh.setInstanceCount(totalInstances);

scene.add(mesh);

const gui = new dat.GUI();
gui.open();

gui.add(mesh.shader.uniforms.uFogDensity, 'value', 0, 0.1);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
}
resize();

window.addEventListener('resize', resize);

// let t = 0;
// const range = Math.PI * 0.5;
// const radius = 2;
function update(time) {
	requestAnimationFrame(update);
	// t = time * 0.0002;
	// camera.position.x = Math.cos(t) * radius;
	// camera.position.y = MathUtils.lerp(-range, range, Math.sin(t) * 0.5 + 0.5);
	// camera.position.z = Math.sin(t) * radius;
	renderer.render(scene, camera);
}
update();
