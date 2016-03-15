import {Renderer, Vector3} from '../lib/index'


const renderer = new Renderer()

function update() {
	requestAnimationFrame(update)
	renderer.draw()
}

update()
