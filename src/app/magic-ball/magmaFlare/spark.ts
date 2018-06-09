import * as THREE from 'three';

export default class Spark extends THREE.Object3D {
  private mesh;
  speed = Math.random() * 0.2 + 0.2;
  opacity = 0.5;
  constructor() {
    super();

    const geometry = new THREE.PlaneGeometry(0.15, 2);

    const loader = new THREE.TextureLoader();
    const map = loader.load('assets/images/Burst01.png');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;

    const material = new THREE.MeshBasicMaterial({
      map: map,
      side: THREE.DoubleSide,
      depthWrite: false,
      transparent: true,
      opacity: this.opacity,
      blending: THREE.AdditiveBlending
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.y = Math.random() * 5;
    this.mesh.rotation.y = Math.random() * 2;
    this.add(this.mesh);
  }

  public update() {
    this.mesh.position.y -= this.speed;
    this.mesh.material.opacity -= 0.05;
    if (this.mesh.position.y < 0) {
      this.mesh.position.y = 6;
      this.mesh.material.opacity = this.opacity;
    }
  }
}
