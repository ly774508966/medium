import SimplexNoise from 'simplex-noise';
import {
  GL,
  Renderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  Shader,
  PlaneGeometry,
  OrbitControls,
  Texture3d,
  Clock,
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

camera.position.set(35, -25, 35);
camera.lookAt();

const SIZE = 64;

const simplex = new SimplexNoise(Math.random);

const scale = 0.035;
// const scale = 1;
const src = new Uint8Array(SIZE * SIZE * SIZE);
for (let k = 0; k < SIZE; k += 1) {
  for (let j = 0; j < SIZE; j += 1) {
    for (let i = 0; i < SIZE; i += 1) {
      src[i + j * SIZE + k * SIZE * SIZE] =
        Math.abs(simplex.noise3D(i * scale, j * scale, k * scale)) * 256;
    }
  }
}

const texture3d = new Texture3d({
  src,
  size: SIZE
});

const PLANE_SIZE = 20;
const geometry = new PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 1, 1, 'XY');
const material = new Shader({
  name: 'Plane',
  hookVertexPre: `
		precision highp int;
		precision highp sampler3D;
		uniform float uFogDensity;
		uniform float uVz;
		uniform float uTime;
		uniform float uSpeed;
		in float aUvZ;
		out vec3 vUv3;
		out float vFogAmount;
		${ShaderChunks.Fog.exp2}
	`,
  hookVertexMain: `
		transformed.z = (-uVz * 0.5) + (aUvZ * uVz);
	`,
  hookVertexEnd: `
		float wave = sin(uTime) * 0.5 + 0.5;
		vUv3.x = vUv.x;
		vUv3.y = vUv.y;
		vUv3.z = aUvZ + uTime * uSpeed;
		float fogDistance = length(gl_Position.xyz);
		vFogAmount = fogExp2(fogDistance, uFogDensity);
	`,
  hookFragmentPre: `
		precision highp int;
		precision highp sampler3D;
		uniform sampler3D uTexture;
		in float vFogAmount;
		in vec3 vUv3;
	`,
  hookFragmentEnd: `
		vec3 fogColor = vec3(0.0);
		color = mix(vec3(1.0), fogColor, vFogAmount);
		vec4 color2 = texture(uTexture, vUv3);
		outgoingColor = vec4(color * color2.r, 1.0 - color2.r);
	`,
  uniforms: {
    uFogDensity: {
      type: 'f',
      value: 0.028
    },
    uVz: {
      type: 'f',
      value: PLANE_SIZE
    },
    uTime: {
      type: 'f',
      value: 0
    },
    uSpeed: {
      type: 'f',
      value: 0.38
    },
    uTexture: {
      type: 't3d',
      value: texture3d.texture
    }
  }
});

const data = new Float32Array(SIZE);
for (let i = 0; i < SIZE; i += 1) {
  data[i] = i / SIZE;
}

geometry.addInstancedBufferAttribute('aUvZ', data, 1);

const plane = new Mesh(geometry, material);
plane.setInstanceCount(SIZE);
scene.add(plane);

const range = SIZE;
gui.add(material.uniforms.uVz, 'value', 0, range).name('depth');
gui.add(material.uniforms.uFogDensity, 'value', 0, 0.1).name('fog density');
gui.add(material.uniforms.uSpeed, 'value', 0, 5).name('speed');

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
controls.target.set(0, 2, 0);

controls.update();

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
resize();

window.addEventListener('resize', resize);

const clock = new Clock(true);

const gl = GL.get();
gl.enable(gl.BLEND);
gl.blendEquation(gl.FUNC_ADD);
gl.blendFunc(gl.ONE, gl.SRC_ALPHA);

function update() {
  requestAnimationFrame(update);
  camera.updateMatrixWorld();
  plane.shader.uniforms.uTime.value += clock.getDelta();
  renderer.render(scene, camera);
}
update();
