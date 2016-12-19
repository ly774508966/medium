export default `

	#HOOK_DEFINES

	attribute vec3 aVertexPosition;

	#ifdef normals
	attribute vec3 aVertexNormal;
	varying vec3 vNormal;
	#endif

	#ifdef uv
	attribute vec2 aUv;
	varying vec2 vUv;
	#endif

	#ifdef vertexColors
	attribute vec4 aVertexColor;
	#endif

	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;
	uniform mat4 uModelMatrix;
	uniform mat3 uNormalMatrix;
	varying vec4 vColor;

	#HOOK_VERTEX_PRE

	void main(void){

		vColor = vec4(1.0);

		#ifdef vertexColors
		vColor = aVertexColor;
		#endif

		#ifdef uv
		vUv = aUv;
		#endif

		#HOOK_VERTEX_MAIN

		#ifdef normals
		vNormal = uNormalMatrix * aVertexNormal;
		#endif

		gl_Position = uPMatrix * uMVMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);

		#HOOK_VERTEX_END
	}
`;
