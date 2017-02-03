import {
	mat4,
} from 'gl-matrix';
import UniformBuffer from 'core/UniformBuffer';

// Global uniform buffers
const uniformBuffers = {};

// Create buffers when gl context is ready
export function setup() {
	// ProjectionView
	const projectionViewData = new Float32Array([
		...mat4.create(),
		...mat4.create(),
	]);

	uniformBuffers.projectionView = new UniformBuffer(projectionViewData);
}

// Update projectionView buffer data
export function updateProjectionView(gl, projectionMatrix, modelViewMatrix) {
	gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, uniformBuffers.projectionView.buffer);
	gl.bindBuffer(gl.UNIFORM_BUFFER, uniformBuffers.projectionView.buffer);

	const data = [
		...projectionMatrix,
		...modelViewMatrix,
	];

	for (let i = 0; i < 32; i++) {
		uniformBuffers.projectionView.data[i] = data[i];
	}

	gl.bufferSubData(gl.UNIFORM_BUFFER, 0, uniformBuffers.projectionView.data);
	gl.bindBuffer(gl.UNIFORM_BUFFER, null);
}

export default uniformBuffers;
