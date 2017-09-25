import { mat4 } from 'gl-matrix';

import {
  GL,
  AmbientLight,
  Color,
  Constants,
  DirectionalLight,
  Geometry,
  Lights,
  LineGeometry,
  MathUtils,
  Mesh,
  OrbitControls,
  PerspectiveCamera,
  ArrayUtils,
  RayCaster,
  Renderer,
  Scene,
  Shader,
  ShaderChunks,
  SphereGeometry,
  Texture,
  Vector2,
  Vector3
} from '../../../../src/index.ts';
import DRACOLoader from '../draco/DRACOLoader';
import Decal from './decal';

const { guiController } = require('../gui')(['webgl2']);

// Shader parser needs to be fixed for webgl1

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
  ratio: window.innerWidth / window.innerHeight
});

camera.position.set(25, 10, 25);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
controls.smoothing = true;

controls.update();

const ambientLight = new Lights([
  new AmbientLight({
    intensity: {
      type: 'f',
      value: 0.7
    }
  })
]);

const directionalLights = new Lights([
  new DirectionalLight({
    intensity: {
      type: 'f',
      value: 1.7
    },
    color: {
      type: '3f',
      value: new Color(0xffffff).v
    }
  })
]);

directionalLights.get()[0].position.set(0.13, 0.34, -0.14);

scene.ambientLight = ambientLight;
scene.directionalLights = directionalLights;

const normalMap = new Texture({
  src: 'assets/models/draco/goethe-lifemask/normal-map.jpg'
});

const dracoLoader = new DRACOLoader(undefined, 'assets/third-party/draco');
let face;
dracoLoader.load(
  'assets/models/draco/goethe-lifemask/goeth-lifemask.drc',
  geometry => {
    face = new Mesh(
      geometry,
      new Shader({
        directionalLights,
        ambientLight,
        type: 'lambert',
        hookVertexPre: `
        uniform float uFogDensity;
        out float vFogAmount;
        ${ShaderChunks.Fog.exp2}
      `,
        hookVertexEnd: `
        float fogDistance = length(gl_Position.xyz);
        vFogAmount = fogExp2(fogDistance, uFogDensity);
      `,
        hookFragmentPre: `
        in float vFogAmount;
        uniform sampler2D uNormalMap;
      `,
        hookFragmentMain: `
        normal = texture(uNormalMap, vUv).xyz;
      `,
        hookFragmentEnd: `
        vec3 fogColor = vec3(0.0);
        outgoingColor = vec4(mix(color, fogColor, vFogAmount), 1.0);
      `,
        uniforms: {
          uDiffuse: {
            type: '3f',
            value: new Color(0xffffff).v
          },
          uNormalMap: {
            type: 't',
            value: normalMap.texture
          },
          uFogDensity: {
            type: 'f',
            value: 0.054
          }
        }
      })
    );

    scene.add(face);
  }
);

// Line helper
const points = [...[0, 0, 0], ...[1, 1, 1]];
const bufferVertices = new Float32Array(points);

const line = new Mesh(
  new LineGeometry(bufferVertices),
  new Shader({
    drawType: Constants.DRAW_LINES
  })
);
scene.add(line);

const intersectHelper = new Mesh(new SphereGeometry(0.2), new Shader());
scene.add(intersectHelper);

const raycaster = new RayCaster();
const mouse = new Vector2();

const paintMaps = [
  new Texture({ src: 'assets/textures/paint/splatter-0.jpg' }),
  new Texture({ src: 'assets/textures/paint/splatter-1.jpg' }),
  new Texture({ src: 'assets/textures/paint/splatter-2.jpg' })
];

