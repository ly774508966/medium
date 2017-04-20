import {
	Renderer,
	Scene,
	PerspectiveCamera,
	GridHelper,
	OrbitControls,
	AxisHelper,
	Lights,
	DirectionalLight,
	Color,
	Mesh,
	PlaneGeometry,
	SphereGeometry,
	Shader,
	RenderTarget,
	OrthographicCamera,
	Program,
	Constants,
	JsonLoader,
	Geometry,
	BoxGeometry,
} from '../../../../src/index';
import {
	mat4,
	vec3,
} from 'gl-matrix';
const {
	gui,
	guiController
} = require('../gui')();
import ShadowMapRenderer from './ShadowMapRenderer';

// Simple shadow mapping using a directional light
//
// http://www.opengl-tutorial.org/intermediate-tutorials/tutorial-16-shadow-mapping/
// http://codeflow.org/entries/2013/feb/15/soft-shadow-mapping/

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

camera.position.set(12.5, 5, 12.5);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(6);
scene.add(axis);

controls.update();

const directionalLights = new Lights([
	new DirectionalLight({
		intensity: {
			type: 'f',
			value: 0.6,
		},
		color: {
			type: '3f',
			value: new Color(0xffffff).v,
		},
	}),
]);
const s = 1;
directionalLights.get()[0].position.set(10 * s, 10 * s, 10 * s);
scene.directionalLights = directionalLights;

// Visible light helper
const lightHelper = new Mesh(new SphereGeometry(0.1, 16, 16), new Shader({
	uniforms: {
		uDiffuse: {
			type: '3f',
			value: new Color(0xff0000).v
		},
	},
}));
lightHelper.position.copy(directionalLights.get()[0].position);
scene.add(lightHelper);

// Shadow map texture
const shadowMapRenderer = new ShadowMapRenderer(directionalLights.get()[0]);
const sceneShadow = new Scene();

const range = 20;
gui.add(shadowMapRenderer.camera, 'far', 0, 100).name('light far');
gui.add(directionalLights.get()[0].position, 'x', -range, range).name('light x')
gui.add(directionalLights.get()[0].position, 'y', -range, range).name('light y')
gui.add(directionalLights.get()[0].position, 'z', -range, range).name('light z')

const hookFragmentPre = `
	uniform sampler2D uDepthTexture;
	uniform mat4 uLightProjectionMatrix;
	uniform mat4 uLightViewMatrix;
	uniform float uLightDepthSize;
	uniform float uLightFar;
	uniform float uBias;
	in vec4 vWorldPosition;
`;
const hookFragmentEnd = `
	vec2 poissonDisk[4];
	poissonDisk[0] = vec2( -0.94201624, -0.39906216 );
	poissonDisk[1] = vec2( 0.94558609, -0.76890725 );
	poissonDisk[2] = vec2( -0.094184101, -0.92938870 );
	poissonDisk[3] = vec2( 0.34495938, 0.29387760 );

	vec3 lightPosition = (uLightViewMatrix * vWorldPosition).xyz;
	// Calculate the uv from the light space
	vec4 lightDevice = uLightProjectionMatrix * vec4(lightPosition, 1.0);
	vec2 lightDeviceNormal = lightDevice.xy / lightDevice.w; // -1 to 1 homogeneous space
	vec2 lightUV = lightDeviceNormal * 0.5 + 0.5;

	// shadow calculation

	// Depth of current fragment in shadow map
	float lightDepth1 = texture(uDepthTexture, lightUV).r;

	// Depth of current fragment
	float lightDepth2 = clamp(length(lightPosition) / uLightFar, 0.0, 1.0) - uBias;

	float illuminated = 1.0;

	// if (lightDepth1 < lightDepth2) {
	// 	illuminated = 0.5;
	// }

	for (int i=0;i<4;i++){
		if (texture(uDepthTexture, lightUV + poissonDisk[i] / 700.0).z  < lightDepth2){
		 illuminated -= 0.2;
		}
	}

	outgoingColor = vec4(color * illuminated, 1.0);
`;

const objectMaterial = new Shader({
	directionalLights,
	hookFragmentPre,
	hookFragmentEnd,
	uniforms: {
		uDiffuse: {
			type: '3f',
			value: new Color(0x666666).v,
		},
		uDepthTexture: {
			type: 't',
			value: shadowMapRenderer.renderTarget.texture,
		},
		uLightProjectionMatrix: {
			type: 'Matrix4fv',
			value: shadowMapRenderer.camera.projectionMatrix,
		},
		uLightViewMatrix: {
			type: 'Matrix4fv',
			value: shadowMapRenderer.lightViewMatrix,
		},
		uLightDepthSize: {
			type: 'f',
			value: shadowMapRenderer.renderTarget.width,
		},
		uLightFar: {
			type: 'f',
			value: shadowMapRenderer.camera.far,
		},
		uBias: {
			type: 'f',
			value: 0.0035,
		},
	},
});

