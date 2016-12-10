'use strict';

module.exports = function (_flags) {

	var defaults = {
		vertexColors: false,
		texture: false,
		lights: false
	};

	var flags = Object.assign(defaults, _flags);

	var defines = '';
	for (var key in flags) {
		if (flags[key]) defines += '#define ' + key + ' \n';
	}

	return '\n\n\t' + defines + '\n\n\tprecision mediump float;\n\tuniform vec3 uAmbientColor;\n\tuniform vec3 uDirectionalColor;\n\tuniform vec3 uLightDirection;\n\tuniform float uAlpha;\n\tvarying vec4 vColor;\n\tvarying vec3 vNormal;\n\n\t#ifdef uv\n\tvarying vec2 vUv;\n\t#endif\n\n\t#ifdef texture\n\tvarying vec2 vTextureCoord;\n\tuniform sampler2D uSampler;\n\t#endif\n\n\tvoid main(void){\n\n\t\tvec3 color = vColor.rgb;\n\n\t\t#ifdef lights\n\t\tfloat light = max(dot(vNormal, uLightDirection), 0.0);\n\t\tcolor = vColor.rgb * (uAmbientColor + uDirectionalColor * vec3(light));\n\t\t#endif\n\n\t\tgl_FragColor = vec4(color.rgb, uAlpha);\n\n\t\t#ifdef texture\n\t\tgl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n\t\t#endif\n\n\t\t// gl_FragColor = vec4(vec3(1.0), vColor.a);\n\t}\n\t';
};
