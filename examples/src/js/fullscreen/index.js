import dat from 'dat-gui'
import {
	Renderer,
	Scene,
	OrthographicCamera,
	PerspectiveCamera,
	Mesh,
	Shader,
	PlaneGeometry,
	BoxGeometry,
	Grid,
	OrbitControls,
	Texture
} from 'src/index'
import {
	vertexShader,
	fragmentShader
} from './shaders.glsl'

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

let geometry = new PlaneGeometry(1, 1)
geometry.setVertexColors(colors)
let material = new Shader({
	uniforms: {
		uTime: {
			type: 'f',
			value: 0
		},
		uSampler0: {
			type: 't',
			value: new Texture({
				src: 'assets/Screen.png'
			})
		},
		uSampler1: {
			type: 't',
			value: new Texture({
				src: 'assets/texture.jpg'
			})
		}
	},
}, vertexShader, fragmentShader)
const plane = new Mesh(geometry, material)

scene.add(plane)

window.addEventListener('resize', resize)

function resize() {
	// let scale = 1
	// renderer.setSize(1280*scale, 800*scale)
	renderer.setSize(window.innerWidth, window.innerHeight)
}
resize()

function update() {
	requestAnimationFrame(update)

	material.uniforms.uTime.value++

	renderer.render(scene, camera)
}
renderer.render(scene, camera)
renderer.render(scene, camera)
renderer.render(scene, camera)
renderer.render(scene, camera)

update()
