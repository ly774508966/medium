const struct = `
	struct PointLight {
		vec3 position;
		vec3 color;
		vec3 specularColor;
		float shininess;
		float intensity;
	};
`;

const pointLightsOut = `
	${struct}
	uniform PointLight uPointLights[#HOOK_POINT_LIGHTS];
	out vec3 vPointLightSurfaceToLightDirection[#HOOK_POINT_LIGHTS];
	out vec3 vPointLightSurfaceToCameraDirection[#HOOK_POINT_LIGHTS];
`;

const pointLightsIn = `
	${struct}
	uniform PointLight uPointLights[#HOOK_POINT_LIGHTS];
	in vec3 vPointLightSurfaceToLightDirection[#HOOK_POINT_LIGHTS];
	in vec3 vPointLightSurfaceToCameraDirection[#HOOK_POINT_LIGHTS];
`;

export {
	pointLightsOut,
	pointLightsIn,
};
