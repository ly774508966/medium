// Contexts
export const WEBGL_CONTEXT = 'webgl';
export const WEBGL2_CONTEXT = 'webgl2';

// Default ratio
export const RENDERER_DEFAULT_CONTEXT = WEBGL2_CONTEXT;
export const RENDERER_DEFAULT_WIDTH = 1280;
export const RENDERER_DEFAULT_HEIGHT = 720;
export const RENDERER_DEFAULT_RATIO = RENDERER_DEFAULT_WIDTH / RENDERER_DEFAULT_HEIGHT;

// Precision
export const PRECISION = 'highp';

// Culling
export const CULL_NONE = false;
export const CULL_BACK = 1029;
export const CULL_FRONT = 1028;
export const CULL_FRONT_AND_BACK = 1032;

// Line
export const LINE_DEFAULT_WIDTH = 1;

// Draw style
export const DRAW_POINTS = 0;
export const DRAW_LINES = 2;
export const DRAW_TRIANGLES = 4;

// Object types
export const OBJECT_TYPE_MESH = 'OBJECT_TYPE_MESH';
export const OBJECT_TYPE_LIGHT = 'OBJECT_TYPE_LIGHT';

// Uniform location indices
export const UNIFORM_PROJECTION_VIEW_LOCATION = 0;
export const UNIFORM_DIRECTIONAL_LIGHTS_LOCATION = 1;
export const UNIFORM_SPOT_LIGHTS_LOCATION = 2;
