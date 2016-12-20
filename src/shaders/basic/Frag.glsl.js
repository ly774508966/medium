export default `
	#HOOK_DEFINES

	precision mediump float;

	varying vec4 vColor;
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

	#ifdef pointLights
	uniform vec3 uPointLightColor;
	varying vec3 vPointLightSurfaceToLightDirection;
	varying vec3 vPointLightSurfaceToCameraDirection;
	#endif

	#HOOK_FRAGMENT_PRE

	void main(void){

		vec3 color = vColor.rgb;

		#ifdef normals
		vec3 normal = normalize(vNormal);
		#endif

		#ifdef directionalLights
		float directionalLight = dot(normal, normalize(uDirectionalLightPosition));
		vec3 directionalColor = uDirectionalLightColor * directionalLight;
		color *= directionalColor;
		#endif

		#ifdef pointLights
		vec3 pointLightSurfaceToLightDirection = normalize(vPointLightSurfaceToLightDirection);
		vec3 pointLightSurfaceToCameraDirection = normalize(vPointLightSurfaceToCameraDirection);
		vec3 halfVector = normalize(pointLightSurfaceToLightDirection + pointLightSurfaceToCameraDirection);

		float pointLight = dot(normal, pointLightSurfaceToLightDirection);
		vec3 pointLightColor = uPointLightColor * pointLight;
		color *= pointLightColor;

		float specular = pow(dot(normal, halfVector), 50.0);

		color += specular;
		#endif

		#HOOK_VERTEX_MAIN

		gl_FragColor = vec4(color.rgb, 1.0);

		#HOOK_VERTEX_END
	}
`;
