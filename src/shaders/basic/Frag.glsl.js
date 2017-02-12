import EsVersion from 'shaders/chunks/EsVersion.glsl';
import { pointLightsInEs300, pointLightsEs100 } from 'shaders/chunks/PointLights.glsl';
import { directionalLightsEs300, directionalLightsEs100 } from 'shaders/chunks/DirectionalLights.glsl';
import { whenGreaterThan } from 'shaders/chunks/Conditionals.glsl';

const fragmentShaderEs300 = `${EsVersion}
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
	${directionalLightsEs300}
	#endif

	// Lighting
	#ifdef pointLights
	${pointLightsInEs300}
	#endif

	out vec4 outputColor;

	${whenGreaterThan}

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
			color += whenGreaterThan(directionalLight, 0.0) * (directionalColor * uDirectionalLights[i].intensity.x);
		}
		#endif

		#ifdef pointLights
		for (int i = 0; i < #HOOK_POINT_LIGHTS; i++) {
			vec3 pointLightSurfaceToLightDirection = normalize(vPointLightSurfaceToLightDirection[i]);
			vec3 pointLightSurfaceToCameraDirection = normalize(vPointLightSurfaceToCameraDirection[i]);
			vec3 halfVector = normalize(pointLightSurfaceToLightDirection + pointLightSurfaceToCameraDirection);

			float pointLight = max(dot(normal, pointLightSurfaceToLightDirection), 0.0);
			vec3 pointLightColor = uPointLights[i].color.rgb * pointLight;
			color += pointLight * pointLightColor;
			float specular = max(pow(dot(normal, halfVector), uPointLights[i].shininess.x), 0.0);
			color += specular * uPointLights[i].specularColor.rgb;
		}
		#endif

		outputColor = vec4(color.rgb, 1.0);

		#HOOK_FRAGMENT_END
	}
`;

const fragmentShaderEs100 = `
	#HOOK_PRECISION
	#HOOK_DEFINES

	varying vec3 vDiffuse;
	varying vec3 vPosition;

	#ifdef normals
	varying vec3 vNormal;
	#endif

	#ifdef uv
	varying vec2 vUv;
	#endif

	#ifdef directionalLights
	${directionalLightsEs100}
	#endif

	// Lighting
	#ifdef pointLights
	${pointLightsEs100}
	#endif

	${whenGreaterThan}

	#HOOK_FRAGMENT_PRE

	void main(void){

		vec3 color = vDiffuse;

		#ifdef normals
		vec3 normal = normalize(vNormal);
		#endif

		#HOOK_FRAGMENT_MAIN

		#ifdef directionalLights
		for (int i = 0; i < #HOOK_DIRECTIONAL_LIGHTS; i++) {
			float directionalLight = dot(normal, normalize(uDirectionalLights[i].position));
			vec3 directionalColor = uDirectionalLights[i].color * directionalLight;
			color += whenGreaterThan(directionalLight, 0.0) * (directionalColor * uDirectionalLights[i].intensity);
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
			float specular = max(pow(dot(normal, halfVector), uPointLights[i].shininess), 0.0);
			color += specular * uPointLights[i].specularColor;
		}
		#endif

		gl_FragColor = vec4(color.rgb, 1.0);

		#HOOK_FRAGMENT_END
	}
`;

export {
	fragmentShaderEs300,
	fragmentShaderEs100,
}
