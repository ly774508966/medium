import {
  Renderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  Shader,
  BoxGeometry,
  GridHelper,
  OrbitControls,
  AxisHelper,
  TextureVideo
} from '../../../../src/index.ts';

const { guiController } = require('../gui')();

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

// Objects
const textureVideo = new TextureVideo({
  src: '/assets/textures/texture.mp4',
  loop: true
});

textureVideo.once('canplaythrough', () => {
  console.log('canplaythrough'); // eslint-disable-line no-console
});

textureVideo.on('ended', () => {
  console.log('ended'); // eslint-disable-line no-console
});

const geometry = new BoxGeometry(1, 1, 1);
const material = new Shader({
  name: 'Box',
  hookFragmentPre: `
		uniform sampler2D uTexture0;
	`,
  hookFragmentMain: `
		color = texture(uTexture0, vUv).rgb;
	`,
  uniforms: {
    uTexture0: {
      type: 't',
      value: textureVideo.texture
    }
  }
});
const box = new Mesh(geometry, material);

scene.add(box);

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

controls.update();

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
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  textureVideo.update();
  renderer.render(scene, camera);
}
update();
