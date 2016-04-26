export function vertexShader(_flags) {

	return `
	attribute vec3 aVertexPosition;
	attribute vec2 aTextureCoord;
	varying vec2 vTextureCoord;
	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;
	uniform mat4 uModelMatrix;
	uniform mat3 uNormalMatrix;
	uniform float uTime;

	void main(void){
		vTextureCoord = aTextureCoord;
		// vTextureCoord.t *= 800.0/1280.0;
		// vTextureCoord.t += 0.5 - (800.0/1280.0)/2.0;
		gl_Position = uPMatrix * uMVMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
	}
	`
}

export function fragmentShader(_flags) {

	return `
	precision mediump float;
	varying vec2 vTextureCoord;
	uniform sampler2D uSampler0;
	uniform sampler2D uSampler1;

	void main(void){

		vec4 texture0 = texture2D(uSampler0, vec2(vTextureCoord.s, vTextureCoord.t));
		vec4 texture1 = texture2D(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));

		gl_FragColor = mix(texture0, texture1, .5);
	}
	`
}
