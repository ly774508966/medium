import * as Leonardo from '../lib/index'

const renderer = new Leonardo.Renderer()

// console.log(Leonardo.Renderer);

document.body.appendChild(renderer.canvas)

const scene = new Leonardo.Scene()

const geometry = new Leonardo.PlaneGeometry()
const material = new Leonardo.Shader()
const plane = new Leonardo.Mesh(geometry, material)

scene.add(plane)

window.addEventListener('resize', resize)

function resize() {
	renderer.setSize(window.innerWidth, window.innerHeight)
}
resize()

function update() {
	requestAnimationFrame(update)
	renderer.render(scene)
}

update()
