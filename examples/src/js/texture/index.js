import {
  Renderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  Shader,
  PlaneGeometry,
  GridHelper,
  OrbitControls,
  AxisHelper,
  Texture
} from '../../../../src/index.ts';

const { gui, guiController } = require('../gui')();

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

camera.position.set(10, 5, 10);
camera.lookAt();

const texture0 = new Texture({
  src: 'assets/textures/texture-nopow2.jpg'
});

const texture1 = new Texture({
  src: 'assets/textures/texture-nopow2-2.jpg'
});

const geometry = new PlaneGeometry(1, 1, 1, 1, 'XY');
const material = new Shader({
  name: 'Plane',
  hookFragmentPre: `
		uniform sampler2D uTexture0;
		uniform sampler2D uTexture1;
		uniform float uMix;
	`,
  hookFragmentMain: `
		color = mix(texture(uTexture0, vUv).rgb, texture(uTexture1, vUv).rgb, uMix);
	`,
  uniforms: {
    uMix: {
      type: 'f',
      value: 0.5
    },
    uTexture0: {
      type: 't',
      value: texture0.texture
    },
    uTexture1: {
      type: 't',
      value: texture1.texture
    }
  }
});

const plane = new Mesh(geometry, material);
scene.add(plane);

gui.add(plane.shader.uniforms.uMix, 'value', 0, 1);

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);
//
const axis = new AxisHelper(1);
scene.add(axis);

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

function update() {
  requestAnimationFrame(update);
  camera.updateMatrixWorld();
  renderer.render(scene, camera);
}
update();
