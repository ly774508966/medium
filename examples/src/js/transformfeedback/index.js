import {
  GL,
  Renderer,
  Scene,
  PerspectiveCamera,
  OrbitControls,
  MathUtils,
  Geometry,
  Shader,
  Vao
} from '../../../../src/index.ts';
import Shaders from './shaders.glsl';
import TFMesh from './TFMesh';

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
  fov: 45,
  far: 500
});

camera.position.set(20, 10, 20);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
controls.update();

// Objects
const shaderEmit = new Shader({
  vertexShader: Shaders.emit.vertexShader,
  fragmentShader: Shaders.emit.fragmentShader
});

const shaderDraw = new Shader({
  hookVertexPre: Shaders.draw.hookVertexPre,
  hookVertexEnd: Shaders.draw.hookVertexEnd,
  hookFragmentPre: Shaders.draw.hookFragmentPre,
  hookFragmentEnd: Shaders.draw.hookFragmentEnd,
  uniforms: {
    uSize: {
      type: 'f',
      value: 0.35
    }
  }
});

const TOTAL_POINTS = 100000;
const bufferVertices = new Float32Array(TOTAL_POINTS * 3);
const bufferPositions = new Float32Array(TOTAL_POINTS * 3);
const radius = 6;

let i3 = 0;
for (let i = 0; i < TOTAL_POINTS; i += 1) {
  i3 = i * 3;
  const position = MathUtils.randomSpherePoint(0, 0, 0, radius);
  bufferVertices[i3] = position[0];
  bufferVertices[i3 + 1] = position[1];
  bufferVertices[i3 + 2] = position[2];

  bufferPositions[i3] = 0;
  // Offset the position in time
  bufferPositions[i3 + 1] = i * (Math.PI * 2 / TOTAL_POINTS);
  bufferPositions[i3 + 2] = 0;
}

const createBuffer = (gl, data) => {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.UNIFORM_BUFFER, buffer);
  gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(data), gl.STREAM_COPY);
  gl.bindBuffer(gl.UNIFORM_BUFFER, null);
  return buffer;
};

const gl = GL.get();

const vaos = [new Vao(), new Vao()];

// More buffers could be added like: color, lifespan
const vbos = [
  [createBuffer(gl, bufferPositions)],
  [createBuffer(gl, bufferPositions)]
];

const geometry = new Geometry(bufferVertices);
const mesh = new TFMesh(
  geometry,
  vaos,
  vbos,
  shaderEmit,
  shaderDraw,
  TOTAL_POINTS
);

scene.add(mesh);

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
  renderer.render(scene, camera);
}
update();
