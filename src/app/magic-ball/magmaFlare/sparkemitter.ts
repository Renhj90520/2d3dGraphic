import * as THREE from 'three';
import Spark from './spark';

export default class SparkEmitter extends THREE.Object3D {
  private sparklist: Spark[] = [];
  private sparkNum = 50;

  constructor() {
    super();

    const perAngle = 360 / this.sparkNum;
    for (let i = 0; i < this.sparkNum; i++) {
      const radian = perAngle * i * Math.PI / 180;
      const spark = new Spark();
      spark.rotation.x = Math.PI * 2 * Math.sin(radian);
      spark.rotation.z = radian;

      this.add(spark);
      this.sparklist.push(spark);
    }
  }
  public update() {
    this.sparklist.forEach(spark => {
        spark.update();
    });
  }
}
