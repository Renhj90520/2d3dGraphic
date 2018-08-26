import * as THREE from "three";
export default class Cloud extends THREE.Object3D {
  constructor() {
    super();

    const geometry = new THREE.DodecahedronGeometry(20, 0);
    const material = new THREE.MeshPhongMaterial({
      color: 0xd8d0d1
    });

    const nBlocks = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < nBlocks; i++) {
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = i * 15;
      mesh.position.y = Math.random() * 10;
      mesh.position.z = Math.random() * 10;
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;

      const s = 0.1 + Math.random() * 0.9;
      mesh.scale.set(s, s, s);
      this.add(mesh);
    }
  }
}
