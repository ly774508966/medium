const struct = `
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
`;

const pointLightsOut = `
	${struct}
	out vec3 vPointLightSurfaceToLightDirection[#HOOK_POINT_LIGHTS];
	out vec3 vPointLightSurfaceToCameraDirection[#HOOK_POINT_LIGHTS];
`;

const pointLightsIn = `
	${struct}
	in vec3 vPointLightSurfaceToLightDirection[#HOOK_POINT_LIGHTS];
	in vec3 vPointLightSurfaceToCameraDirection[#HOOK_POINT_LIGHTS];
`;

export {
	pointLightsOut,
	pointLightsIn,
};
