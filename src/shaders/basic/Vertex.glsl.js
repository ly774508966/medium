import EsVersion from 'shaders/chunks/EsVersion.glsl';
import { pointLightsOutEs300, pointLightsEs100 } from 'shaders/chunks/PointLights.glsl';
import { definePI, definePITwo } from 'shaders/chunks/Math.glsl';
import ProjectionView from 'shaders/chunks/ProjectionView.glsl';

const vertexShaderEs300 = `${EsVersion}
	${definePI}
	${definePITwo}
	#HOOK_DEFINES

	layout(std140) uniform;

	${ProjectionView}

	uniform mat4 uProjectionMatrix;
	uniform mat4 uViewMatrix;
	uniform mat4 uModelMatrix;
	uniform mat4 uModelMatrixInverse;
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
	${pointLightsOutEs300}
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

		// Calculate world position of vertex with transformed
		vec3 vPosition = (uModelMatrix * vec4(aVertexPosition + transformed, 1.0)).xyz;

		#ifdef pointLights
		for (int i = 0; i < #HOOK_POINT_LIGHTS; i++) {
			// Calculate directional vector of surface to the light
			vPointLightSurfaceToLightDirection[i] = uPointLights[i].position.xyz - vPosition;
			// Calculate directional vector of camera to the surface
			vPointLightSurfaceToCameraDirection[i] = uCameraPosition - vPosition;
		}
		#endif

		gl_Position = uProjectionView.projectionMatrix * uProjectionView.viewMatrix * uModelMatrix * vec4(vPosition, 1.0);

		#HOOK_VERTEX_END
	}
`;

const vertexShaderEs100 = `

	${definePI}
	${definePITwo}
	#HOOK_DEFINES

	// Position
	uniform mat4 uProjectionMatrix;
	uniform mat4 uViewMatrix;
	uniform mat4 uModelMatrix;
	uniform mat4 uModelMatrixInverse;
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
	${pointLightsEs100}
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

		// Calculate world position of vertex with transformed
		vec3 vPosition = (uModelMatrix * vec4(aVertexPosition + transformed, 1.0)).xyz;

		#ifdef pointLights
		for (int i = 0; i < #HOOK_POINT_LIGHTS; i++) {
			// Calculate word position of vertex
			vec3 surfaceWorldPosition = (uModelMatrix * vec4(aVertexPosition, 1.0)).xyz;
			// Calculate directional vector of surface to the light
			vPointLightSurfaceToLightDirection[i] = uPointLights[i].position - vPosition;
			// Calculate directional vector of camera to the surface
			vPointLightSurfaceToCameraDirection[i] = uCameraPosition - vPosition;
		}
		#endif

		gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(vPosition, 1.0);

		#HOOK_VERTEX_END
	}
`;

export {
	vertexShaderEs300,
	vertexShaderEs100,
}
