"use strict";

module.exports = "\nattribute vec3 aVertexPosition;\nattribute vec4 aVertexColor;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvarying vec4 vColor;\n\nvoid main(void){\n\tvColor = aVertexColor;\n\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}\n";