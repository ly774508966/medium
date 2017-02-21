import { ShaderChunks } from 'index';

// ${ShaderChunks.Transpose}

export default `${ShaderChunks.EsVersion}
	#HOOK_PRECISION
	#HOOK_DEFINES

	#define USE_NORMAL_MAP
	#define PHONG
	#define COOK_BLINN
	// #define USE_ALBEDO_MAP
	#define USE_ROUGHNESS_MAP

	in mat4 vWorldPosition;  // object's world position
 in vec3 vCameraPosition;   // view (camera) transform
 in mat3 vNormalMatrix; // normal transformation matrix ( transpose(inverse(W * V)) )

	in vec3 vNormal;
	in vec3 vPosition;
	in vec2 vUv;

	uniform vec4 albedo;   // constant albedo color, used when textures are off

	out vec4 outputColor;

	void main() {

		vec3 result = vec3(1.0);

		outputColor = vec4(result, 1);
	}
`;
