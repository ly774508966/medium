import {
	GL,
	Renderer,
	Scene,
	PerspectiveCamera,
	GridHelper,
	OrbitControls,
	AxisHelper,
	RenderTarget,
	Shader,
	Mesh,
	PlaneGeometry,
	OrthographicCamera,
	ShaderChunks,
} from '../../../../src/index';
const { guiController } = require('../gui')();

// Renderer
const renderer = new Renderer({
	ratio: window.innerWidth / window.innerHeight,
	prefferedContext: guiController.context,
});
renderer.setDevicePixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.canvas);

// Render target
const renderTarget = new RenderTarget({
	width: window.innerWidth,
	height: window.innerHeight,
});

// Scene
const scene = new Scene();
const scene2 = new Scene();

// Camera
const cameras = {
	dev: new PerspectiveCamera({
		fov: 45,
	}),
	main: new OrthographicCamera({
		fov: 45,
	}),
};

cameras.dev.position.set(10, 5, 10);
cameras.dev.lookAt();

cameras.main.position.set(0, 0, 1);
cameras.main.lookAt(0, 0, 0);

// Helpers
const controls = new OrbitControls(cameras.dev, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

controls.update();

const material = new Shader({
	uniforms: {
		uTexture0: {
			type: 't',
			value: renderTarget.texture,
		},
		uTime: {
			type: 'f',
			value: 0,
		},
	},
	fragmentShader: `${ShaderChunks.EsVersion}
		#HOOK_PRECISION
		in vec2 vUv;
		uniform sampler2D uTexture0;
		uniform float uTime;
		out vec4 outgoingColor;

		void main(void) {
			vec3 color = texture(uTexture0, vUv).rgb;
			float r = sin(color.r + uTime) * 0.5 + 0.5;
			float g = cos(color.g + uTime) * 0.5 + 0.5;
			float b = sin(color.b + uTime) * 0.5 + 0.5;
			outgoingColor = vec4(r, g, b, 1.0);
		}
	`,
});

const plane = new Mesh(new PlaneGeometry(2, 2), material);
scene2.add(plane);

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderTarget.setSize(width, height);
	renderer.setSize(width, height);
	cameras.dev.ratio = width / height;
	cameras.dev.updateProjectionMatrix();
	cameras.main.ratio = width / height;
	cameras.main.updateProjectionMatrix();
}
resize();

window.addEventListener('resize', resize);

function update(time) {
	requestAnimationFrame(update);

	const t = time * 0.2;

	plane.shader.uniforms.uTime.value = t * 0.01;

	renderTarget.render(scene, cameras.dev);
	renderer.render(scene2, cameras.main);
}
update();