let intersect = null;
function onMouseClick() {
  if (intersect === null) return;
  const eye = new Vector3(1, 1, 1)
    .multiply(intersect.face.normal.clone())
    .add(intersect.point.clone()).v;

  const target = intersect.point.clone().v;

  const rotationQuat = MathUtils.lookAt(eye, target, Vector3.up.v);
  const matrixFromQuat = mat4.fromQuat(mat4.create(), rotationQuat);

  // https://github.com/mrdoob/three.js/blob/master/src/math/Euler.js#L133
  const m11 = matrixFromQuat[0];
  const m12 = matrixFromQuat[4];
  const m13 = matrixFromQuat[8];
  const m22 = matrixFromQuat[5];
  const m23 = matrixFromQuat[9];
  const m32 = matrixFromQuat[6];
  const m33 = matrixFromQuat[10];

  let x;
  let z;
  const y = Math.asin(MathUtils.clamp(m13, -1, 1));
  if (Math.abs(m13) < 0.99999) {
    x = Math.atan2(-m23, m33);
    z = Math.atan2(-m12, m11);
  } else {
    x = Math.atan2(m32, m22);
    z = 0;
  }

  const position = intersect.point.clone();
  const rotation = new Vector3(x, y, z);
  const scale = MathUtils.lerp(4, 6, Math.random());
  const dimensions = new Vector3(scale, scale, scale);
  const check = new Vector3(1, 1, 1);

  rotation.z = Math.random() * 2 * Math.PI;

  const decal = new Decal(face, position, rotation, dimensions, check);
  const data = decal.compute();
  decal.dispose();

  // Offset decal mesh from face
  data.vertices.forEach(vertex => {
    vertex.scale(1.001);
  });

  const verts = ArrayUtils.flatten(data.vertices);
  const normals = ArrayUtils.flatten(data.normals);
  const uvs = ArrayUtils.flatten(data.uvs);
  const uvNormal = ArrayUtils.flatten(data.uvsObjectSpace);

  const geometry = new Geometry(
    new Float32Array(verts),
    new Uint16Array(data.indices),
    new Float32Array(normals),
    new Float32Array(uvs)
  );

  const gl = GL.get();
  geometry.addAttribute('uvNormal', gl.ARRAY_BUFFER, uvNormal, 2);

  const decalMesh = new Mesh(
    geometry,
    new Shader({
      type: 'lambert',
      ambientLight,
      hookVertexPre: `
        in vec2 uvNormal;
        out vec2 vUvNormal;
      `,
      hookVertexEnd: `
        vUvNormal = uvNormal;
     `,
      hookFragmentPre: `
        in vec2 vUvNormal;
        uniform sampler2D uPaint;
        uniform sampler2D uNormalMap;
        ${ShaderChunks.Packing.packNormalToRGB}
    `,
      hookFragmentMain: `
        normal = texture(uNormalMap, vUvNormal).xyz;
        color = normal;
        vec4 texel = texture(uPaint, vUv);
    `,
      hookFragmentEnd: `
        if (texel.r > 0.9) {
          discard;
        }
      `,
      uniforms: {
        uPaint: {
          type: 't',
          value: paintMaps[Math.floor(Math.random() * paintMaps.length)].texture
        },
        uNormalMap: {
          type: 't',
          value: normalMap.texture
        }
      }
    })
  );

  scene.add(decalMesh);
}

function onMouseMove(event) {
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.pageY / window.innerHeight * 2 - 1);
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.ratio = width / height;
  camera.updateProjectionMatrix();
}
resize();

window.addEventListener('resize', resize);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('click', onMouseClick);

function update() {
  requestAnimationFrame(update);

  controls.update();

  if (face) {
    raycaster.setFromCamera(mouse, scene, camera, face);
    intersect = raycaster.intersectObject(face);

    if (intersect) {
      intersectHelper.position.copy(intersect.point);
      intersectHelper.visible = true;
      line.visible = true;
      const v0 = intersect.point.clone();
      const v1 = new Vector3(2, 2, 2).multiply(intersect.face.normal.clone());
      v1.add(intersect.point.clone());
      line.geometry.vertices[0].copy(v0);
      line.geometry.vertices[1].copy(v1);
      line.geometry.updateVertices();
    } else {
      intersectHelper.visible = false;
      line.visible = false;
    }
  }

  camera.updateMatrixWorld();
  renderer.render(scene, camera);
}
update();
