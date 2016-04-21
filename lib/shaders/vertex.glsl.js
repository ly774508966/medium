'use strict';

module.exports = function (_flags) {

	var defaults = {
		vertexColors: false,
		lights: false,
		texture: false
	};

	var flags = Object.assign(defaults, _flags);

	var defines = '';
	for (var key in flags) {
		if (flags[key]) defines += '#define ' + key + ' \n';
	}

	return '\n\n\t' + defines + '\n\n\tattribute vec3 aVertexPosition;\n\tattribute vec3 aVertexNormal;\n\n\t#ifdef vertexColors\n\tattribute vec4 aVertexColor;\n\t#endif\n\n\t#ifdef texture\n\tattribute vec2 aTextureCoord;\n\tvarying vec2 vTextureCoord;\n\t#endif\n\n\tuniform mat4 uMVMatrix;\n\tuniform mat4 uPMatrix;\n\tuniform mat4 uModelMatrix;\n\tuniform mat3 uNormalMatrix;\n\n\tvarying vec4 vColor;\n\tvarying vec3 vNormal;\n\tvarying vec3 uUv;\n\n\tvoid main(void){\n\n\t\tvColor = vec4(1.0);\n\n\t\t#ifdef vertexColors\n\t\tvColor = aVertexColor;\n\t\t#endif\n\n\t\t#ifdef texture\n\t\tvTextureCoord = aTextureCoord;\n\t\t#endif\n\n\t\tvNormal = uNormalMatrix * aVertexNormal;\n\t\tuUv = aVertexPosition;\n\t\tgl_Position = uPMatrix * uMVMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n\t}\n\t';
};