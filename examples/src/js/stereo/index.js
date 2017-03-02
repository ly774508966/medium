import {
	GL,
	Renderer,
	Scene,
	PerspectiveCamera,
	Mesh,
	Shader,
	BoxGeometry,
	OrbitControls,
	Color,
	DirectionalLight,
	ShaderChunks,
	Lights,
} from '../../../../src/index';
import {
	Sierpinski,
	jerusalem,
} from '../fractal';
const { gui, guiController } = require('../gui')();

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
const cameraL = new PerspectiveCamera({
	fov: 20,
	far: 100000,
});
const cameraR = new PerspectiveCamera({
	fov: cameraL.fov,
	far: 100000,
});

const s = 0.3;
cameraL.position.set(20 * s, 5 * s, 20 * s);
cameraL.lookAt();

cameraR.position.set(20 * s, 5 * s, 20 * s);
cameraR.lookAt();

// Helpers
const controlsL = new OrbitControls(cameraL, renderer.canvas);
const controlsR = new OrbitControls(cameraR, renderer.canvas);

controlsL.update();
controlsR.update();

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

const positions = sierpinski.generate(40, 2, 5, jerusalem);

const totalInstances = positions.length;
const data = new Float32Array(totalInstances * 3);
let i3 = 0;
for (let i = 0; i < totalInstances; i += 1) {
	i3 = i * 3;
	data[i3] = positions[i][0];
	data[i3 + 1] = positions[i][1];
	data[i3 + 2] = positions[i][2];
}

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
	hookVertexPre: GL.webgl2 ? `
		in vec3 aOffset;
		uniform float uFogStart;
		uniform float uFogEnd;
		uniform float uFogDensity;
		out float vFogAmount;
		${ShaderChunks.Fog.exp2}
	` : `
		attribute vec3 aOffset;
		uniform float uFogStart;
		uniform float uFogEnd;
		uniform float uFogDensity;
		varying float vFogAmount;
		${ShaderChunks.Fog.exp2}
	`,
	hookVertexMain: `
		transformed = aOffset;
	`,
	hookVertexEnd: `
		float fogDistance = length(gl_Position.xyz);
		vFogAmount = fogExp2(fogDistance, uFogDensity);
	`,
	hookFragmentPre: GL.webgl2 ?
		'in float vFogAmount;' :
		'varying float vFogAmount;',
	hookFragmentEnd: GL.webgl2 ? `
		vec3 fogColor = vec3(0.0);
		outputColor = vec4(mix(color, fogColor, vFogAmount), 1.0);
	` : `
		vec3 fogColor = vec3(0.0);
		gl_FragColor = vec4(mix(color, fogColor, vFogAmount), 1.0);
	`,
	directionalLights,
}));


mesh.setInstanceCount(totalInstances);

scene.add(mesh);

const controller = {
	fov: cameraL.fov,
};

gui.add(mesh.shader.uniforms.uFogDensity, 'value', 0, 0.1);
gui.add(controller, 'fov', 0, 100).onChange(val => {
	cameraL.fov = val;
	cameraR.fov = val;
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
	renderer.renderStereo(scene,
		cameraL.projectionMatrix,
		scene.modelViewMatrix,
		cameraR.projectionMatrix,
		scene.modelViewMatrix,
		cameraL,
		cameraR);
}
update();
