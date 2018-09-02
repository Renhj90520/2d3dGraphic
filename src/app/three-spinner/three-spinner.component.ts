import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
@Component({
  selector: "app-three-spinner",
  templateUrl: "./three-spinner.component.html",
  styleUrls: ["./three-spinner.component.css"]
})
export class ThreeSpinnerComponent implements OnInit {
  scene;
  renderer;
  camera;
  light1;
  light2;
  elapsedTime;
  clock = new THREE.Clock();
  constructor(private el: ElementRef) {
    this.initThree();
    this.addLights();
    this.addMesh();
    this.update();
  }

  ngOnInit() {}
  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 50);
    this.camera.position.set(1, -0.5, 5);
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);
  }

  addLights() {
    this.light1 = new THREE.PointLight(0x139aff, 5, 100, 1);
    this.light1.position.set(1.5, 0, 0);
    this.scene.add(this.light1);

    this.light2 = new THREE.PointLight(0xff7d33, 5, 100, 1);
    this.light2.position.set(-1.5, 0, 0);
    this.scene.add(this.light2);
  }

  addMesh() {
    const geometry = new THREE.IcosahedronGeometry(1, 2);
    const material = new THREE.MeshPhongMaterial({
      flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }
  update() {
    this.renderer.render(this.scene, this.camera);

    this.elapsedTime = this.clock.getElapsedTime() * 4;
    this.light1.position.x = -1.5 * Math.cos(-this.elapsedTime);
    this.light1.position.y = -1.5 * Math.sin(-this.elapsedTime);

    this.light2.position.x = 1.5 * Math.cos(-this.elapsedTime);
    this.light2.position.y = 1.5 * Math.sin(-this.elapsedTime);

    requestAnimationFrame(this.update.bind(this));
  }
}
