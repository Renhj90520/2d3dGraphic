import * as THREE from 'three';
import Flare from './flare';

export default class FlareEmitter extends THREE.Object3D {
  private flareNum = 10;
  private flareList = [];

  constructor() {
    super();

    const perAngle = 360 / this.flareNum;
    for (let i = 0; i < this.flareNum; i++) {
      const rad = perAngle * i * Math.PI / 180;
      const flare = new Flare();
      flare.rotation.x = rad;
      flare.rotation.y = rad;
      flare.rotation.z = rad / 2;
      this.add(flare);
      this.flareList.push(flare);
    }
  }
  public update() {
    this.flareList.forEach(flare => {
      flare.update();
    });
  }
}
