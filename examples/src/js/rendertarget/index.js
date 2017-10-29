import {
  Renderer,
  Scene,
  PerspectiveCamera,
  GridHelper,
  OrbitControls,
  AxisHelper,
  RenderTarget,
  Material,
  Mesh,
  PlaneGeometry,
  OrthographicCamera,
  ShaderChunks,
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

// Render target
// const renderTarget = new RenderTarget({
//   width: window.innerWidth,
//   height: window.innerHeight,
//   pixelRatio: renderer.pixelRatio
// });
const renderTarget = new RenderTarget({
  width: 1024,
  height: 1024,
  pixelRatio: renderer.pixelRatio
});

// Scene
const scene = new Scene();
const scene2 = new Scene();

// Camera
const cameras = {
  main: new PerspectiveCamera({
    fov: 45
  }),
  rtt: new OrthographicCamera({
    fov: 45
  })
};

cameras.main.position.set(10, 5, 10);
cameras.main.lookAt();

cameras.rtt.position.set(0, 0, 1);
cameras.rtt.lookAt(0, 0, 0);

// Helpers
const controls = new OrbitControls(cameras.main, renderer.canvas);

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

controls.update();

const clock = new Clock(true);

const material = new Material({
  uniforms: {
    uTexture0: {
      type: 't',
      value: renderTarget.texture
    },
    uTime: {
      type: 'f',
      value: 0
    }
  },
  fragmentShader: `${ShaderChunks.EsVersion}
		#HOOK_PRECISION
		in vec2 vUv;
		uniform sampler2D uTexture0;
		uniform float uTime;
		out vec4 outgoingColor;

		void main(void) {
			vec3 color = texture(uTexture0, vUv).rgb;
			float r = sin(color.r + uTime) * 0.5 + 0.5;
			float g = cos(color.g + uTime) * 0.5 + 0.5;
			float b = sin(color.b + uTime) * 0.5 + 0.5;
			outgoingColor = vec4(r, g, b, 1.0);
		}
	`
});

const plane = new Mesh(new PlaneGeometry(2, 2), material);
scene2.add(plane);

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderTarget.setSize(width, height);
  renderer.setSize(width, height);
  cameras.main.aspect = width / height;
  cameras.main.updateProjectionMatrix();
  cameras.rtt.aspect = width / height;
  cameras.rtt.updateProjectionMatrix();
}
resize();

window.addEventListener('resize', resize);

let delta;
function update() {
  requestAnimationFrame(update);

  stats.begin();

  cameras.main.updateMatrixWorld();
  cameras.rtt.updateMatrixWorld();

  delta = clock.getDelta();

  plane.material.uniforms.uTime.value += delta;

  renderTarget.render(scene, cameras.main);
  renderer.render(scene2, cameras.rtt);

  stats.end();
}
update();
