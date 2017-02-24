import {
	GL,
	Renderer,
	Scene,
	PerspectiveCamera,
	GridHelper,
	OrbitControls,
	AxisHelper,
	Geometry,
	MathUtils,
	Mesh,
	Shader,
	Constants,
} from 'index';
import {
	guiController
} from '../gui';

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
	far: 500,
});

camera.position.set(10, 5, 10);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

// Objects
const TOTAL_POINTS = 200;
const bufferVertices = new Float32Array(TOTAL_POINTS * 3);
const range = 3;

let i3 = 0;
for (let i = 0; i < TOTAL_POINTS; i += 1) {
	i3 = i * 3;
	bufferVertices[i3] = MathUtils.lerp(-range, range, Math.random());
	bufferVertices[i3 + 1] = MathUtils.lerp(-range, range, Math.random());
	bufferVertices[i3 + 2] = MathUtils.lerp(-range, range, Math.random());
}

const geometry = new Geometry(bufferVertices);

const hookVertexEndEs300 = `
	vec4 mvPosition = uProjectionView.projectionMatrix * uProjectionView.viewMatrix * uModelMatrix * vec4(aVertexPosition + transformed, 1.0);
	gl_PointSize = uSize * (100.0 / length(mvPosition.xyz));

`;

const hookVertexEndEs100 = `
	vec4 mvPosition = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition + transformed, 1.0);
	gl_PointSize = uSize * (100.0 / length(mvPosition.xyz));
`;

const hookFragmentEndEs300 = `
	outputColor = vec4(1.0);
`;

const hookFragmentEndEs100 = `
	gl_FragColor = vec4(1.0);
`;

const shader = new Shader({
	hookVertexPre: `
		uniform float uSize;
	`,
	hookVertexEnd: GL.webgl2 ? hookVertexEndEs300 : hookVertexEndEs100,
	hookFragmentEnd: GL.webgl2 ? hookFragmentEndEs300 : hookFragmentEndEs100,
	uniforms: {
		uSize: {
			type: 'f',
			value: 0.5,
		},
	},
	drawType: Constants.DRAW_POINTS,
});

const mesh = new Mesh(geometry, shader);

scene.add(mesh);

controls.update();

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
