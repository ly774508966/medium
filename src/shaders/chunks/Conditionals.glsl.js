export const whenEq = `
float when_eq(float x, float y) {
  return 1.0 - abs(sign(x - y));
};

int when_eq_int(int x, int y) {
  return 1 - abs(sign(x - y));
}
`;

export const whenGe = `
float when_ge(float x, float y) {
  return 1.0 - when_lt(x, y);
}
`;

export const whenLt = `
float when_lt(float x, float y) {
  return max(sign(y - x), 0.0);
}
`;

export const whenGt = `
float when_gt(float x, float y) {
  return max(sign(x - y), 0.0);
}
`;

export default {
	whenEq,
	whenGe,
	whenLt,
	whenGt,
};
