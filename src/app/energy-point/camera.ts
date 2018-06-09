import * as THREE from 'three';

export default class Camera extends THREE.PerspectiveCamera {
  angle = 0;
  radius = 25;
  constructor(ratio: number) {
    super(45, ratio, 1, 1000);

    this.position.set(this.radius, 15, 0);
    this.lookAt(new THREE.Vector3(0, 3, 0));
  }

  update() {
    this.angle += 0.2;
    const rad = this.angle * Math.PI / 180;
    this.position.x = this.radius * Math.cos(rad);
    this.position.z = this.radius * Math.sin(rad);
    this.lookAt(new THREE.Vector3(0, 0, 0));
  }
}
