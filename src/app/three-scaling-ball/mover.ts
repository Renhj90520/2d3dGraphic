import * as THREE from "three";
import Utils from "./utils";
export default class Mover {
  rad1;
  rad2;
  range = 200;
  position = new THREE.Vector3();
  constructor(rad1, rad2) {
    this.rad1 = rad1;
    this.rad2 = rad2;
    this.updatePosition();
  }

  move() {
    this.rad1 += Utils.getRadian(0.1);
    this.rad2 += Utils.getRadian(0.3);
    this.updatePosition();
  }
  updatePosition() {
    const pos = Utils.getSpherical(this.rad1, this.rad2, this.range);
    this.position.set(pos[0], pos[1], pos[2]);
  }
}
