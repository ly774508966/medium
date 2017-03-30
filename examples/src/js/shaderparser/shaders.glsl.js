export const fragment = `#version 300 es
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
	struct DirectionalLight {
		vec4 position;
		vec4 color;
		vec4 intensity;
	};
	uniform DirectionalLights {
		DirectionalLight uDirectionalLights[#HOOK_DIRECTIONAL_LIGHTS];
	};
	#endif

	// Lighting
	#ifdef pointLights
	struct PointLight {
		vec4 position;
		vec4 color;
		vec4 specularColor;
		vec4 shininess;
		vec4 intensity;
	};
	uniform PointLights {
		PointLight uPointLights[#HOOK_POINT_LIGHTS];
	};
	in vec3 vPointLightSurfaceToLightDirection[#HOOK_POINT_LIGHTS];
	in vec3 vPointLightSurfaceToCameraDirection[#HOOK_POINT_LIGHTS];
	#endif

	out vec4 outgoingColor;

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

		outgoingColor = vec4(color.rgb, 1.0);

		#HOOK_FRAGMENT_END
	}
`;
