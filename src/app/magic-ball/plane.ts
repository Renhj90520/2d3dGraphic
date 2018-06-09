import * as THREE from 'three';

export default class Plane extends THREE.Object3D {
  constructor() {
    super();

    const gridHelper = new THREE.GridHelper(10, 20);
    this.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(2);
    this.add(axesHelper);
  }
}
