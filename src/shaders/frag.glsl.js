module.exports =
`
precision mediump float;
uniform vec3 uAmbientColor;
uniform vec3 uDirectionalColor;
uniform vec3 uLightDirection;
varying vec4 vColor;
varying vec3 vNormal;

void main(void){

	float light = max(dot(vNormal, uLightDirection), 0.0);

	vec3 color = vColor.rgb * (uAmbientColor + uDirectionalColor * vec3(light));

	gl_FragColor = vec4(color.rgb, vColor.a);
	// gl_FragColor = vec4(vec3(1.0), vColor.a);
}
`
