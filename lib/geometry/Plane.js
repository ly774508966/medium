import * as GL from '../core/GL';

export default class Plane {

	constructor(width = 1, height = 1, divisionsX = 1, divisionsY = 1) {

		this._width = width;
		this._height = height;
		this._divisionsX = divisionsX;
		this._divisionsY = divisionsY;

		const gl = GL.get();

		/*
  	(-1, 1)  (0, 1)  (1, 1)
  		(-1, 0)  (0, 0)  (1, 0)
  		(-1,-1)  (0,-1)  (1,-1)
   */

		// Vertex positions
		this.vertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);

		const vertices = [1.0, 1.0, 0.0, // tr
		-1.0, 1.0, 0.0, // tl
		1.0, -1.0, 0.0, // br
		-1.0, -1.0, 0.0];

		// bl
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

		this.vertexPositionBuffer.itemSize = 3;
		this.vertexPositionBuffer.numItems = 4;

		// Vertex colors
		this.vertexColorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);

		let colors = [];
		colors = colors.concat([1, 0, 0, 1.0]);
		colors = colors.concat([0, 1, 0, 1.0]);
		colors = colors.concat([0, 0, 1, 1.0]);
		colors = colors.concat([1, 1, 0, 1.0]);

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

		this.vertexColorBuffer.itemSize = 4;
		this.vertexColorBuffer.numItems = 4;
	}
}