import {
  Renderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  Material,
  PlaneGeometry,
  GridHelper,
  OrbitControls,
  AxisHelper,
  Texture
} from '../../../../src/index.ts';
import stats from '../stats';

const { guiController } = require('../gui')(['webgl2']);

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
const hdrMap = new Texture({
  src: 'assets/textures/cube/pisa-hdr/nx.hdr'
});

const geometry = new PlaneGeometry(1, 1);
const material = new Material({
  name: 'Plane',
  hookFragmentPre: `
		uniform sampler2D uMap;
	`,
  hookFragmentMain: `
		color = texture(uMap, vUv).rgb;
	`,
  uniforms: {
    uMap: {
      type: 't',
      value: hdrMap.texture
    }
  }
});

const plane = new Mesh(geometry, material);
scene.add(plane);

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
  stats.begin();
  camera.updateMatrixWorld();
  renderer.render(scene, camera);
  stats.end();
}
update();
