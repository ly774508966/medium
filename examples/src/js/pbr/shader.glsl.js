import { ShaderChunks } from 'index';

export const hookFragmentPre = `
	in vec3 vReflect;
	in vec4 vWorldPosition;
	uniform float uGamma;
	uniform float uExposure;
	uniform float uMetalness;
	uniform float uRoughness;
	uniform sampler2D uAlbedioMap;
	uniform sampler2D uNormalMap;
	uniform sampler2D uAoMap;
	uniform vec2 uNormalScale;
	uniform sampler2D uMetalnessMap;
	uniform samplerCube uEnvironment;

	${ShaderChunks.EnvMapCube}
	${ShaderChunks.Tonemap.tonemapReinhard}
	${ShaderChunks.Gamma}

	// Per-Pixel Tangent Space Normal Mapping
	// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {

		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );

		vec3 S = normalize( q0 * st1.t - q1 * st0.t );
		vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
		vec3 N = normalize( surf_norm );

		vec3 mapN = texture( uNormalMap, vUv ).xyz * 2.0 - 1.0;
		mapN.xy = uNormalScale * mapN.xy;
		mat3 tsn = mat3( S, T, N );
		return normalize( tsn * mapN );
	}
`;

export const hookFragmentMain = `

	// In no way is this physically correct...
	// With the right creative approach you probably don't need all that complex math (:

	// Albedo
	color = texture(uAlbedioMap, vUv).rgb;

	// Get normal
	normal = perturbNormal2Arb(-vWorldPosition.xyz, vNormal);

	// Env map
	vec3 texelEnvMap = mix(vec3(0.0), texture(uEnvironment, envMapCube(vReflect)).rgb, uMetalness);

	// Metalness
	vec3 texelMetalnessMap = texture(uMetalnessMap, vUv).rgb;

	texelEnvMap *= texelMetalnessMap;

	color *= mix(color, texelEnvMap, (color.r + color.g + color.b) / 3.0);

	// Exposure
	color *= uExposure;

	// white balance
	color	= tonemapReinhard(color);

	// gamma correction
	color	= toGamma(color);
`;
