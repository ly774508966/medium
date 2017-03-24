import * as GL from '../core/GL';

const WORD_REGX = (word) => {
	return new RegExp(`\\b${word}\\b`, 'gi');
};

const LINE_REGX = (word) => {
	return new RegExp(`${word}`, 'gi');
};

const VERTEX = [
	{
		match: WORD_REGX('in'),
		replace: 'attribute',
	},
	{
		match: WORD_REGX('out'),
		replace: 'varying',
	},
];
const FRAGMENT = [
	{
		match: WORD_REGX('in'),
		replace: 'varying',
	}, {
		match: LINE_REGX('out vec4 outgoingColor;'),
		replace: '',
	}, {
		match: WORD_REGX('outgoingColor'),
		replace: 'gl_FragColor',
	}, {
		match: WORD_REGX('texture'),
		replace: function(shader) {

			console.log('shader', shader);

			// Find all texture defintions
			const textureGlobalRegx = new RegExp('\\btexture\\b', 'gi');

			// Find single texture definition
			const textureSingleRegx = new RegExp('\\btexture\\b', 'i');

			// Gets the texture call signature e.g texture(uTexture1, vUv);
			const textureUniformNameRegx = new RegExp(/texture\(([^)]+)\)/, 'i');

			// Get all matching occurances
			const matches = shader.match(textureGlobalRegx);
			let replacement = '';

			// If nothing matches return
			if (matches === null) return shader;

			// Replace each occurance by it's uniform type
			for (let i = 0; i < matches.length; i++) {
				let match = shader.match(textureUniformNameRegx)[0];
				if (match) {
					// Extract the uniform name
					const uniformName = match.replace('texture(', '').split(',')[0];
					// Find the uniform definition
					let uniformType = shader.match(`(.*?) ${uniformName}`, 'i')[1];
					uniformType = uniformType.split(' ')[1];
					switch (uniformType) {
						case 'sampler2D': {
							replacement = 'texture2D';
							break;
						}
						case 'samplerCube': {
							replacement = 'textureCube';
							break;
						}
						default:
					}
				}
				shader = shader.replace(textureSingleRegx, replacement);
			}
			return shader;
		},
	},
];
const GENERIC = [];

const VERTEX_RULES = [
	...GENERIC,
	...VERTEX,
];

const FRAGMENT_RULES = [
	...GENERIC,
	...FRAGMENT,
];

/**
 * Replaces es300 syntax to es100
 */
export default function parse(shader: string, shaderType: string) {
	if (GL.webgl2) {
		return shader;
	}

	const rules = shaderType === 'vertex'
		? VERTEX_RULES
		: FRAGMENT_RULES;

	rules.forEach(rule => {
		console.log(rule);
		switch (typeof rule.with) {
			case 'function': {
				shader = rule.replace(shader);
				break;
			}
			default: {
				shader = shader.replace(rule.match, rule.replace);
			}
		}
	});

	// if (shaderType === 'vertex') {
	// 	console.log(shader);
	// }

	// if (shaderType === 'fragment') {
	// 	console.log(shader);
	// }

	return shader;
}
