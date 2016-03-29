module.exports =
`
attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uModelMatrix;

varying vec4 vColor;

void main(void){
	vColor = aVertexColor;
	gl_Position = uPMatrix * uMVMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
}
`
