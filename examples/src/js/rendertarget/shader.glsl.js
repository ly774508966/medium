export const fragmentShader = `
	#HOOK_PRECISION
	varying vec2 vUv;
	uniform sampler2D uTexture0;
	uniform float uTime;

	void main(void) {
		vec3 color = texture2D(uTexture0, vUv).rgb;
		float r = sin(color.r + uTime) * 0.5 + 0.5;
		float g = cos(color.g + uTime) * 0.5 + 0.5;
		float b = sin(color.b + uTime) * 0.5 + 0.5;
		gl_FragColor = vec4(r, g, b, 1.0);
	}
`;
