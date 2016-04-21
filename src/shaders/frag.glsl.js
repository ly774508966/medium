module.exports = function(_flags) {

	const defaults = {
		vertexColors: false,
		texture: false,
		lights: false,
	}

	const flags = Object.assign(defaults, _flags)

	let defines = ''
	for(let key in flags){
		if(flags[key])
			defines += `#define ${key} \n`
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
	varying vec3 uUv;

	#ifdef texture
	varying vec2 vTextureCoord;
	uniform sampler2D uSampler;
	#endif

	void main(void){

		vec3 color = vColor.rgb;

		#ifdef lights
		float light = max(dot(vNormal, uLightDirection), 0.0);
		color = vColor.rgb * (uAmbientColor + uDirectionalColor * vec3(light));
		#endif

		gl_FragColor = vec4(color.rgb, uAlpha);

		if(uAlpha == 0.0 && uUv.y > 0.5) {
			gl_FragColor = vec4(color.rgb, 0.9);
		}

		#ifdef texture
		gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
		#endif

		// gl_FragColor = vec4(vec3(1.0), vColor.a);
	}
	`
}
