module.exports = function(_flags) {

	const defaults = {
		vertexColors: false,
		lights: false,
		texture: false,
	}

	const flags = Object.assign(defaults, _flags)

	let defines = ''
	for(let key in flags){
		if(flags[key])
			defines += `#define ${key} \n`
	}

	return `

	${defines}

	attribute vec3 aVertexPosition;
	attribute vec3 aVertexNormal;

	#ifdef vertexColors
	attribute vec4 aVertexColor;
	#endif

	#ifdef texture
	attribute vec2 aTextureCoord;
	varying vec2 vTextureCoord;
	#endif

	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;
	uniform mat4 uModelMatrix;
	uniform mat3 uNormalMatrix;

	varying vec4 vColor;
	varying vec3 vNormal;
	varying vec3 uUv;

	void main(void){

		vColor = vec4(1.0);

		#ifdef vertexColors
		vColor = aVertexColor;
		#endif

		#ifdef texture
		vTextureCoord = aTextureCoord;
		#endif

		vNormal = uNormalMatrix * aVertexNormal;
		uUv = aVertexPosition;
		gl_Position = uPMatrix * uMVMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
	}
	`
}
