import * as GL from '../core/GL';
import UniformBuffer from '../core/UniformBuffer';
import DirectionalLight from '../lights/DirectionalLight';
import PointLight from '../lights/PointLight';

let gl;

/**
	* Genetic class for PointLights and DirectionalLights
	* Creates a uniform buffer which stores all the data for the specific
	* light type
	*/
export default class Lights {
	lights: Array<DirectionalLight|PointLight>;
	uniformBuffer: UniformBuffer;
	_lightsData: Float32Array;

	constructor(lights) {
		this.lights = lights;

		if (GL.webgl2) {
			const dataLength = this.lights[0].data.length;

			// Setup data
			const values = Array(lights.length * dataLength);
			const data = new Float32Array(values);

			// Create uniform buffer to store all point lights data
			// The uniform block is an array of lights
			this.uniformBuffer = new UniformBuffer(data);

			// Tmp array for updating the lights data buffer
			this._lightsData = new Float32Array(lights[0].data.length * lights.length);
		}
	}

	get length() {
		return this.lights.length;
	}

	get() {
		return this.lights;
	}

	update() {
		if (GL.webgl2) {
			// Get data from lights and update the uniform buffer
			this.lights.forEach((light, i) => {
				light.update();
				this._lightsData.set(light.data, i * light.data.length);
			});
			this.uniformBuffer.setValues(this._lightsData, 0);
		} else {
			this.lights.forEach(light => {
				light.update();
			});
		}
	}

	bind() {
		if (GL.webgl2) {
			gl = GL.get();

			gl.bindBufferBase(gl.UNIFORM_BUFFER, 1, this.uniformBuffer.buffer);
			gl.bindBuffer(gl.UNIFORM_BUFFER, this.uniformBuffer.buffer);

			gl.bufferSubData(gl.UNIFORM_BUFFER, 0, this.uniformBuffer.data);
			gl.bindBuffer(gl.UNIFORM_BUFFER, null);
		}
	}
}
