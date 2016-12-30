import pointLights from 'shaders/chunks/PointLights.glsl';
import directionalLights from 'shaders/chunks/DirectionalLights.glsl';

export default `
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
	${directionalLights}
	#endif

	// Lighting
	#ifdef pointLights
	${pointLights}
	#endif

	#HOOK_FRAGMENT_PRE

	void main(void){

		vec3 color = vDiffuse;

		#ifdef normals
		vec3 normal = normalize(vNormal);
		#endif

		#ifdef directionalLights
		for (int i = 0; i < #HOOK_DIRECTIONAL_LIGHTS; i++) {
			float directionalLight = dot(normal, normalize(uDirectionalLights[i].position));
			vec3 directionalColor = uDirectionalLights[i].color * directionalLight;
			color += directionalColor * uDirectionalLights[i].intensity;
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

		#HOOK_FRAGMENT_MAIN

		gl_FragColor = vec4(color.rgb, 1.0);

		#HOOK_FRAGMENT_END
	}
`;
