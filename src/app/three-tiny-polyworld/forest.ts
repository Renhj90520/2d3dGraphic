import * as THREE from "three";
import Tree from "./tree";
import Flower from "./flower";
export default class Forest extends THREE.Group {
  constructor() {
    super();

    const nTrees = 300;
    const stepAngle = (Math.PI * 2) / nTrees;
    for (let i = 0; i < nTrees; i++) {
      const t = new Tree();

      const a = stepAngle * i;
      const h = 605;
      t.position.y = Math.sin(a) * h;
      t.position.x = Math.cos(a) * h;

      t.rotation.z = a + (Math.PI / 2) * 3;
      t.position.z = -Math.random() * 600;
      const s = 0.3 + Math.random() * 0.75;
      t.scale.set(s, s, s);
      this.add(t);
    }

    const nFlowers = 350;
    const stepAngle1 = (Math.PI * 2) / nFlowers;
    for (let i = 0; i < nFlowers; i++) {
      const f = new Flower();
      const a = stepAngle1 * i;

      const h = 605;
      f.position.y = Math.sin(a) * h;
      f.position.x = Math.cos(a) * h;
      f.rotation.z = a + (Math.PI / 2) * 3;

      f.position.z = -Math.random() * 600;
      const s = 0.1 + Math.random() * 0.3;
      f.scale.set(s, s, s);

      this.add(f);
    }
  }
}
