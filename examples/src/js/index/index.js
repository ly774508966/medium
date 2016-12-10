import {
	Renderer,
	Scene,
	PerspectiveCamera,
	Mesh,
	Shader,
	PlaneGeometry,
	BoxGeometry,
	Grid,
	OrbitControls,
} from 'index';
import dat from 'dat-gui';

// Renderer
const renderer = new Renderer();
renderer.setDevicePixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.canvas);

// Scene
const scene = new Scene();

// Camera
const camera = new PerspectiveCamera({
	fov: 45,
});

camera.position.set(10, 5, 10);
camera.lookAt();

// Objects
let colors = [];
colors = colors.concat([1, 0, 0, 1.0]);
colors = colors.concat([0, 1, 0, 1.0]);
colors = colors.concat([0, 0, 1, 1.0]);
colors = colors.concat([1, 1, 0, 1.0]);

let geometry = new PlaneGeometry();
// geometry.setVertexColors(colors);
const material1 = new Shader({
	uv: true,
	// vertexColors: true,
	vertexNormals: true,
	lights: false,
	vertexShader: require('shaders/vertex.glsl'),
	fragmentShader: require('shaders/frag.glsl'),
	uniforms: {
		uAlpha: {
			type: 'f',
			value: 1,
		},
	},
});

const plane = new Mesh(geometry, material1);
geometry.setVertexColors(colors);
const material2 = new Shader({
	uv: true,
	vertexColors: true,
	vertexNormals: true,
	vertexShader: require('shaders/vertex.glsl'),
	fragmentShader: require('shaders/frag.glsl'),
	uniforms: {
		uAlpha: {
			type: 'f',
			value: 1,
		},
	},
});
const plane2 = new Mesh(geometry, material2);

plane.position.x = 2;
plane2.position.z = 1.1;
// plane.rotationX = Math.PI/4
// plane.rotationY = Math.PI/4
// plane.rotationZ = Math.PI/4
// box.scaleX = 2

scene.add(plane);
scene.add(plane2);

colors = [];
for (let i = 0; i < 6; i++) {
	for (let j = 0; j < 4; j++) {
		colors = colors.concat([Math.random(), Math.random(), Math.random(), 1.0]);
	}
}

geometry = new BoxGeometry();
geometry.setVertexColors(colors);
const material = new Shader({
	vertexColors: true,
	vertexNormals: true,
	lights: false,
	vertexShader: require('shaders/vertex.glsl'),
	fragmentShader: require('shaders/frag.glsl'),
});
const box = new Mesh(geometry, material);

scene.add(box);

box.position.x = 3;
box.position.y = 3;

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
const gui = new dat.GUI();
const cameraGUI = gui.addFolder('camera');
cameraGUI.open();
const lightingGUI = gui.addFolder('lighting');
lightingGUI.open();

const grid = new Grid(10);
scene.add(grid);

// gui.add(controls, '_rotationX', -Math.PI/2, Math.PI/2).listen().onChange(()=> {controls.update()})
// gui.add(controls, '_rotationY', 0, Math.PI*2).listen().onChange(()=> {controls.update()})
// gui.add(controls, '_radius').listen()
// cameraGUI.add(box, 'rotationX', 0, Math.PI*2).listen()
// cameraGUI.add(box, 'rotationY', 0, Math.PI*2).listen()
// cameraGUI.add(box, 'rotationZ', 0, Math.PI*2).listen()

// let range = 1
// lightingGUI.add(directionallight, 'x', -range, range)
// lightingGUI.add(directionallight, 'y', -range, range)
// lightingGUI.add(directionallight, 'z', -range, range)

controls.update();

function resize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
}
resize();

window.addEventListener('resize', resize);

function update() {
	requestAnimationFrame(update);
	renderer.render(scene, camera);
}
update();
