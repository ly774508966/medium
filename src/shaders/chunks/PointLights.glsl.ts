const structEs300 = `
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

const pointLightsOutEs300 = `
	${structEs300}
	out vec3 vPointLightSurfaceToLightDirection[#HOOK_POINT_LIGHTS];
	out vec3 vPointLightSurfaceToCameraDirection[#HOOK_POINT_LIGHTS];
`;

const pointLightsInEs300 = `
	${structEs300}
	in vec3 vPointLightSurfaceToLightDirection[#HOOK_POINT_LIGHTS];
	in vec3 vPointLightSurfaceToCameraDirection[#HOOK_POINT_LIGHTS];
`;

const pointLightsEs100 = `
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
`;

export {
	pointLightsOutEs300,
	pointLightsInEs300,
	pointLightsEs100,
};
