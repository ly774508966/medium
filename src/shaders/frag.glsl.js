module.exports =
`
precision mediump float;
varying vec4 vColor;
void main(void){
	// gl_FragColor = vec4(vec3(1.0), 1.0);
	gl_FragColor = vColor;
}
`