gui.add(objectMaterial.uniforms.uBias, 'value', 0, 0.01).name('shadow bias');

// Obj
let objMesh;
new JsonLoader('assets/models/mass.json').then(data => {
	const geometry = new Geometry(data.vertices,
		data.indices, data.normals);

	objMesh = new Mesh(geometry, objectMaterial);

	const scale = 1;
	objMesh.scale.set(scale, scale, scale);
	objMesh.position.set(-2.5, 2.5, 2.5);
	scene.add(objMesh);
	sceneShadow.add(objMesh);
}).catch(error => {
	console.log('error loading', error);
});

const sphere = new Mesh(new SphereGeometry(1, 32, 32), objectMaterial);
sphere.position.y = 2;
scene.add(sphere);

const sphere2 = new Mesh(new SphereGeometry(1, 32, 32), objectMaterial);
sphere2.position.set(0.5, 1, -2);
scene.add(sphere2);

const box = new Mesh(new BoxGeometry(1, 1, 1), objectMaterial);
box.position.set(2.5, 2, -1.5);
scene.add(box);

const floor = new Mesh(new PlaneGeometry(10, 10, 1, 1, 'XZ'), objectMaterial);
scene.add(floor);

const depthMaterial = new Shader({
	hookVertexPre: `
		uniform mat4 uLightProjectionMatrix;
		uniform mat4 uLightViewMatrix;
		uniform float uLightFar;
 `,
	hookVertexEnd: `
		vWorldPosition = uModelMatrix * vec4(vPosition, 1.0);
		gl_Position = uLightProjectionMatrix * uLightViewMatrix * vWorldPosition;
 `,
	hookFragmentPre: `
		uniform mat4 uLightViewMatrix;
		uniform float uLightFar;
		in vec4 vWorldPosition;
	`,
	hookFragmentEnd: `
		vec3 lightPosition = (uLightViewMatrix * vWorldPosition).xyz;
		float depth = clamp(length(lightPosition) / uLightFar, 0.0, 1.0);
		outgoingColor = vec4(vec3(depth), 1.0);
	`,
	uniforms: {
		uLightProjectionMatrix: {
			type: 'Matrix4fv',
			value: shadowMapRenderer.camera.projectionMatrix,
		},
		uLightViewMatrix: {
			type: 'Matrix4fv',
			value: shadowMapRenderer.lightViewMatrix,
		},
		uLightFar: {
			type: 'f',
			value: shadowMapRenderer.camera.far,
		},
	}
});
depthMaterial.create(sphere.geometry);

// Debug plane for shadow map
const shadowMapDebug = new Mesh(new PlaneGeometry(3, 3), new Shader({
	hookFragmentPre: `
		uniform sampler2D uTexture0;
	`,
	hookFragmentEnd: `
		outgoingColor = texture(uTexture0, vUv);
	`,
	uniforms: {
		uTexture0: {
			type: 't',
			value: shadowMapRenderer.renderTarget.texture,
		},
	}
}));

shadowMapDebug.position.set(-3, 6, 0);
shadowMapDebug.rotation.y = Math.PI / 4;
scene.add(shadowMapDebug);

// Objects to cast shadow
sceneShadow.add(sphere);
sceneShadow.add(sphere2);
sceneShadow.add(floor);
sceneShadow.add(box);

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
	camera.ratio = width / height;
	camera.updateProjectionMatrix();
	shadowMapRenderer.resize(width, height);
}
resize();

window.addEventListener('resize', resize);

function update() {
	requestAnimationFrame(update);

	lightHelper.position.copy(directionalLights.get()[0].position);

	depthMaterial.uniforms.uLightFar.value = shadowMapRenderer.camera.far;
	objectMaterial.uniforms.uLightFar.value = shadowMapRenderer.camera.far;

	// set depth material for objects
	sceneShadow.objects.forEach(object => {
		object.shader = depthMaterial;
	});

	if (objMesh) {
		objMesh.shader = depthMaterial;
	}

	shadowMapRenderer.render(sceneShadow);

	// set normal material for objects
	sceneShadow.objects.forEach(object => {
		object.shader = objectMaterial;
	});

	if (objMesh) {
		objMesh.shader = objectMaterial;
		objMesh.rotation.y += 0.005;
	}

	box.rotation.x += 0.005;
	box.rotation.y += 0.005;
	box.rotation.z += 0.005;

	renderer.render(scene, camera);
}
update();
