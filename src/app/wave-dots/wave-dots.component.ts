import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-wave-dots',
  templateUrl: './wave-dots.component.html',
  styleUrls: ['./wave-dots.component.css']
})
export class WaveDotsComponent implements OnInit {
  scene;
  renderer;
  camera;
  particles = [];
  pointGeometry = new THREE.Geometry();
  SEPARATION = 120;
  AMOUNTX = 300;
  AMOUNTY = 70;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initScene();
    this.addParticles();
    this.render();
  }
  initScene() {
    this.scene = new THREE.Scene();

    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0), 1.0);
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
    this.camera.position.y = 20;
  }

  addParticles() {
    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        const x = ix * this.SEPARATION - this.AMOUNTX * this.SEPARATION / 2;
        const z = iy * this.SEPARATION - this.AMOUNTY * this.SEPARATION / 2;
        this.pointGeometry.vertices.push(new THREE.Vector3(x, 0, z));
      }
    }

    const material = new THREE.PointsMaterial({ color: 0xffffff });
    const points = new THREE.Points(this.pointGeometry, material);
    this.scene.add(points);
  }
  updateParticleSystem(elapsed) {}
  render() {
    this.renderer.render(this.scene, this.camera);
    this.camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
    requestAnimationFrame(() => {
      this.render();
    });
  }
}
