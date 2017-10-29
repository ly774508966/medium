import {
  Renderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  Material,
  PlaneGeometry,
  BoxGeometry,
  GridHelper,
  OrbitControls,
  AxisHelper,
  NormalsHelper,
  AmbientLight,
  DirectionalLight,
  PointLight,
  Texture,
  Color,
  Lights,
  VerticesHelper,
  Clock
} from '../../../../src/index.ts';
import stats from '../stats';

const { guiController } = require('../gui')();

// Renderer
const renderer = new Renderer({
  ratio: window.innerWidth / window.innerHeight,
  prefferedContext: guiController.context
});
renderer.setDevicePixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.canvas);

// Clock
const clock = new Clock(true);

// Scene
const scene = new Scene();

// Camera
const camera = new PerspectiveCamera({
  fov: 45
});

camera.position.set(10, 5, 10);
camera.lookAt();

// Objects
const subdivisions = 2;
let colors = [];

for (let i = 0; i < subdivisions * subdivisions; i += 1) {
  colors = colors.concat([1, 0, 0]);
  colors = colors.concat([0, 1, 0]);
  colors = colors.concat([0, 0, 1]);
  colors = colors.concat([1, 1, 0]);
}

let geometry = new PlaneGeometry(
  2,
  2,
  subdivisions,
  subdivisions,
  'XY',
  colors
);
const material1 = new Material({
  name: 'Plane'
});

const plane = new Mesh(geometry, material1);

// Normals currently don't update properly
const offset = 0;
plane.geometry.vertices[0 + offset].z += 1;
plane.geometry.vertices[1 + offset].z += 1;
plane.geometry.vertices[4 + offset].z += 1;
plane.geometry.vertices[5 + offset].z += 1;
plane.geometry.updateVertices();

plane.position.z = 2;
const planeNormalsHelper = new NormalsHelper(plane);
scene.add(planeNormalsHelper);
planeNormalsHelper.setParent(plane);
scene.add(plane);

colors = [];
for (let i = 0; i < 6; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    colors = colors.concat([Math.random(), Math.random(), Math.random()]);
  }
}

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
      value: new Color(0x0000ff).v
    }
  }),
  new DirectionalLight({
    intensity: {
      type: 'f',
      value: 0.7
    },
    color: {
      type: '3f',
      value: new Color(0x00ffff).v
    }
  })
]);

const pointLights = new Lights([
  new PointLight({
    intensity: {
      type: 'f',
      value: 0.7
    },
    color: {
      type: '3f',
      value: new Color(0xff0000).v
    }
  }),
  new PointLight({
    intensity: {
      type: 'f',
      value: 0.7
    },
    color: {
      type: '3f',
      value: new Color(0x00ff00).v
    }
  })
]);

directionalLights.get()[0].position.set(0, 1, 0);
directionalLights.get()[1].position.set(0, -1, 0);

scene.ambientLight = ambientLight;
scene.pointLights = pointLights;
scene.directionalLights = directionalLights;

const texture = new Texture({
  src: 'assets/textures/texture.jpg'
});
geometry = new BoxGeometry();
const material = new Material({
  type: 'phong',
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
      value: texture.texture
    }
  },
  ambientLight,
  directionalLights,
  pointLights
});
const box = new Mesh(geometry, material);

scene.add(box);

box.position.x = 3;
box.position.y = 3;

const boxNormalsHelper = new NormalsHelper(box);
scene.add(boxNormalsHelper);

boxNormalsHelper.setParent(box);

const verticesHelper = new VerticesHelper(box, 1);
scene.add(verticesHelper);
verticesHelper.setParent(box);

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
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
resize();

window.addEventListener('resize', resize);

let delta;
const radius = 30;
function update() {
  requestAnimationFrame(update);

  stats.begin();

  camera.updateMatrixWorld();

  delta = clock.getDelta();

  box.rotation.x += delta;
  box.rotation.y += delta;
  plane.rotation.x += delta;
  plane.rotation.y += delta;

  pointLights.get().forEach((light, i) => {
    const theta = i / pointLights.length * Math.PI * 2;
    const x = Math.cos(delta + theta) * radius;
    const y = Math.cos(delta + theta) * radius;
    const z = Math.sin(delta + theta) * radius;
    light.position.set(x, y, z);
  });

  renderer.render(scene, camera);

  stats.end();
}
update();
