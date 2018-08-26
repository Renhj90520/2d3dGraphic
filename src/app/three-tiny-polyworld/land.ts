import * as THREE from "three";
export default class Land extends THREE.Mesh {
  constructor() {
    super();

    this.geometry = new THREE.CylinderGeometry(600, 600, 1700, 40, 10);
    this.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    this.material = new THREE.MeshPhongMaterial({
      color: 0x629265,
      flatShading: true
    });

    this.receiveShadow = true;
  }
}
