export default function (_flags) {
	const defaults = {
		vertexColors: false,
		texture: false,
	};

	const flags = Object.assign(defaults, _flags);

	let defines = '';
	for (let key in flags) {
		if (flags[key])
			defines += `#define ${key} \n`;
	}

	return `

	${defines}

	precision mediump float;
	uniform vec3 uAmbientColor;
	uniform vec3 uDirectionalColor;
	uniform vec3 uLightDirection;
	uniform float uAlpha;
	varying vec4 vColor;
	varying vec3 vNormal;

	#ifdef uv
	varying vec2 vUv;
	#endif

	#ifdef texture
	varying vec2 vTextureCoord;
	uniform sampler2D uSampler;
	#endif

	void main(void){

		vec3 color = vColor.rgb;

		gl_FragColor = vec4(color.rgb, uAlpha);

		#ifdef texture
		gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
		#endif

		// gl_FragColor = vec4(vec3(1.0), vColor.a);
	}
	`;
}
