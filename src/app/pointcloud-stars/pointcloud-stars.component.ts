import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-pointcloud-stars',
  templateUrl: './pointcloud-stars.component.html',
  styleUrls: ['./pointcloud-stars.component.css']
})
export class PointcloudStarsComponent implements OnInit {
  scene;
  camera;
  renderer;
  rotation = 0;
  constructor(private el: ElementRef) {}
  setupThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(width, height);

    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, width / height);
    this.addStars();

    this.update();
  }
  addStars() {
    const length = 1000;
    const size = 3000;
    const geometry = new THREE.Geometry();
    for (let i = 0; i < length; i++) {
      geometry.vertices.push(
        new THREE.Vector3(
          size * (Math.random() - 0.5),
          size * (Math.random() - 0.5),
          size * (Math.random() - 0.5)
        )
      );
    }
    const material = new THREE.PointsMaterial({
      size: 10,
      color: 0xffffff
    });
    const mesh = new THREE.Points(geometry, material);
    this.scene.add(mesh);
  }
  update() {
    this.rotation += 1;
    const radian = (this.rotation * Math.PI) / 180;
    this.camera.position.x = 1000 * Math.sin(radian);
    this.camera.position.z = 1000 * Math.cos(radian);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.setupThree();
  }
}
