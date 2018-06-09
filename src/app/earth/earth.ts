import * as THREE from 'three';

export default class Earth extends THREE.Group {
  public ground: THREE.Mesh;
  public cloud: THREE.Mesh;

  constructor() {
    super();

    const sphere = new THREE.SphereGeometry(100, 60, 60);
    const material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('assets/images/ground.jpg'),
      bumpMap: new THREE.TextureLoader().load('assets/images/bump.jpg'),
      bumpScale: 1.0,
      specularMap: new THREE.TextureLoader().load('assets/images/specular.png')
    });

    this.ground = new THREE.Mesh(sphere, material);
    this.ground.receiveShadow = true;
    this.add(this.ground);

    const cloudSphere = new THREE.SphereGeometry(102, 60, 60);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('assets/images/cloud.jpg'),
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    this.cloud = new THREE.Mesh(cloudSphere, cloudMaterial);
    this.add(this.cloud);
  }

  public update() {
    this.cloud.rotation.y += 0.0005;
  }
}
