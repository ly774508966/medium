export default `
	struct DirectionalLight {
		vec3 position;
		vec3 color;
		float intensity;
	};

	uniform DirectionalLight uDirectionalLights[#HOOK_DIRECTIONAL_LIGHTS];
`
