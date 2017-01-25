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
	NormalsHelper,
	DirectionalLight,
	Texture,
} from 'index';
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
});

camera.position.set(10, 5, 10);
camera.lookAt();

const light = new DirectionalLight();
light.position.set(1, 1, 1);

const texture = new Texture({
	src: '/assets/textures/texture.jpg',
});
const geometry = new BoxGeometry(1, 1, 1);
const material = new Shader({
	name: 'Box',
	hookFragmentPre: `
		uniform sampler2D uTexture0;
	`,
	hookFragmentMain: `
		color = texture2D(uTexture0, vUv).rgb;
	`,
	uniforms: {
		uTexture0: {
			type: 't',
			value: texture.texture,
		},
	},
	directionalLights: [light.uniforms],
});
const box = new Mesh(geometry, material);

scene.add(light);
scene.add(box);

const boxNormalsHelper = new NormalsHelper(box);
scene.add(boxNormalsHelper);

boxNormalsHelper.setParent(box);

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
if (!WebVRVive.avialable) {
	const btnsContainer = document.createElement('div');
	btnsContainer.classList.add('btns-container');
	btnsContainer.appendChild(WebVRVive.ui.enter);
	btnsContainer.appendChild(WebVRVive.ui.exit);
	btnsContainer.appendChild(WebVRVive.ui.reset);
	document.body.appendChild(btnsContainer);
	document.body.appendChild(WebVRVive.ui.status);

	// WebVRVive.setup();

} else {
	console.log('no supported');
}

function resize() {
	let width = window.innerWidth;
	let height = window.innerHeight;

	if (WebVRVive.available && WebVRVive.vrDisplay.isPresenting) {
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

		renderer.renderVive(scene, WebVRVive.frameData);
		WebVRVive.vrDisplay.submitFrame();
	} else {
		requestAnimationFrame(update);
		renderer.render(scene, camera);
	}
	// box.rotation.x += 0.01;
	// box.rotation.y += 0.01;
}
update();
