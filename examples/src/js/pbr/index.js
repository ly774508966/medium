import {
	GL,
	Renderer,
	Scene,
	PerspectiveCamera,
	// AxisHelper,
	// GridHelper,
	OrbitControls,
	SphereGeometry,
	Shader,
	Mesh,
	Texture,
	TextureCube,
	ShaderChunks,
	Color,
	// BoxGeometry,
	// BoxGeometry,
	Lights,
	DirectionalLight,
} from '../../../../src/index';
const { gui, guiController } = require('../gui')(['webgl2']);
import { hookFragmentPre, hookFragmentMain } from './shader.glsl';

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

camera.position.set(10, 0, 10);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
controls.update();

const directionalLights = new Lights([
	new DirectionalLight({
		intensity: {
			type: 'f',
			value: 0.3,
		},
		color: {
			type: '3f',
			value: new Color(0xFFFFFF).v,
		},
	}),
]);

directionalLights.get()[0].position.set(-1, 0.6, 0.1);

gui.add(directionalLights.get()[0].uniforms.intensity, 'value', 0, 1).name('light intensity');
gui.add(directionalLights.get()[0].position, 'x', -1, 1).name('light x');
gui.add(directionalLights.get()[0].position, 'y', -1, 1).name('light y');
gui.add(directionalLights.get()[0].position, 'z', -1, 1).name('light z');

scene.directionalLights = directionalLights;

const environmentMap = new TextureCube({
	src: [
		'/assets/textures/cube/pisa-hdr/px.hdr',
		'/assets/textures/cube/pisa-hdr/nx.hdr',
		'/assets/textures/cube/pisa-hdr/py.hdr',
		'/assets/textures/cube/pisa-hdr/ny.hdr',
		'/assets/textures/cube/pisa-hdr/pz.hdr',
		'/assets/textures/cube/pisa-hdr/nz.hdr',
	],
});

const albedoMap = new Texture({
	src: '/assets/textures/pbr/rusted-metal/albedo.png',
});

const normalMap = new Texture({
	src: '/assets/textures/pbr/rusted-metal/normal.png',
});

const metalnessMap = new Texture({
	src: '/assets/textures/pbr/rusted-metal/metalness.jpg',
});

guiController.exposure = 2.0;

gui.add(guiController, 'exposure', 0, 2);

const hdrObjects = [];

function skybox() {
	const material = new Shader({
		hookFragmentPre: `
			uniform samplerCube uEnvironment;
			uniform float uGamma;
			uniform float uExposure;

			${ShaderChunks.EnvMapCube}
			${ShaderChunks.Tonemap.tonemapReinhard}
			${ShaderChunks.Gamma}
		`,
		hookFragmentEnd: GL.webgl2 ? `
			color = texture(uEnvironment, envMapCube(vPosition)).rgb;
			color *= uExposure;

			// white balance
			color	= tonemapReinhard(color);

			// gamma correction
			color	= toGamma(color);

			outgoingColor = vec4(color, 1.0);
		` : `
			color = textureCube(uEnvironment, envMapCube(vPosition)).rgb;
			color *= uExposure;

			// white balance
			color	= tonemapReinhard(color);

			// gamma correction
			color	= toGamma(color);

			gl_FragColor = vec4(color, 1.0);
		`,
		uniforms: {
			uEnvironment: {
				type: 'tc',
				value: environmentMap.texture,
			},
			uGamma: {
				type: 'f',
				value: guiController.gamma,
			},
			uExposure: {
				type: 'f',
				value: guiController.exposure,
			},
		},
	});

	const geometry = new SphereGeometry(40, 64, 64);
	const mesh = new Mesh(geometry, material);

	scene.add(mesh);

	hdrObjects.push(mesh);
}
skybox();

function reflectiveObjects() {
	const material = new Shader({
		hookVertexPre: GL.webgl2 ? `
			out vec3 vReflect;
		` : `
			varying vec3 vReflect;
		`,
		hookVertexEnd: `
			// Calculate world normal position (of surface)

			// This is wrong, we don't want to apply model transformations to normal
			// vec3 worldNormal = (uModelMatrix * vec4(vNormal, 1.0)).xyz;

			vec3 worldNormal = vNormal;

			// Calculate eye ray (from camera to surface)
			vec3 eye = normalize(vWorldPosition.xyz - uCameraPosition);

			// Angle of reflection
			vReflect = reflect(eye, worldNormal);
		`,
		hookFragmentPre,
		hookFragmentMain,
		uniforms: {
			uDiffuse: {
				type: '3f',
				value: new Color(0xFFFFFF).v,
			},
			uEnvironment: {
				type: 'tc',
				value: environmentMap.texture,
			},
			uAlbedioMap: {
				type: 't',
				value: albedoMap.texture,
			},
			uNormalMap: {
				type: 't',
				value: normalMap.texture,
			},
			uMetalnessMap: {
				type: 't',
				value: metalnessMap.texture,
			},
			uMetalness: {
				type: 'f',
				value: 1,
			},
			uGamma: {
				type: 'f',
				value: guiController.gamma,
			},
			uExposure: {
				type: 'f',
				value: guiController.exposure,
			},
			uNormalScale: {
				type: '2f',
				value: [0.7, 0.7],
			},
			uCameraPosition: {
				type: '3f',
				value: [0, 0, 0]
			},
		},
		directionalLights,
	});

	const geometry0 = new SphereGeometry(2, 64, 64);
	const mesh0 = new Mesh(geometry0, material);
	scene.add(mesh0);

	gui.add(mesh0.shader.uniforms.uMetalness, 'value', 0, 1).name('metalness');
	hdrObjects.push(mesh0);
}
reflectiveObjects();

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
	camera.ratio = width / height;
	camera.updateProjectionMatrix();
}
resize();

window.addEventListener('resize', resize);

function update() {
	requestAnimationFrame(update);

	hdrObjects.forEach(object => {
		object.shader.uniforms.uGamma.value = guiController.gamma;
		object.shader.uniforms.uExposure.value = guiController.exposure;
	});

	renderer.render(scene, camera);
}
update();
