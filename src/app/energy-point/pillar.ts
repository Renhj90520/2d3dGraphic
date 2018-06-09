import * as THREE from 'three';

export default class Pillar extends THREE.Object3D {
  private counter = 0;
  private texture;
  private cylinder;

  constructor(topRadius: number, bottomRadius: number, height: number) {
    super();
    this.texture = new THREE.TextureLoader().load('assets/images/pillar.png');
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.repeat.set(10, 1);

    const geometry = new THREE.CylinderGeometry(
      topRadius,
      bottomRadius,
      height,
      20,
      1,
      true
    );

    const material = new THREE.MeshBasicMaterial({
      color: 0x007eff,
      map: this.texture,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      depthWrite: false
    });

    this.cylinder = new THREE.Mesh(geometry, material);
    this.cylinder.position.set(0, height / 2, 0);

    this.add(this.cylinder);
  }

  public update() {
    this.counter += 0.5;
    const angle = this.counter * Math.PI / 180;
    this.texture.offset.y = 0.1 + 0.2 * Math.sin(angle * 3);
    this.texture.offset.x = angle;
  }
}
