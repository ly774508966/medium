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
	TextureCube,
	ShaderChunks,
} from 'index';
import gui, {
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
});

camera.position.set(10, 0, 10);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
// const grid = new GridHelper(10);
// scene.add(grid);
// const axis = new AxisHelper(1);
// scene.add(axis);
controls.update();

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

// const environmentMap = new TextureCube({
// 	src: [
// 		'/assets/textures/cube/pisa/px.png',
// 		'/assets/textures/cube/pisa/nx.png',
// 		'/assets/textures/cube/pisa/py.png',
// 		'/assets/textures/cube/pisa/ny.png',
// 		'/assets/textures/cube/pisa/pz.png',
// 		'/assets/textures/cube/pisa/nz.png',
// 	],
// });

guiController.exposure = 2.0;

gui.add(guiController, 'exposure', 0, 2);

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

			outputColor = vec4(color, 1.0);
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
				textureIndex: 0,
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

	return mesh;
}
const skyboxMesh = skybox();

function sphere() {
	const material = new Shader({
		hookVertexPre: GL.webgl2 ? `
			out vec3 vReflect;
		` : `
			varying vec3 vReflect;
		`,
		hookVertexEnd: `
			// Calculate world normal position (of surface)
			vec3 worldNormal = (uModelMatrix * vec4(vNormal, 1.0)).xyz;

			// Calculate eye ray (from camera to surface)
			vec3 eye = normalize(vWorldPosition.xyz - uCameraPosition);

			// Angle of reflection
			vReflect = reflect(eye, worldNormal);
		`,
		hookFragmentPre: GL.webgl2 ? `
			uniform samplerCube uEnvironment;
			in vec3 vReflect;
			uniform float uGamma;
			uniform float uExposure;

			${ShaderChunks.EnvMapCube}
			${ShaderChunks.Tonemap.tonemapReinhard}
			${ShaderChunks.Gamma}
		` : `
			uniform samplerCube uEnvironment;
			varying vec3 vReflect;
			uniform float uGamma;
			uniform float uExposure;

			${ShaderChunks.EnvMapCube}
			${ShaderChunks.Tonemap.tonemapReinhard}
			${ShaderChunks.Gamma}
		`,
		hookFragmentEnd: GL.webgl2 ? `
			color = texture(uEnvironment, envMapCube(vReflect)).rgb;
			color *= uExposure;

			// white balance
			color	= tonemapReinhard(color);

			// gamma correction
			color	= toGamma(color);

			outputColor = vec4(color, 1.0);
		` : `
			color = textureCube(uEnvironment, envMapCube(vReflect)).rgb;
			color *= uExposure;

			// white balance
			color	= tonemapReinhard(color);

			// gamma correction
			color	= toGamma(color);

			gl_FragColor = vec4(color, 1.0);
		`,
		uniforms: {
			tex: {
				type: 'tc',
				value: environmentMap.texture,
				textureIndex: 0,
			},
			uGamma: {
				type: 'f',
				value: guiController.gamma,
			},
			uExposure: {
				type: 'f',
				value: guiController.exposure,
			},
			uCameraPosition: {
				type: '3f',
				value: [0, 0, 0]
			},
		},
	});

	const geometry = new SphereGeometry(2, 64, 64);
	const mesh = new Mesh(geometry, material);

	scene.add(mesh);

	return mesh;
}
const sphereMesh = sphere();

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
}
resize();

window.addEventListener('resize', resize);

function update() {
	requestAnimationFrame(update);

	skyboxMesh.shader.uniforms.uGamma.value = guiController.gamma;
	skyboxMesh.shader.uniforms.uExposure.value = guiController.exposure;
	sphereMesh.shader.uniforms.uGamma.value = guiController.gamma;
	sphereMesh.shader.uniforms.uExposure.value = guiController.exposure;

	renderer.render(scene, camera);
}
update();
