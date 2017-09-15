import { vec2, vec3 } from 'gl-matrix';
// http://iquilezles.org/www/articles/distfunctions/distfunctions.htm

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
  return ((p_, t_) => {
    lengthPxz = vec2.length([p_[0], p_[2]]);
    vec2.set(q, lengthPxz - t_[0], p_[1]);
    return vec2.length(q) - t_[1];
  })(p, t);
}
