import {
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
	Color,
	ShaderChunks,
} from 'index';
import {
	Sierpinski,
} from '../fractal';

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

const z = 6;
camera.position.set(10 * z, 5 * z, 10 * z);
camera.lookAt();

const light = new DirectionalLight();
light.position.set(1, 1, 1);

const sierpinski = new Sierpinski();

const holes = [7, 11, 12, 13, 17, 27, 32, 35, 36, 37, 38, 39, 42, 47, 51, 52, 53, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 77, 81, 82, 83, 85, 86, 87, 88, 89, 91, 92, 93, 97, 107, 111, 112, 113, 117];

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
		outputColor = vec4(mix(color, fogColor, vFogAmount), 1.0);
	`,
	directionalLights: [light.uniforms],
}));


mesh.setInstanceCount(totalInstances);

scene.add(light);
scene.add(mesh);


// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
// const gui = new dat.GUI();
// const cameraGUI = gui.addFolder('camera');
// cameraGUI.open();
// const lightingGUI = gui.addFolder('lighting');
// lightingGUI.open();

// const range = 10;
// gui.add(box.position, 'x', -range, range);
// gui.add(box.position, 'y', -range, range);
// gui.add(box.position, 'z', -range, range);

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
