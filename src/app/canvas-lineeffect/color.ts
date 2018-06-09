export default class Color {
  r;
  g;
  b;
  style;

  constructor(min = 0) {
    this.r = this.colorValue(min);
    this.g = this.colorValue(min);
    this.b = this.colorValue(min);
    this.style = Color.createColorStyle(this.r, this.g, this.b);
  }

  public static createColorStyle(r, g, b) {
    return `rgba(${r},${g},${b},.8)`;
  }
  colorValue(min) {
    return Math.floor(Math.random() * 255 + min);
  }
}
