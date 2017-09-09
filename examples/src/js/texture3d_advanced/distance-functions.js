import { vec2, vec3 } from 'gl-matrix';
// http://iquilezles.org/www/articles/distfunctions/distfunctions.htm

// Utils
function abs(v) {
  return [Math.abs(v[0]), Math.abs(v[1]), Math.abs(v[2])];
}

/**
	float sdSphere( vec3 p, float s )
	{
	  return length(p)-s;
	}
*/
export function sphere(p, s) {
  return vec3.length(p) - s;
}

/**
	float sdTorus( vec3 p, vec2 t )
	{
	  vec2 q = vec2(length(p.xz)-t.x,p.y);
	  return length(q)-t.y;
	}
*/

export function torus(p, t) {
  let lengthPxz;
  const q = vec2.create();
  return ((p, t) => {
    lengthPxz = vec2.length([p[0], p[2]]);
    vec2.set(q, lengthPxz - t[0], p[1]);
    return vec2.length(q) - t[1];
  })(p, t);
}
