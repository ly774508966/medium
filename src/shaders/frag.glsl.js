export default `
	#HOOK_DEFINES

	precision mediump float;

	varying vec4 vColor;

	#ifdef normal
	varying vec3 vNormal;
	#endif

	#ifdef uv
	varying vec2 vUv;
	#endif

	#HOOK_FRAGMENT_PRE

	void main(void){

		vec3 color = vColor.rgb;

		#HOOK_VERTEX_MAIN

		gl_FragColor = vec4(color.rgb, 1.0);

		#HOOK_VERTEX_END
	}
`;
