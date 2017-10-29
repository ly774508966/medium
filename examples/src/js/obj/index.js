import {
  Renderer,
  Scene,
  PerspectiveCamera,
  OrbitControls,
  ObjLoader,
  Geometry,
  Material,
  Mesh,
  Color,
  PointLight,
  Lights,
  AmbientLight,
  DirectionalLight
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

// Scene
const scene = new Scene();

// Camera
const camera = new PerspectiveCamera({
  fov: 45
});

camera.position.set(2, 2, 2);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
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
      value: 0.7
    },
    color: {
      type: '3f',
      value: new Color(0xffffff).v
    }
  })
]);

const pointLights = new Lights([
  new PointLight({
    intensity: {
      type: 'f',
      value: 0.7
    }
  }),
  new PointLight({
    intensity: {
      type: 'f',
      value: 0.7
    }
  }),
  new PointLight({
    intensity: {
      type: 'f',
      value: 0.7
    }
  })
]);

directionalLights.get()[0].position.set(1, 1, 1);

scene.ambientLight = ambientLight;
scene.directionalLights = directionalLights;
scene.pointLights = pointLights;

// Obj
new ObjLoader('assets/models/obj/mass.obj')
  .then(data => {
    const geometry = new Geometry(data.vertices, data.indices, data.normals);

    const material = new Material({
      type: 'phong',
      ambientLight,
      directionalLights,
      pointLights,
      uniforms: {
        uDiffuse: {
          type: '3f',
          value: new Color(0xff0000).v
        }
      }
    });

    const mesh = new Mesh(geometry, material);

    const scale = 0.25;
    mesh.scale.set(scale, scale, scale);
    scene.add(mesh);
  })
  .catch(error => {
    console.log('error loading', error); // eslint-disable-line no-console
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

function update(time) {
  requestAnimationFrame(update);

  stats.begin();

  camera.updateMatrixWorld();

  const radius = 20;
  const t = time * 0.0005;

  pointLights.get().forEach((light, i) => {
    const theta = i / pointLights.length * Math.PI * 2;
    const x = Math.cos(t + theta) * radius;
    const y = Math.cos(t + theta) * radius;
    const z = Math.sin(t + theta) * radius;
    light.position.set(x, y, z);
  });

  renderer.render(scene, camera);

  stats.end();
}
update();
