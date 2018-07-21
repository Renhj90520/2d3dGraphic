export default class Utils {
  static randomRange(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
  }
  static getDegree(radian) {
    return (radian / Math.PI) * 180;
  }
  static getRadian(degree) {
    return (degree * Math.PI) / 180;
  }
  static getSpherical(rad1, rad2, r) {
    const x = Math.cos(rad1) * Math.cos(rad2) * r;
    const z = Math.cos(rad1) * Math.sin(rad2) * r;
    const y = Math.sin(rad1) * r;
    return [x, y, z];
  }
}
