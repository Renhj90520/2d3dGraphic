import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { EarthComponent } from '../earth/earth.component';
@Component({
  selector: 'app-vector-add-sub',
  templateUrl: './vector-add-sub.component.html',
  styleUrls: ['./vector-add-sub.component.css']
})
export class VectorAddSubComponent implements OnInit {
  scene;
  renderer;
  camera;

  frontVector = new THREE.Vector3(0, -1, 0);
  degree = 0;
  radius = 150;
  sphere;
  helper;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setUpThree();
    this.update();
  }
  setUpThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000);

    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    this.camera.position.set(0, 0, -400);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(10),
      new THREE.MeshBasicMaterial({ color: 0xcc0000, wireframe: true })
    );
    this.scene.add(this.sphere);

    this.helper = new THREE.ArrowHelper(
      this.frontVector,
      new THREE.Vector3(0, 0, 0),
      40
    );

    this.scene.add(this.helper);

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(70, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0x666666, wireframe: true })
    );
    this.scene.add(earth);

    const ground = new THREE.GridHelper(1000, 20);
    ground.position.y = -80;
    this.scene.add(ground);
  }
  getCircularMotionPosition(degree) {
    const rad = degree * Math.PI / 180;
    const x = this.radius * Math.cos(rad);
    const y = this.radius * Math.sin(rad * 1.5) / 7;
    const z = this.radius * Math.sin(rad);
    return new THREE.Vector3(x, y, z);
  }
  update() {
    this.renderer.render(this.scene, this.camera);
    this.degree -= 2;
    const oldPosition = this.sphere.position.clone();
    const newPosition = this.getCircularMotionPosition(this.degree);
    this.frontVector = newPosition.clone().sub(oldPosition);
    this.frontVector = this.frontVector.normalize();

    const backVector = this.frontVector.clone().negate();
    const distance = 200;
    backVector.multiplyScalar(distance);

    const cameraPosition = backVector.add(this.sphere.position);
    this.camera.position.copy(cameraPosition);
    this.camera.lookAt(this.sphere.position);

    this.sphere.position.copy(newPosition);
    this.helper.setDirection(this.frontVector);

    requestAnimationFrame(() => {
      this.update();
    });
  }
}
