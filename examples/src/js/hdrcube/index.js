import {
  GL,
  Renderer,
  Scene,
  PerspectiveCamera,
  OrbitControls,
  SphereGeometry,
  Shader,
  Mesh,
  TextureCube,
  ShaderChunks
} from '../../../../src/index.ts';

const { gui, guiController } = require('../gui')(['webgl2']);

// Renderer
const renderer = new Renderer({
  ratio: window.innerWidth / window.innerHeight,
  prefferedContext: guiController.context
});
renderer.setDevicePixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.canvas);

// Scene
const scene = new Scene();

// Camera
const camera = new PerspectiveCamera({
  fov: 45
});

camera.position.set(10, 0, 10);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
controls.update();

const environmentMap = new TextureCube({
  src: [
    '/assets/textures/cube/pisa-hdr/px.hdr',
    '/assets/textures/cube/pisa-hdr/nx.hdr',
    '/assets/textures/cube/pisa-hdr/py.hdr',
    '/assets/textures/cube/pisa-hdr/ny.hdr',
    '/assets/textures/cube/pisa-hdr/pz.hdr',
    '/assets/textures/cube/pisa-hdr/nz.hdr'
  ]
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
    hookFragmentEnd: `
			color = texture(uEnvironment, envMapCube(vPosition)).rgb;
			color *= uExposure;

			// white balance
			color	= tonemapReinhard(color);

			// gamma correction
			color	= toGamma(color);

			outgoingColor = vec4(color, 1.0);
		`,
    uniforms: {
      uEnvironment: {
        type: 'tc',
        value: environmentMap.texture
      },
      uGamma: {
        type: 'f',
        value: guiController.gamma
      },
      uExposure: {
        type: 'f',
        value: guiController.exposure
      }
    }
  });

  const geometry = new SphereGeometry(40, 64, 64);
  const mesh = new Mesh(geometry, material);

  scene.add(mesh);

  hdrObjects.push(mesh);
}
skybox();

function reflectiveObjects() {
  const material = new Shader({
    hookVertexPre: `
			out vec3 vReflect;
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
    hookFragmentPre: `
			uniform samplerCube uEnvironment;
			in vec3 vReflect;
			uniform float uGamma;
			uniform float uExposure;

			${ShaderChunks.EnvMapCube}
			${ShaderChunks.Tonemap.tonemapReinhard}
			${ShaderChunks.Gamma}
		`,
    hookFragmentEnd: `
			color = texture(uEnvironment, envMapCube(vReflect)).rgb;
			color *= uExposure;

			// white balance
			color	= tonemapReinhard(color);

			// gamma correction
			color	= toGamma(color);

			outgoingColor = vec4(color, 1.0);
		`,
    uniforms: {
      tex: {
        type: 'tc',
        value: environmentMap.texture
      },
      uGamma: {
        type: 'f',
        value: guiController.gamma
      },
      uExposure: {
        type: 'f',
        value: guiController.exposure
      },
      uCameraPosition: {
        type: '3f',
        value: [0, 0, 0]
      }
    }
  });

  const geometry0 = new SphereGeometry(2, 64, 64);
  const mesh0 = new Mesh(geometry0, material);
  scene.add(mesh0);

  // const geometry1 = new BoxGeometry(2, 2, 2);
  // const mesh1 = new Mesh(geometry1, material);
  // scene.add(mesh1);

  // mesh0.position.z = -3;
  // mesh1.position.z = 3;

  hdrObjects.push(mesh0);
  // hdrObjects.push(mesh1);
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

  camera.updateMatrixWorld();

  hdrObjects.forEach(object => {
    object.shader.uniforms.uGamma.value = guiController.gamma;
    object.shader.uniforms.uExposure.value = guiController.exposure;
  });

  renderer.render(scene, camera);
}
update();
