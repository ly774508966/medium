import { ShaderChunks } from '../../../../src/index';

export default {
	emit: {
		vertexShader: `${ShaderChunks.EsVersion}
			#HOOK_DEFINES

			${ShaderChunks.ProjectionView}
			uniform float uTime;
			in vec3 aPosition;
			out vec3 vPosition;

			void main() {
				vPosition += aPosition + vec3(0.0, 0.025, 0.0);
			}
		`,
		fragmentShader: `${ShaderChunks.EsVersion}
			#HOOK_PRECISION
			#HOOK_DEFINES

			out vec4 outputColor;

			void main() {
				outputColor = vec4(1.0);
			}
		`,
	},
	draw: {
		hookVertexPre: `
			in vec3 aPosition;
			uniform float uSize;
			out vec3 vColor;
		`,
		hookVertexEnd: `
			vec3 scaledVertex = aVertexPosition + normalize(aVertexPosition) * vec3(2.0);
			vec3 normalLerp = mix(aVertexPosition, scaledVertex, sin(aPosition.y));
			vColor = normalize(normalLerp) * 0.5 + 0.5;
			vec4 mvPosition = uProjectionView.viewMatrix * uModelMatrix * vec4(normalLerp, 1.0);
			gl_PointSize = uSize * (100.0 / length(mvPosition.xyz));
			gl_Position = uProjectionView.projectionMatrix * uProjectionView.viewMatrix * uModelMatrix * vec4(normalLerp, 1.0);
		`,
		hookFragmentPre: `
			uniform float uTime;
			in vec3 vColor;
		`,
		hookFragmentEnd: `
			if(length(gl_PointCoord - 0.5) > 0.5) {
				discard;
			}
			outputColor = vec4(vColor, 1);
		`,
	}
}
