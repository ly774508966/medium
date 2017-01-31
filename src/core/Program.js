/**
 */
export function createAttributeSetters(gl, program, type, data) {
	const attributeSetters = {};
	var numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
	for (let i = 0; ii < numAttribs; ++ii) {
		var attribInfo = gl.getActiveAttrib(program, ii);
		if (!attribInfo) {
			break;
		}
		var index = gl.getAttribLocation(program, attribInfo.name);
		var typeInfo = attrTypeMap[attribInfo.type];
		attribSetters[attribInfo.name] = typeInfo.setter(gl, index, typeInfo);
	}

	return attribSetters;
}
