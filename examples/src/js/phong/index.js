import {
  Renderer,
  Scene,
  PerspectiveCamera,
  GridHelper,
  OrbitControls,
  AxisHelper,
  CameraHelper,
  Lights,
  AmbientLight,
  DirectionalLight,
  Color,
  Mesh,
  SphereGeometry,
  Shader,
  PointLight
} from '../../../../src/index.ts';

const { gui, guiController } = require('../gui')();

guiController.debug = true;
gui.add(guiController, 'debug');

// Renderer
const renderer = new Renderer({
  ratio: window.innerWidth / window.innerHeight,
  prefferedContext: guiController.context
});
renderer.setDevicePixelRatio(window.devicePixelRatio);
renderer.setSissorTest(true);
document.body.appendChild(renderer.canvas);

// Scene
const scene = new Scene();

// Camera
const cameras = {
  dev: new PerspectiveCamera({
    fov: 45,
    far: 500,
    ratio: window.innerWidth / window.innerHeight
  }),
  main: new PerspectiveCamera({
    fov: 45,
    far: 500,
    ratio: window.innerWidth / window.innerHeight
  })
};

cameras.dev.position.set(10, 5, 10);
cameras.dev.lookAt();

cameras.main.position.set(10, 5, 10);
cameras.main.lookAt();

// Helpers
const controls = new OrbitControls(cameras.dev, renderer.canvas);
controls.smoothing = true;

const grid = new GridHelper(10);
scene.add(grid);

const axis = new AxisHelper(1);
scene.add(axis);

const cameraHelper = new CameraHelper(cameras.main);
scene.add(cameraHelper);

controls.update();

const ambientLight = new Lights([
  new AmbientLight({
    intensity: {
      type: 'f',
      value: 0.7
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

const pointLights = new Lights([
  new PointLight({
    color: {
      type: '3f',
      value: new Color(0xffffff).v
    },
    specularColor: {
      type: '3f',
      value: new Color(0xff0000).v
    },
    shininess: {
      type: 'f',
      value: 6
    },
    intensity: {
      type: 'f',
      value: 10
    }
  }),
  new PointLight({
    color: {
      type: '3f',
      value: new Color(0xffffff).v
    },
    specularColor: {
      type: '3f',
      value: new Color(0x00ff00).v
    },
    shininess: {
      type: 'f',
      value: 6
    },
    intensity: {
      type: 'f',
      value: 10
    }
  })
]);

directionalLights.get()[0].position.set(1, 1, 1);
pointLights.get()[0].position.set(5, 5, 5);
pointLights.get()[1].position.set(-5, 5, 5);

const range = 5;
gui.add(pointLights.get()[0].position, 'x', -range, range).name('light 0 x');
gui.add(pointLights.get()[0].position, 'y', -range, range).name('light 0 y');
gui.add(pointLights.get()[0].position, 'z', -range, range).name('light 0 z');
gui.add(pointLights.get()[1].position, 'x', -range, range).name('light 1 x');
gui.add(pointLights.get()[1].position, 'y', -range, range).name('light 1 y');
gui.add(pointLights.get()[1].position, 'z', -range, range).name('light 1 z');

const lightHelpers = [];
for (let i = 0; i < pointLights.length; i += 1) {
  lightHelpers.push(
    new Mesh(
      new SphereGeometry(0.1, 32, 32),
      new Shader({
        uniforms: {
          uDiffuse: {
            type: '3f',
            value: [1, 0, 0]
          }
        },
        drawType: 2
      })
    )
  );
  scene.add(lightHelpers[i]);
}

scene.ambientLight = ambientLight;
scene.directionalLights = directionalLights;
scene.pointLights = pointLights;

// Objects
const mesh = new Mesh(
  new SphereGeometry(2, 32, 32),
  new Shader({
    directionalLights,
    ambientLight,
    pointLights,
    type: 'phong',
    uniforms: {
      uDiffuse: {
        type: '3f',
        value: new Color(0x666666).v
      }
    }
  })
);
scene.add(mesh);

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  cameras.dev.aspect = width / height;
  cameras.dev.updateProjectionMatrix();
  cameras.main.aspect = width / height;
  cameras.main.updateProjectionMatrix();
}
resize();

window.addEventListener('resize', resize);

function render(camera, x, y, width, height) {
  renderer.setSissor(
    x,
    y,
    width * window.innerWidth,
    height * window.innerHeight
  );
  renderer.setViewport(
    x,
    y,
    width * window.innerWidth,
    height * window.innerHeight
  );
  renderer.render(scene, camera);
}

function update() {
  requestAnimationFrame(update);

  cameras.dev.updateMatrixWorld();
  cameras.main.updateMatrixWorld();
  cameraHelper.update();
  controls.update();

  pointLights.get().forEach((light, i) => {
    lightHelpers[i].position.copy(light.position);
  });

  if (guiController.debug) {
    render(cameras.dev, 0, 0, 1, 1);
    render(cameras.main, 0, 0, 0.25, 0.25);
  } else {
    render(cameras.main, 0, 0, 1, 1);
  }
}
update();
