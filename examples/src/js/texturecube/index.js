import {
  Renderer,
  Scene,
  PerspectiveCamera,
  OrbitControls,
  TextureCube,
  Material,
  Mesh,
  JsonLoader,
  Geometry
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

camera.position.set(10, 5, 10);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

controls.update();

const texture = new TextureCube({
  src: [
    'assets/textures/cube/blackice/px.jpg',
    'assets/textures/cube/blackice/nx.jpg',
    'assets/textures/cube/blackice/py.jpg',
    'assets/textures/cube/blackice/ny.jpg',
    'assets/textures/cube/blackice/pz.jpg',
    'assets/textures/cube/blackice/nz.jpg'
  ]
});

let mesh;

new JsonLoader('assets/models/json/mass.json')
  .then(data => {
    const geometry = new Geometry(data.vertices, data.indices, data.normals);

    const material = new Material({
      hookFragmentPre: `
			uniform samplerCube uTexture0;
		`,
      hookFragmentMain: `
			color = texture(uTexture0, vNormal).rgb;
		`,
      uniforms: {
        uTexture0: {
          type: 'tc',
          value: texture.texture
        }
      }
    });

    mesh = new Mesh(geometry, material);

    const scale = 2.25;
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

function update() {
  requestAnimationFrame(update);

  stats.begin();

  camera.updateMatrixWorld();

  if (mesh) {
    mesh.rotation.y += 0.003;
  }

  renderer.render(scene, camera);

  stats.end();
}
update();
