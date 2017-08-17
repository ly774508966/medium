import SimplexNoise from 'simplex-noise';
import { vec3, quat } from 'gl-matrix';
import * as DF from './distance-functions';
import {
  GL,
  Renderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  Shader,
  PlaneGeometry,
  OrbitControls,
  Texture3d,
  BoxGeometry,
  Constants,
  ShaderChunks,
  Capabilities,
  Lights,
  DirectionalLight,
  Color
} from '../../../../src/index.ts';

const { gui, guiController, getQuery, setQuery } = require('../gui')(['webgl2']);

guiController.df = getQuery('df') || 'torus';
guiController.size = getQuery('size') || 80;

if (getQuery('lights') === undefined) {
	guiController.lights = true;
} else {
	guiController.lights = getQuery('lights') === 'true'
}

// Renderer
const renderer = new Renderer({
  ratio: window.innerWidth / window.innerHeight,
  prefferedContext: guiController.context
});
renderer.setDevicePixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.canvas);

const { capabilities } = Capabilities;

// Scene
const scene = new Scene();

// Camera
const camera = new PerspectiveCamera({
  fov: 45
});

const zoom = 20;
camera.position.set(1 * zoom, 0.45 * zoom, 1 * zoom);
camera.lookAt();

const boundsGeometry = new BoxGeometry(5, 5, 5);
const boundsMesh = new Mesh(
  boundsGeometry,
  new Shader({
    drawType: Constants.DRAW_LINE_STRIP
  })
);
// scene.add(boundsMesh);

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);

controls.update();

const simplex = new SimplexNoise(Math.random);
const ray = vec3.create();
function generateGrid(size) {
  const src = new Uint8Array(size * size * size);

		const intersect = (ray, x, y, z) => {
			switch (guiController.df) {
				case 'torus':
					return DF.torus(ray, [0.2, 0.1]);
					case 'noise':
						return  Math.abs(simplex.noise3D(x * 0.035, y * 0.035, z * 0.035));
				default:
					return DF.sphere(ray, 0.25);
			}
		};

  for (let z = 0; z < size; z += 1) {
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        vec3.set(ray, 0.5 - x / size, 0.5 - y / size, 0.5 - z / size);
        src[z + y * size + x * size * size] = intersect(ray, x, y, z) * 20;
      }
    }
  }
  return src;
}

const src = generateGrid(guiController.size);

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

scene.directionalLights = directionalLights;

gui.add(guiController, 'lights').onChange(value => {
		setQuery('lights', value);
});

const range = 1;
gui
  .add(directionalLights.get()[0].uniforms.intensity, 'value', 0, 1)
  .name('light intensity');
gui
  .add(directionalLights.get()[0].position, 'x', -range, range)
  .name('light x');
gui
  .add(directionalLights.get()[0].position, 'y', -range, range)
  .name('light y');
gui
  .add(directionalLights.get()[0].position, 'z', -range, range)
  .name('light z');

const texture3d = new Texture3d({
  src,
  size: guiController.size
});

