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
	uniform vec3 uDirectionalLightPosition;
	uniform vec3 uDirectionalLightColor;
	#endif

	// Lighting
	#ifdef pointLights
	struct PointLight {
		vec3 position;
		vec3 color;
		vec3 specularColor;
		float shininess;
	};

	uniform PointLight uPointLights[#HOOK_POINT_LIGHTS];
	varying vec3 vPointLightSurfaceToLightDirection[#HOOK_POINT_LIGHTS];
	varying vec3 vPointLightSurfaceToCameraDirection[#HOOK_POINT_LIGHTS];
	#endif

	#HOOK_FRAGMENT_PRE

	void main(void){

		vec3 color = vDiffuse;

		#ifdef normals
		vec3 normal = normalize(vNormal);
		#endif

		#ifdef directionalLights
		float directionalLight = dot(normal, normalize(uDirectionalLightPosition));
		vec3 directionalColor = uDirectionalLightColor * directionalLight;
		color *= directionalColor;
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

		#HOOK_VERTEX_MAIN

		gl_FragColor = vec4(color.rgb, 1.0);

		#HOOK_VERTEX_END
	}
`;
