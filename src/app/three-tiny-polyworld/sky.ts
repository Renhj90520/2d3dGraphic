import * as THREE from "three";
import Cloud from "./cloud";
export default class Sky extends THREE.Object3D {
  constructor() {
    super();

    const nClouds = 25;
    const stepAngle = (Math.PI * 2) / nClouds;

    for (let i = 0; i < nClouds; i++) {
      const c = new Cloud();
      const a = stepAngle * i;

      const h = 800 + Math.random() * 200;
      c.position.y = Math.sin(a) * h;
      c.position.x = Math.cos(a) * h;

      c.rotation.z = a + Math.PI * 2;
      c.position.z = -400 - Math.random() * 400;

      const s = 1 + Math.random() * 2;
      c.scale.set(s, s, s);

      this.add(c);
    }
  }
}
