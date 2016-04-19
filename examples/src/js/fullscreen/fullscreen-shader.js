import {Renderer, Scene, OrthographicCamera, PerspectiveCamera} from 'src/index'
import {Mesh, Shader, PlaneGeometry, BoxGeometry} from 'src/index'
import {Grid, OrbitControls} from 'src/index'
import {Texture} from 'src/index'
import {vertexShader, fragmentShader} from './shaders.glsl'
import dat from 'dat-gui'

// Renderer
const renderer = new Renderer()
renderer.setDevicePixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.canvas)

// Scene
const scene = new Scene()

// Camera
// const camera = new PerspectiveCamera({fov: 1})
const camera = new OrthographicCamera()

camera.setPosition(0, 0, 1)
camera.setLookAt(0, 0, 0)

// Objects
let colors = []
colors = colors.concat([1, 0, 0, 1.0])
colors = colors.concat([0, 1, 0, 1.0])
colors = colors.concat([0, 0, 1, 1.0])
colors = colors.concat([1, 1, 0, 1.0])

let texture = new Texture({src: 'assets/sierpinski.jpg'})

let geometry = new PlaneGeometry(1, 1)
geometry.setVertexColors(colors)
let material = new Shader({
	texture: texture,
}, vertexShader, fragmentShader)
const plane = new Mesh(geometry, material)

scene.add(plane)

window.addEventListener('resize', resize)

function resize() {
	let scale = 0.75
	renderer.setSize(1280*scale, 720*scale)
	// renderer.setSize(window.innerWidth, window.innerHeight)
}
resize()

function update() {
	requestAnimationFrame(update)

	renderer.render(scene, camera)
}

update()
