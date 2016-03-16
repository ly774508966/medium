precision mediump float;
varying vec4 vColor;
varying vec2 vTextureCoord;

uniform sampler2D uTexture;

void main(void){
	gl_FragColor = texture2d(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));
}
