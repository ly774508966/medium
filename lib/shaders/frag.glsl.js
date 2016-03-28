"use strict";

module.exports = "\nprecision mediump float;\nvarying vec4 vColor;\nvoid main(void){\n\t// gl_FragColor = vec4(vec3(1.0), 1.0);\n\tgl_FragColor = vColor;\n}\n";