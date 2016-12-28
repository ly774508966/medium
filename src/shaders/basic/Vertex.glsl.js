import pointLights from 'shaders/chunks/PointLights.glsl';

export default `

	#HOOK_DEFINES

	// Position
	uniform mat4 uProjectionMatrix;
	uniform mat4 uViewMatrix;
	uniform mat4 uModelMatrix;
	uniform mat3 uNormalMatrix;
	attribute vec3 aVertexPosition;
	varying vec3 vPosition;

	// Camera
	uniform vec3 uCameraPosition;

	#ifdef vertexColors
	attribute vec3 aVertexColor;
	#endif

	// Color
	uniform vec3 uDiffuse;
	varying vec3 vDiffuse;

	// Normal
	#ifdef normals
	attribute vec3 aVertexNormal;
	varying vec3 vNormal;
	#endif

	// Uv
	#ifdef uv
	attribute vec2 aUv;
	varying vec2 vUv;
	#endif

	// Lighting
	#ifdef pointLights
	${pointLights}
	#endif

	#HOOK_VERTEX_PRE

	void main(void){

		vDiffuse = uDiffuse;

		#ifdef vertexColors
		vDiffuse = aVertexColor;
		#endif

		#ifdef uv
		vUv = aUv;
		#endif

		#HOOK_VERTEX_MAIN

		#ifdef normals
		vNormal = uNormalMatrix * aVertexNormal;
		#endif

		#ifdef pointLights
		for (int i = 0; i < #HOOK_POINT_LIGHTS; i++) {
			// Calculate word position of vertex
			vec3 surfaceWorldPosition = (uModelMatrix * vec4(aVertexPosition, 1.0)).xyz;
			// Calculate directional vector of surface to the light
			vPointLightSurfaceToLightDirection[i] = uPointLights[i].position - surfaceWorldPosition;
			// Calculate directional vector of camera to the surface
			vPointLightSurfaceToCameraDirection[i] = uCameraPosition - surfaceWorldPosition;
		}
		#endif

		vPosition = aVertexPosition;
		gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);

		#HOOK_VERTEX_END
	}
`;
