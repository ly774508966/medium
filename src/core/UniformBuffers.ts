import {
	mat4,
} from 'gl-matrix';
import UniformBuffer from './UniformBuffer';

// Global uniform buffers
const uniformBuffers: any = {};

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
let projectionViewData;
export function updateProjectionView(gl: WebGLRenderingContext, projectionMatrix: mat4, modelViewMatrix: mat4) {
	gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, uniformBuffers.projectionView.buffer);
	gl.bindBuffer(gl.UNIFORM_BUFFER, uniformBuffers.projectionView.buffer);

	projectionViewData = [
		...projectionMatrix,
		...modelViewMatrix,
	];

	uniformBuffers.projectionView.data.set(projectionViewData, 0);

	gl.bufferSubData(gl.UNIFORM_BUFFER, 0, uniformBuffers.projectionView.data);
	gl.bindBuffer(gl.UNIFORM_BUFFER, null);
}

export default uniformBuffers;
