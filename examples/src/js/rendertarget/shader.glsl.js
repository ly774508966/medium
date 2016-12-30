export const fragmentShader = `
	#HOOK_PRECISION
	varying vec2 vUv;
	uniform sampler2D texture0;

	void main(void) {
		gl_FragColor = texture2D(texture0, vUv);
	}
`;
