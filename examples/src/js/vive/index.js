import {
	GL,
	Renderer,
	Scene,
	PerspectiveCamera,
	Mesh,
	Shader,
	WebVRVive,
	BoxGeometry,
	GridHelper,
	OrbitControls,
	AxisHelper,
	DirectionalLight,
	Lights,
	Color,
	ShaderChunks,
} from '../../../../src/index';
import {
	Sierpinski,
	jerusalem,
} from '../fractal';
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
const camera = new PerspectiveCamera({
	fov: 45,
});

const z = 6;
camera.position.set(10 * z, 5 * z, 10 * z);
camera.lookAt();

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
		vFogAmount = fogExp2(fogDistance, uFogDensity);
	`,
	hookFragmentPre: `
		in float vFogAmount;
	`,
	hookFragmentEnd: `
		vec3 fogColor = vec3(0.0);
		outgoingColor = vec4(mix(color, fogColor, vFogAmount), 1.0);
	`,
	directionalLights,
}));


mesh.setInstanceCount(totalInstances);

scene.add(mesh);

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

controls.update();

// WebVR
if (WebVRVive.avialable) {
	const btnsContainer = document.createElement('div');
	btnsContainer.classList.add('btns-container');
	btnsContainer.appendChild(WebVRVive.ui.enter);
	btnsContainer.appendChild(WebVRVive.ui.exit);
	btnsContainer.appendChild(WebVRVive.ui.reset);
	document.body.appendChild(btnsContainer);
	document.body.appendChild(WebVRVive.ui.status);

	WebVRVive.setup();
} else {
	console.log('no supported');
}

function resize() {
	let width = window.innerWidth;
	let height = window.innerHeight;

	// if (WebVRVive.available && WebVRVive.vrDisplay.isPresenting) {
	if (WebVRVive.available && WebVRVive.vrDisplay) {
		const leftEye = WebVRVive.getEyeParameters('left');
		const rightEye = WebVRVive.getEyeParameters('right');
		// For simplicity we're going to render both eyes at the same size,
		// even if one eye needs less resolution. You can render each eye at
		// the exact size it needs, but you'll need to adjust the viewports to
		// account for that.
		width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
		height = Math.max(leftEye.renderHeight, rightEye.renderHeight);
	}

	renderer.setSize(width, height);
}
resize();

window.addEventListener('resize', resize);

function update() {
	if (WebVRVive.ready && WebVRVive.vrDisplay.isPresenting) {
		WebVRVive.vrDisplay.requestAnimationFrame(update);

		WebVRVive.getFrameData();

		renderer.renderWebVR(scene,
			WebVRVive.frameData.leftProjectionMatrix,
			WebVRVive.frameData.leftViewMatrix,
			WebVRVive.frameData.rightProjectionMatrix,
			WebVRVive.frameData.rightViewMatrix);
		WebVRVive.vrDisplay.submitFrame();
	} else {
		requestAnimationFrame(update);
		renderer.render(scene, camera);
	}
	// box.rotation.x += 0.01;
	// box.rotation.y += 0.01;
}
update();
