attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec4 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec4 vColor;

varying vec2 vTextureCoord;

void main(void){
	vColor = aVertexColor;
	vTextureCoord = aTextureCoord;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
