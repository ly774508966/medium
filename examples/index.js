import * as Leonardo from '../lib/index'
import dat from 'dat-gui'

// Renderer
const renderer = new Leonardo.Renderer()
document.body.appendChild(renderer.canvas)

// Scene
const scene = new Leonardo.Scene()

// Camera
const camera = new Leonardo.PerspectiveCamera()

camera.setPosition(10, 2, 10)
camera.setLookAt()

// Objects
const geometry = new Leonardo.PlaneGeometry()
const material = new Leonardo.Shader()
const plane = new Leonardo.Mesh(geometry, material)

scene.add(plane)

// Helpers
const controls = new Leonardo.OrbitControls(camera, document)
const gui = new dat.GUI()

gui.add(controls, '_rotationX', -Math.PI/2, Math.PI/2).onChange(()=> {controls.update()})
gui.add(controls, '_rotationY', 0, Math.PI*2).onChange(()=> {controls.update()})
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
