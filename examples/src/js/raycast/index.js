import { vec2 } from 'gl-matrix';
import {
  Renderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  Shader,
  GridHelper,
  OrbitControls,
  AxisHelper,
  Color,
  DirectionalLight,
  RayCaster,
  Vector2,
  SphereGeometry,
  BoxGeometry,
  Lights
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
  fov: 45
});

camera.position.set(10, 5, 10);
camera.lookAt();

const directionalLights = new Lights([
  new DirectionalLight({
    intensity: {
      type: 'f',
      value: 0.7
    }
  })
]);

directionalLights.get()[0].position.set(0.75, 1, 0.75);

scene.directionalLights = directionalLights;

const geometry = new BoxGeometry(2, 2, 2);
const material = new Shader({
  name: 'Box',
  hookFragmentPre: `
		uniform vec2 uIntersect;
	`,
  hookFragmentMain: `
		float circleRadius = 0.25;
		vec2 circleCenter = uIntersect;
		vec2 uvP = vec2(vUv.x, vUv.y);

		uvP -= circleCenter;

		float dist = sqrt(dot(uvP, uvP));

		color *= 0.5;

		if (dist < circleRadius) {
			color = vec3(1.0);
		}
	`,
  hookFragmentEnd: `
		outgoingColor = vec4(color, 1.0);
	`,
  uniforms: {
    uDiffuse: {
      type: '3f',
      value: new Color(0xff2a9d).v
    },
    uIntersect: {
      type: '2f',
      value: new Vector2().v
    }
  },
  directionalLights
});
const box = new Mesh(geometry, material);

const intersectHelper = new Mesh(
  new SphereGeometry(0.2),
  new Shader({
    uniforms: {
      uDiffuse: {
        type: '3f',
        value: new Color(0x000000).v
      }
    }
  })
);

box.position.y = 3;

scene.add(box);
scene.add(intersectHelper);

// Ray in model space
const raycaster = new RayCaster();

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
  camera.ratio = width / height;
  camera.updateProjectionMatrix();
}
resize();

const mouse = new Vector2();

function onMouseMove(event) {
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.pageY / window.innerHeight * 2 - 1);
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', onMouseMove);

function update() {
  requestAnimationFrame(update);

  raycaster.setFromCamera(mouse, scene, camera);
  const intersect = raycaster.intersectObject(box);

  if (intersect) {
    intersectHelper.position.copy(intersect.point);
    intersectHelper.visible = true;
    vec2.copy(box.shader.uniforms.uIntersect.value, intersect.uv.v);
  } else {
    intersectHelper.visible = false;
  }

  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  box.rotation.z += 0.01;

  renderer.render(scene, camera);
}
update();
