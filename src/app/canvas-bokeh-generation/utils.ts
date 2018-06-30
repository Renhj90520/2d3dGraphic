export const rand = (min, max) => {
  return Math.random() * (max - min) + min;
};
export const hsla = (h, s, l, a) => {
  return `hsla(${h},${s}%,${l}%,${a})`;
};
