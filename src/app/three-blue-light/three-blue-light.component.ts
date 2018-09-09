import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
@Component({
  selector: "app-three-blue-light",
  templateUrl: "./three-blue-light.component.html",
  styleUrls: ["./three-blue-light.component.css"]
})
export class ThreeBlueLightComponent implements OnInit {
  scene;
  camera;
  renderer;
  sphere;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addLight();
    this.addSphere();
    this.update();
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);
  }
  addLight() {
    const light = new THREE.PointLight(0x00aaff, 20, 100);
    light.position.set(0, 0, 4);
    this.scene.add(light);
  }

  addSphere() {
    const geometry = new THREE.SphereBufferGeometry(4, 6, 6);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xff0000
    });
    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);
  }

  update() {
    this.renderer.render(this.scene, this.camera);

    this.sphere.rotation.x += 0.01;
    this.sphere.rotation.y += 0.01;
    this.sphere.rotation.z += 0.01;
    requestAnimationFrame(this.update.bind(this));
  }
}
