import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-rotate-simple',
  templateUrl: './rotate-simple.component.html',
  styleUrls: ['./rotate-simple.component.css']
})
export class RotateSimpleComponent implements OnInit {
  scene;
  camera;
  renderer;
  sphere;
  degree = 0;
  radius = 300;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    this.camera.position.set(0, 0, 1000);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.addSphere();
    this.addEarth();
    this.update();
  }

  addSphere() {
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(10),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );

    this.scene.add(this.sphere);
  }

  addEarth() {
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(250),
      new THREE.MeshBasicMaterial({ wireframe: true })
    );
    this.scene.add(earth);
  }

  update() {
    requestAnimationFrame(() => {
      this.update();
    });

    this.degree += 5;
    const rad = this.degree * Math.PI / 180;
    const x = this.radius * Math.cos(rad);
    const y = this.radius * Math.sin(rad);
    this.sphere.position.set(x, y, 0);
    this.renderer.render(this.scene, this.camera);
  }
}
