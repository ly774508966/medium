import shaderVersion from 'shaders/chunks/Version.glsl';
import { pointLightsOut as pointLights } from 'shaders/chunks/PointLights.glsl';
import { definePI, definePITwo } from 'shaders/chunks/Math.glsl';

export default `${shaderVersion}
	${definePI}
	${definePITwo}
	#HOOK_DEFINES

	layout(std140) uniform;

	// Position
	uniform mat4 uProjectionMatrix;
	uniform mat4 uViewMatrix;
	uniform mat4 uModelMatrix;
	uniform mat3 uNormalMatrix;
	in vec3 aVertexPosition;
	out vec3 vPosition;

	// Camera
	uniform vec3 uCameraPosition;

	#ifdef vertexColors
	in vec3 aVertexColor;
	#endif

	// Color
	uniform vec3 uDiffuse;
	out vec3 vDiffuse;

	// Normal
	#ifdef normals
	in vec3 aVertexNormal;
	out vec3 vNormal;
	#endif

	// Uv
	#ifdef uv
	in vec2 aUv;
	out vec2 vUv;
	#endif

	// Lighting
	#ifdef pointLights
	${pointLights}
	#endif

	#HOOK_VERTEX_PRE

	void main(void){

		vDiffuse = uDiffuse;

		// Override for custom positioning
		vec3 transformed = vec3(0.0);

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
		gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition + transformed, 1.0);

		#HOOK_VERTEX_END
	}
`;
