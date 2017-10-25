import {
  Renderer,
  Scene,
  PerspectiveCamera,
  GridHelper,
  OrbitControls,
  AxisHelper,
  Mesh,
  LineGeometry,
  Shader,
  Constants
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
  fov: 45,
  far: 500
});

camera.position.set(10, 5, 10);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

controls.update();

// Create curve
const points = [
  ...[0, 0, 0],
  ...[3, 5, 6],
  ...[5, 6, 7],
  ...[9, 9, 9],
  ...[9, 2, 1],
  ...[2, 4, 1]
];
const bufferVertices = new Float32Array(points);

const mesh = new Mesh(
  new LineGeometry(bufferVertices),
  new Shader({
    drawType: Constants.DRAW_LINES
  })
);
scene.add(mesh);

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
