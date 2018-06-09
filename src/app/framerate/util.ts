export default class Util {
  public static random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
