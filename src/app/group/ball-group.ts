import * as THREE from 'three';

export default class BallGroup extends THREE.Group {
  constructor() {
    super();

    for (let i = 0; i < 10; i++) {
      const material = new THREE.MeshNormalMaterial();
      const geometry = new THREE.SphereGeometry(30, 30, 30);
      const mesh = new THREE.Mesh(geometry, material);

      const radian = i / 10 * Math.PI * 2;
      mesh.position.set(200 * Math.cos(radian), 30, 200 * Math.sin(radian));

      this.add(mesh);
    }
  }

  public update() {
    this.rotation.y += 0.01;
    this.rotation.x += 0.02;
  }
}
