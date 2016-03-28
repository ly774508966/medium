import {Renderer, Scene, PerspectiveCamera} from '../lib/index'
import {Mesh, Shader, PlaneGeometry} from '../lib/index'
import {Grid, OrbitControls} from '../lib/index'
import dat from 'dat-gui'

// Renderer
const renderer = new Renderer()
renderer.setDevicePixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.canvas)

// Scene
const scene = new Scene()

// Camera
const camera = new PerspectiveCamera({fov: 70})

camera.setPosition(5, 5, 5)
camera.setLookAt()

// Objects
let colors = []
colors = colors.concat([1, 0, 0, 1.0])
colors = colors.concat([0, 1, 0, 1.0])
colors = colors.concat([0, 0, 1, 1.0])
colors = colors.concat([1, 1, 0, 1.0])

const geometry = new PlaneGeometry()
geometry.setVertexColors(colors)
const material = new Shader({
	vertexColors: true,
	vertexShader: require('shaders/vertex.glsl'),
	fragmentShader: require('shaders/frag.glsl'),
})
const plane = new Mesh(geometry, material)

scene.add(plane)

// Helpers
const controls = new OrbitControls(camera, document)
const grid = new Grid(10)
const gui = new dat.GUI()

scene.add(grid)

gui.add(controls, '_rotationX', -Math.PI/2, Math.PI/2).listen().onChange(()=> {controls.update()})
gui.add(controls, '_rotationY', 0, Math.PI*2).listen().onChange(()=> {controls.update()})
gui.add(controls, '_radius').listen()

controls.update()

window.addEventListener('resize', resize)

function resize() {
	renderer.setSize(window.innerWidth, window.innerHeight)
}
resize()

function update() {
	requestAnimationFrame(update)
	renderer.render(scene, camera)
}
update()
