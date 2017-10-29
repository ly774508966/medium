import {
  Renderer,
  Scene,
  PerspectiveCamera,
  GridHelper,
  OrbitControls,
  AxisHelper,
  Lights,
  DirectionalLight,
  AmbientLight,
  Material,
  Color,
  Mesh
} from '../../../../src/index.ts';
import DRACOLoader from './DRACOLoader';
import stats from '../stats';

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
  fov: 45,
  far: 500,
  ratio: window.innerWidth / window.innerHeight
});

camera.position.set(10, 5, 10);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
controls.smoothing = true;

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

controls.update();

// Lights

const ambientLight = new Lights([
  new AmbientLight({
    intensity: {
      type: 'f',
      value: 0.5
    },
    color: {
      type: '3f',
      value: new Color(0x404040).v
    }
  })
]);

const directionalLights = new Lights([
  new DirectionalLight({
    intensity: {
      type: 'f',
      value: 0.7
    },
    color: {
      type: '3f',
      value: new Color(0xffffff).v
    }
  })
]);

directionalLights.get()[0].position.set(1, 1, 1);

scene.ambientLight = ambientLight;
scene.directionalLights = directionalLights;

// Draco

const dracoLoader = new DRACOLoader(undefined, 'assets/third-party/draco');

dracoLoader.setVerbosity(1);

dracoLoader.load('assets/models/draco/mass/mass.drc', geometry => {
  const mesh = new Mesh(
    geometry,
    new Material({
      directionalLights,
      ambientLight,
      type: 'lambert',
      uniforms: {
        uDiffuse: {
          type: '3f',
          value: new Color(0xffffff).v
        }
      }
    })
  );

  scene.add(mesh);
});

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

  controls.update();

  camera.updateMatrixWorld();
  renderer.render(scene, camera);

  stats.end();
}
update();
