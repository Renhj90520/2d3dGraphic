import * as THREE from 'three';

export default class MyCamera extends THREE.PerspectiveCamera {
  private static _instance: MyCamera;
  private angle = 0;
  private radius = 25;
  public static getInstance(width, height) {
    return MyCamera._instance || new MyCamera(width, height);
  }

  constructor(width, height) {
    super(45, width / height, 1, 1000);
    this.position.set(this.radius, 10, 0);
    MyCamera._instance = this;
  }

  public rotate(direction: string) {
    if (direction === 'left') {
      this.angle -= 0.5;
    } else {
      this.angle += 0.5;
    }
  }

  public update() {
    this.angle += 0.3;
    const radian = this.angle * Math.PI / 180;
    this.position.x = this.radius * Math.sin(radian);
    this.position.z = this.radius * Math.cos(radian);
    this.lookAt(new THREE.Vector3(0, 0, 0));
  }
}
