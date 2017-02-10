import {
	Renderer,
	Scene,
	PerspectiveCamera,
	OrbitControls,
	ObjLoader,
	Geometry,
	Shader,
	Mesh,
	// DirectionalLight,
	Lights,
	Color,
	PointLight,
} from 'index';
// import dat from 'dat-gui';

// const gui = new dat.GUI();
// gui.open();

// Renderer
const renderer = new Renderer({
	ratio: window.innerWidth / window.innerHeight,
});
renderer.setDevicePixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.canvas);

// Scene
const scene = new Scene();

// Camera
const camera = new PerspectiveCamera({
	fov: 45,
});

camera.position.set(2, 2, 2);
camera.lookAt();

// Helpers
const controls = new OrbitControls(camera, renderer.canvas);
controls.update();

// const directionalLight = new DirectionalLight();
//
// directionalLight.position.set(1, 1, 1);
//
// scene.add(directionalLight);

const pointLights = new Lights([
	new PointLight({
		intensity: {
			type: 'f',
			value: 0.7,
		},
	}),
	new PointLight({
		intensity: {
			type: 'f',
			value: 0.7,
		},
	}),
	new PointLight({
		intensity: {
			type: 'f',
			value: 0.7,
		},
		color: {
			type: '3f',
			value: new Color(0x000000).v,
		},
	}),
]);

scene.pointLights = pointLights;

// pointLight2.uniforms.color.value[0] = 0;
// pointLight2.uniforms.color.value[1] = 0;
// pointLight2.uniforms.color.value[2] = 1;

// Obj
new ObjLoader('assets/models/mass.obj').then(objGeometry => {
	// console.log('objGeometry', objGeometry);
	const geometry = new Geometry(objGeometry.vertices,
		objGeometry.indices, objGeometry.vertexNormals);

	const material = new Shader({
		// directionalLights: [directionalLight.uniforms],
		pointLights,
		uniforms: {
			uDiffuse: {
				type: '3f',
				value: new Color(0x000000).v,
			},
		},
	});

	const mesh = new Mesh(geometry, material);

	const scale = 0.25;
	mesh.scale.set(scale, scale, scale);
	scene.add(mesh);

	// gui.add(mesh.position, 'y', -10, 10);

	// const normalsHelper = new NormalsHelper(mesh);
	// scene.add(normalsHelper);
}).catch(error => {
	console.log('error loading', error);
});

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
}
resize();

window.addEventListener('resize', resize);

function update(time) {
	requestAnimationFrame(update);

	const radius = 20;
	const t = time * 0.0005;

	pointLights.get().forEach((light, i) => {
		const theta = (i / pointLights.length) * Math.PI * 2;
		const x = Math.cos(t + theta) * radius;
		const y = Math.cos(t + theta) * radius;
		const z = Math.sin(t + theta) * radius;
		light.position.set(x, y, z);
	});

	renderer.render(scene, camera);
}
update();
