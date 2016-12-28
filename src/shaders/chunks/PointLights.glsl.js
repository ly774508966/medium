export default `
	struct PointLight {
		vec3 position;
		vec3 color;
		vec3 specularColor;
		float shininess;
		float intensity;
	};

	uniform PointLight uPointLights[#HOOK_POINT_LIGHTS];
	varying vec3 vPointLightSurfaceToLightDirection[#HOOK_POINT_LIGHTS];
	varying vec3 vPointLightSurfaceToCameraDirection[#HOOK_POINT_LIGHTS];
`