const PLANE_SIZE = 15;
const geometry = new PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 1, 1, 'XY');
const material = new Shader({
  hookVertexPre: `
		precision ${capabilities.precision} int;
		precision ${capabilities.precision} sampler3D;
		uniform float uSize;
		uniform vec3 uAxis;
		uniform float uAngle;
		in float aUvz;
		in vec3 aUv3;
		out vec3 vUv3;
		uniform float uFogDensity;
		out float vFogAmount;
		${ShaderChunks.Fog.exp2}

		mat4 rotationMatrix(vec3 axis, float angle) {
				axis = normalize(axis);
				float s = sin(angle);
				float c = cos(angle);
				float oc = 1.0 - c;
				return mat4(oc * axis.x * axis.x + c,     oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
										oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
										oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
										0.0,                                0.0,                                0.0,                                1.0);
		}

		vec3 rotate(vec3 v, vec3 axis, float angle) {
				mat4 m = rotationMatrix(axis, angle);
				return (m * vec4(v, 1.0)).xyz;
		}
	`,
  hookVertexMain: `
		transformed.z = (-uSize * 0.5) + (aUvz * uSize);
	`,
  hookVertexEnd: `
		vUv3.x = 0.5 + (aVertexPosition.x / uSize);
		vUv3.y = 0.5 + (aVertexPosition.y / uSize);
		vUv3.z = aUvz;

		// vUv3 = rotate(vUv3 - vec3(0.5), vec3(1.0, 1.0, 1.0), uAngle);
		vUv3 = rotate(vUv3 - vec3(0.5), uAxis, uAngle);
		vUv3 += vec3(0.5);

		float fogDistance = length(gl_Position.xyz);
		vFogAmount = fogExp2(fogDistance, uFogDensity);
	`,
  hookFragmentPre: `
		precision ${capabilities.precision} int;
		precision ${capabilities.precision} sampler3D;
		uniform sampler3D uTexture;
		in float vFogAmount;
		in vec3 vUv3;

		float udBox( vec3 p, vec3 b )
		{
		  return length(max(abs(p)-b,0.0));
		}
	`,
  hookFragmentMain: `
		// Mask out planes outside the bounds
		if (udBox(vUv3 - vec3(0.5), vec3(0.335)) > 0.0) {
			discard;
		}

		#ifdef directionalLights
		vec3 x = dFdx(vUv3);
		vec3 y = dFdy(vUv3);
		normal = normalize(cross(x, y));
		#endif

		vec3 fogColor = vec3(0.0);
		color = mix(vUv3, fogColor, vFogAmount);
	`,
  hookFragmentEnd: `
		vec4 texel = texture(uTexture, vUv3);
		outgoingColor = vec4(color * texel.r, 1.0 - texel.r);
	`,
  uniforms: {
    uFogDensity: {
      type: 'f',
      value: 0.02
    },
    uSize: {
      type: 'f',
      value: PLANE_SIZE
    },
    uTexture: {
      type: 't3d',
      value: texture3d.texture
    },
    uAngle: {
      type: 'f',
      value: 0,
    },
    uAxis: {
      type: '3f',
      value: [0, 0, 0]
    }
  },
  directionalLights: guiController.lights ? directionalLights : null,
});

gui.add(material.uniforms.uFogDensity, 'value', 0, 0.1).name('fog density');

// Depth offset
const aUvzData = new Float32Array(guiController.size);
for (let i = 0; i < guiController.size; i += 1) {
  aUvzData[i] = i / guiController.size;
}

geometry.addInstancedBufferAttribute('aUvz', aUvzData, 1);

const plane = new Mesh(geometry, material);
plane.setInstanceCount(guiController.size);
scene.add(plane);

const size = [32, 64, 80, 128];
gui.add(guiController, 'size', size).onChange(value => {
		setQuery('size', value);
});

const distanceFunctions = ['torus', 'noise', 'sphere'];
gui.add(guiController, 'df', distanceFunctions).name('distance function').onChange(value => {
		setQuery('df', value);
});

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.ratio = width / height;
  camera.updateProjectionMatrix();
}
resize();

window.addEventListener('resize', resize);

const gl = GL.get();
gl.enable(gl.BLEND);
gl.blendEquation(gl.FUNC_ADD);
gl.blendFunc(gl.ONE, gl.SRC_ALPHA);

let axisAngle;
const quaternionAxis = vec3.create();

function update() {
  requestAnimationFrame(update);
  camera.updateMatrixWorld();

  plane.lookAt(camera.position);
  quat.identity(quaternionAxis);
  axisAngle = quat.getAxisAngle(quaternionAxis, plane._quaternion);

  plane.shader.uniforms.uAxis.value[0] = -quaternionAxis[0];
  plane.shader.uniforms.uAxis.value[1] = -quaternionAxis[1];
  plane.shader.uniforms.uAxis.value[2] = -quaternionAxis[2];
  plane.shader.uniforms.uAngle.value = axisAngle;

  renderer.render(scene, camera);
}

update();
