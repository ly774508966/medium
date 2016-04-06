import {Renderer, Scene, PerspectiveCamera} from '../lib/index'
import {Mesh, Shader, PlaneGeometry, BoxGeometry} from '../lib/index'
import {Grid, OrbitControls} from '../lib/index'
import dat from 'dat-gui'

// Renderer
const renderer = new Renderer()
renderer.setDevicePixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.canvas)

// Scene
const scene = new Scene()

// Camera
const camera = new PerspectiveCamera({fov: 45})

camera.setPosition(10, 5, 10)
camera.setLookAt()

// Objects
let colors = []
colors = colors.concat([1, 0, 0, 1.0])
colors = colors.concat([0, 1, 0, 1.0])
colors = colors.concat([0, 0, 1, 1.0])
colors = colors.concat([1, 1, 0, 1.0])

// const geometry = new PlaneGeometry()
// geometry.setVertexColors(colors)
// const material = new Shader({
// 	vertexColors: true,
// 	vertexNormals: true,
// 	vertexShader: require('shaders/vertex.glsl'),
// 	fragmentShader: require('shaders/frag.glsl'),
// })
// const plane = new Mesh(geometry, material)
colors = []
for (var i = 0; i < 6; i++) {
	for (var j = 0; j < 4; j++) {
		colors = colors.concat([Math.random(), Math.random(), Math.random(), 1.0])
	}
}
console.log(colors.length);

const geometry = new BoxGeometry()
geometry.setVertexColors(colors)
const material = new Shader({
	vertexColors: true,
	vertexNormals: true,
	vertexShader: require('shaders/vertex.glsl'),
	fragmentShader: require('shaders/frag.glsl'),
})
const box = new Mesh(geometry, material)

scene.add(box)

// plane.x = 2
// plane.y = 2
// plane.z = 2
// plane.rotationX = Math.PI/4
// plane.rotationY = Math.PI/4
// plane.rotationZ = Math.PI/4

// scene.add(plane)

// Helpers
const controls = new OrbitControls(camera, renderer.canvas)
// const grid = new Grid(10)
const gui = new dat.GUI()
const cameraGUI = gui.addFolder('camera')
cameraGUI.open()
const lightingGUI = gui.addFolder('lighting')
lightingGUI.open()

// scene.add(grid)

// gui.add(controls, '_rotationX', -Math.PI/2, Math.PI/2).listen().onChange(()=> {controls.update()})
// gui.add(controls, '_rotationY', 0, Math.PI*2).listen().onChange(()=> {controls.update()})
// gui.add(controls, '_radius').listen()
cameraGUI.add(box, 'rotationX', 0, Math.PI*2).listen()
cameraGUI.add(box, 'rotationY', 0, Math.PI*2).listen()
cameraGUI.add(box, 'rotationZ', 0, Math.PI*2).listen()

// let range = 1
// lightingGUI.add(directionallight, 'x', -range, range)
// lightingGUI.add(directionallight, 'y', -range, range)
// lightingGUI.add(directionallight, 'z', -range, range)

controls.update()

window.addEventListener('resize', resize)

function resize() {
	renderer.setSize(window.innerWidth, window.innerHeight)
}
resize()

function update() {
	requestAnimationFrame(update)

	box.rotationX += 0.01
	// box.rotationZ += 0.01

	renderer.render(scene, camera)
}
update()
