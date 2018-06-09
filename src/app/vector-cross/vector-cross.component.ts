import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
import Course from './course';
import Truck from './truck';
import { getCurrentDebugContext } from '@angular/core/src/view/services';
@Component({
  selector: 'app-vector-cross',
  templateUrl: './vector-cross.component.html',
  styleUrls: ['./vector-cross.component.css']
})
export class VectorCrossComponent implements OnInit {
  scene;
  renderer;
  camera;
  course;
  truck;
  frame = 0;
  constructor(private el: ElementRef) {}

  setUpThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 10, 500);
    this.camera.position.set(10, 10, 30);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.addAmbientLight();

    this.course = new Course();
    this.scene.add(this.course);

    this.truck = new Truck();
    this.truck.scale.multiplyScalar(0.5);
    this.truck.position.copy(this.course.points[0]);
    this.scene.add(this.truck);
    const axesHelper = new THREE.AxesHelper(30);
    this.scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(50, 30);
    gridHelper.position.y = -10;
    this.scene.add(gridHelper);

    this.update();
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light);
  }
  addDirectionalLight() {
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    this.scene.add(light);
  }
  getNormal(current, next) {
    const frontVector = current
      .clone()
      .sub(next)
      .normalize();

    const sideVec = new THREE.Vector3(0, 0, -1);
    const normalVec = frontVector.cross(sideVec);
    return normalVec;
  }
  update() {
    this.renderer.render(this.scene, this.camera);

    this.frame++;
    if (this.frame > 360) {
      this.frame = 0;
    }

    const normal = this.getNormal(
      this.course.points[this.frame],
      this.course.points[this.frame + 1]
    );
    this.truck.position.copy(this.course.points[this.frame]);
    this.truck.up.set(normal.x, normal.y, normal.z);
    this.truck.lookAt(this.course.points[this.frame + 1]);

    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.setUpThree();
  }
}
