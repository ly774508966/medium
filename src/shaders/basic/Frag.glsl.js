import EsVersion from 'shaders/chunks/EsVersion.glsl';
import { pointLightsIn as pointLights } from 'shaders/chunks/PointLights.glsl';
import directionalLights from 'shaders/chunks/DirectionalLights.glsl';

export default `${EsVersion}
	#HOOK_PRECISION
	#HOOK_DEFINES

	layout(std140) uniform;

	in vec3 vDiffuse;
	in vec3 vPosition;

	#ifdef normals
	in vec3 vNormal;
	#endif

	#ifdef uv
	in vec2 vUv;
	#endif

	#ifdef directionalLights
	${directionalLights}
	#endif

	// Lighting
	#ifdef pointLights
	${pointLights}
	#endif

	out vec4 outputColor;

	#HOOK_FRAGMENT_PRE

	void main(void){

		vec3 color = vDiffuse;

		#ifdef normals
		vec3 normal = normalize(vNormal);
		#endif

		#HOOK_FRAGMENT_MAIN

		#ifdef directionalLights
		for (int i = 0; i < #HOOK_DIRECTIONAL_LIGHTS; i++) {
			float directionalLight = dot(normal, normalize(uDirectionalLights[i].position.xyz));
			vec3 directionalColor = uDirectionalLights[i].color.rgb * directionalLight;
			color += directionalColor * uDirectionalLights[i].intensity.x;
		}
		#endif

		#ifdef pointLights
		for (int i = 0; i < #HOOK_POINT_LIGHTS; i++) {
			vec3 pointLightSurfaceToLightDirection = normalize(vPointLightSurfaceToLightDirection[i]);
			vec3 pointLightSurfaceToCameraDirection = normalize(vPointLightSurfaceToCameraDirection[i]);
			vec3 halfVector = normalize(pointLightSurfaceToLightDirection + pointLightSurfaceToCameraDirection);

			float pointLight = max(dot(normal, pointLightSurfaceToLightDirection), 0.0);
			vec3 pointLightColor = uPointLights[i].color * pointLight;
			color += pointLight * pointLightColor;
			float specular = pow(dot(normal, halfVector), uPointLights[i].shininess);
			color += specular * uPointLights[i].specularColor;
		}
		#endif

		outputColor = vec4(color.rgb, 1.0);

		#HOOK_FRAGMENT_END
	}
`;


// #ifdef directionalLights
//
// #endif
