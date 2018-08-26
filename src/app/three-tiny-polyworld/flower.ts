import * as THREE from "three";
import { BoxGeometry } from "three";
export default class Flower extends THREE.Group {
  constructor() {
    super();
    const geoStem = new THREE.BoxGeometry(5, 50, 5, 1, 1, 1);
    const matStem = new THREE.MeshPhongMaterial({
      color: 0x458248,
      flatShading: true
    });

    const stem = new THREE.Mesh(geoStem, matStem);
    stem.castShadow = true;
    stem.receiveShadow = true;
    this.add(stem);

    const geoPetalCore = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
    const matPetalCore = new THREE.MeshPhongMaterial({
      color: 0xedeb27,
      flatShading: true
    });

    const petalCore = new THREE.Mesh(geoPetalCore, matPetalCore);
    petalCore.castShadow = true;
    petalCore.receiveShadow = true;

    const petalColors = [0xf25346, 0xedeb27, 0x68c3c0];
    const petalColor = petalColors[Math.floor(Math.random() * 3)];
    const geoPetal = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    const matPetal = new THREE.MeshBasicMaterial({ color: petalColor });
    geoPetal.vertices[5].y -= 4;
    geoPetal.vertices[4].y -= 4;
    geoPetal.vertices[7].y += 4;
    geoPetal.vertices[6].y += 4;
    geoPetal.translate(12.5, 0, 3);

    const petals = [];

    for (let i = 0; i < 4; i++) {
      petals[i] = new THREE.Mesh(geoPetal, matPetal);
      petals[i].rotation.z = (i * Math.PI) / 2;
      petals[i].castShadow = true;
      petals[i].receiveShadow = true;
      petalCore.add(petals[i]);
    }

    petalCore.position.y = 25;
    petalCore.position.z = 3;
    this.add(petalCore);
  }
}
