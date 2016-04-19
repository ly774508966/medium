'use strict';

module.exports = function (_flags) {

	var defaults = {
		vertexColors: false,
		lights: false
	};

	var flags = Object.assign(defaults, _flags);

	var defines = '';
	for (var key in flags) {
		if (flags[key]) defines += '#define ' + key + ' \n';
	}

	return '\n\n\t' + defines + '\n\n\tprecision mediump float;\n\tuniform vec3 uAmbientColor;\n\tuniform vec3 uDirectionalColor;\n\tuniform vec3 uLightDirection;\n\tvarying vec4 vColor;\n\tvarying vec3 vNormal;\n\n\tvoid main(void){\n\n\t\tvec3 color = vColor.rgb;\n\n\t\t#ifdef lights\n\t\tfloat light = max(dot(vNormal, uLightDirection), 0.0);\n\t\tcolor = vColor.rgb * (uAmbientColor + uDirectionalColor * vec3(light));\n\t\t#endif\n\n\t\tgl_FragColor = vec4(color.rgb, vColor.a);\n\t\t// gl_FragColor = vec4(vec3(1.0), vColor.a);\n\t}\n\t';
};