import { mat4 /* vec3 */ } from 'gl-matrix';
import {
  GL,
  Renderer,
  Scene,
  PerspectiveCamera,
  GridHelper,
  OrbitControls,
  AxisHelper,
  CameraHelper,
  Mesh,
  SphereGeometry,
  Material,
  Texture,
  AmbientLight,
  DirectionalLight,
  Lights,
  Color,
  OrthographicCamera
} from '../../../../src/index.ts';
import stats from '../stats';

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

// Camera
const camera = new PerspectiveCamera({
  fov: 45,
  far: 500,
  ratio: window.innerWidth / window.innerHeight
});

camera.position.set(10, 5, 0);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
controls.smoothing = true;

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

controls.update();

const projectiveTexture = new Texture({
  src: 'assets/textures/paint/splatter-1.jpg'
});

const shader = new Material({
  type: 'lambert',
  ambientLight,
  directionalLights,
  uniforms: {
    uTextureProjectionMatrix: {
      type: 'Matrix4fv',
      value: mat4.create()
    },
    uProjectiveTexture: {
      type: 't',
      value: projectiveTexture.texture
    }
  },
  hookVertexPre: `
    uniform mat4 uTextureProjectionMatrix;
    uniform mat4 uModelViewMatrixNew;
    ${GL.webgl2 ? 'out' : 'varying'} vec4 vShadowCoord;
    const mat4 biasMatrix = mat4( 0.5, 0.0, 0.0, 0.0,
                                  0.0, 0.5, 0.0, 0.0,
                                  0.0, 0.0, 0.5, 0.0,
                                  0.5, 0.5, 0.5, 1.0 );
`,
  hookVertexEnd: `
    vShadowCoord = (biasMatrix * uTextureProjectionMatrix * uModelMatrix) * vec4(aVertexPosition, 1.0);
`,
  hookFragmentPre: `
    uniform sampler2D uProjectiveTexture;
    ${GL.webgl2 ? 'in' : 'varying'} vec4 vShadowCoord;
`,
  hookFragmentEnd: `
    vec4 shadowCoord = vShadowCoord / vShadowCoord.w;
    const float shadowBias = 0.00005;
    outgoingColor *= ${GL.webgl2
      ? 'textureProj'
      : 'texture2DProj'}(uProjectiveTexture, shadowCoord, shadowBias);
`
});

const mesh = new Mesh(new SphereGeometry(1, 32, 32), shader);
scene.add(mesh);
mesh.position.set(0, 0, 0);

guiController.x = 1;
guiController.y = 1;
guiController.z = 1;
guiController.textureSize = 0.8;

// Texture Projection
const projectionCamera = new OrthographicCamera({
  near: 0.1,
  far: 50.0
});

const cameraHelper = new CameraHelper(projectionCamera);
scene.add(cameraHelper);

function updateProjection() {
  const textureProjectionMatrix = mat4.create();

  const cameraLeft = guiController.textureSize * -1;
  const cameraRight = guiController.textureSize * 1;
  const cameraBottom = guiController.textureSize * -1;
  const cameraTop = guiController.textureSize * 1;

  // Vanilla

  // const cameraProjection = mat4.create();
  // mat4.ortho(cameraProjection, cameraLeft, cameraRight, cameraBottom, cameraTop, 0.1, 50);
  // const cameraPosition = vec3.fromValues(
  //   controller.x,
  //   controller.y,
  //   controller.z
  // );
  //
  // const cameraViewMatrix = mat4.create();
  // const center = vec3.fromValues(mesh.position.x, mesh.position.y, mesh.position.z);
  // const up = vec3.fromValues(0, 1, 0);
  //
  // mat4.lookAt(cameraViewMatrix, cameraPosition, center, up);
  // mat4.multiply(textureProjectionMatrix, cameraProjection, cameraViewMatrix);

  // or using OrthographicCamera

  projectionCamera.left = cameraLeft;
  projectionCamera.right = cameraRight;
  projectionCamera.bottom = cameraBottom;
  projectionCamera.top = cameraTop;
  projectionCamera.updateProjectionMatrix();

  projectionCamera.position.set(
    guiController.x,
    guiController.y,
    guiController.z
  );
  projectionCamera.target.set(
    mesh.position.x,
    mesh.position.y,
    mesh.position.z
  );
  projectionCamera.updateMatrixWorld();

  mat4.multiply(
    textureProjectionMatrix,
    projectionCamera.projectionMatrix,
    projectionCamera.worldInverseMatrix
  );

  mesh.material.uniforms.uTextureProjectionMatrix.value.set(
    textureProjectionMatrix
  );
}
const range = 10;

gui.add(guiController, 'textureSize', 0.1, 2).onChange(updateProjection);
const guiCamera = gui.addFolder('Projection camera');
guiCamera.open();
guiCamera.add(guiController, 'x', -range, range).onChange(updateProjection);
guiCamera.add(guiController, 'y', -range, range).onChange(updateProjection);
guiCamera.add(guiController, 'z', -range, range).onChange(updateProjection);

const guiMesh = gui.addFolder('Mesh position');
guiMesh.open();
guiMesh.add(mesh.position, 'x', -range, range).onChange(updateProjection);
guiMesh.add(mesh.position, 'y', -range, range).onChange(updateProjection);
guiMesh.add(mesh.position, 'z', -range, range).onChange(updateProjection);

updateProjection();

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

  cameraHelper.update();
  controls.update();

  camera.updateMatrixWorld();
  renderer.render(scene, camera);

  stats.end();
}
update();
