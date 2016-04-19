export function vertexShader(_flags) {

	return `
	attribute vec3 aVertexPosition;
	attribute vec2 aTextureCoord;
	varying vec2 vTextureCoord;
	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;
	uniform mat4 uModelMatrix;
	uniform mat3 uNormalMatrix;

	void main(void){
		vTextureCoord = aTextureCoord;
		vTextureCoord.t *= 720.0/1280.0;
		vTextureCoord.t += 0.5 - (720.0/1280.0)/2.0;
		gl_Position = uPMatrix * uMVMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
	}
	`
}

export function fragmentShader(_flags) {

	return `
	precision mediump float;
	varying vec2 vTextureCoord;
	uniform sampler2D uSampler;

	void main(void){
		gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
	}
	`
}
