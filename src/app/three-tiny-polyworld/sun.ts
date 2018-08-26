import * as THREE from "three";

export default class Sun extends THREE.Mesh {
  constructor() {
    super();

    this.geometry = new THREE.SphereGeometry(400, 20, 10);
    this.material = new THREE.MeshPhongMaterial({
      color: 0xedeb27,
      flatShading: true
    });

    this.castShadow = true;
    this.receiveShadow = true;
  }
}
