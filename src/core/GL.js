let gl = undefined

/*
	Set the gl instance
	This is set from the renderer
*/
export function set(_gl) {
	gl = _gl
}

/*
	Get the gl instance
*/
export function get() {
	return gl
}
