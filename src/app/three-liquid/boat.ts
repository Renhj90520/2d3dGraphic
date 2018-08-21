import * as THREE from "three";
export default class Boat extends THREE.Mesh {
  vel;
  amp;
  pos;
  constructor() {
    super();

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshStandardMaterial({ color: 0xf00589 });
    this.castShadow = true;
    this.vel = 1 + Math.random() * 4;
    this.amp = 1 + Math.random() * 6;
    this.pos = Math.random() * 0.2;
  }

  movePosition(moveValue = 1) {
    this.position.x = -Math.random() * moveValue + Math.random() * moveValue;
    this.position.z = -Math.random() * moveValue + Math.random() * moveValue;
    this.position.y = (Math.random() * 360 * Math.PI) / 180;
  }

  sizeELement(sizeValue = 1) {
    this.scale.z = this.scale.x = Math.random() * sizeValue;
    this.scale.y = 0.5 + Math.random() * sizeValue * 2;
  }
}
