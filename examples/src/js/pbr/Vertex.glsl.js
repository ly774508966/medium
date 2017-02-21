export const hookVertexPre = `
	// out mat4 vWorldPosition;
	out mat3 vNormalMatrix;
	out vec3 vCameraPosition;
	out vec3 vBinormal;
`;

export const hookVertexEnd = `
	// vWorldPosition = (uViewMatrix * uModelMatrix * vec4(vPosition, 1.0)).xyz;
	vNormalMatrix = uNormalMatrix;
	vCameraPosition = uCameraPosition;

	vec3 tangent;

	vec3 c1 = cross(vNormal, vec3(0.0, 0.0, 1.0));
	vec3 c2 = cross(vNormal, vec3(0.0, 1.0, 0.0));

	if( length(c1)>length(c2) )
	{
	tangent = c1;
	}
	else
	{
	tangent = c2;
	}

	tangent = normalize(tangent);

	vBinormal = cross(vNormal, tangent);
	vBinormal = normalize(vBinormal);
`;
