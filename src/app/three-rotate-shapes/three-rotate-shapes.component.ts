import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-three-rotate-shapes",
  templateUrl: "./three-rotate-shapes.component.html",
  styleUrls: ["./three-rotate-shapes.component.css"]
})
export class ThreeRotateShapesComponent implements OnInit {
  scene;
  renderer;
  camera;
  shapes = [];
  constructor(private el: ElementRef) {}

  initTHREE() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(3, 4, 10);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);
  }

  addSpotLight() {
    const light = new THREE.SpotLight(0xfca4c5);
    light.position.set(0, 250, 0);
    this.scene.add(light);
  }

  initShapes() {
    const geometry = new THREE.IcosahedronGeometry(2.5, 0);
    const material = new THREE.MeshNormalMaterial();
    const mesh1 = new THREE.Mesh(geometry, material);
    const mesh2 = new THREE.Mesh(geometry, material);
    const mesh3 = new THREE.Mesh(geometry, material);

    mesh1.position.set(0, 5, 0);
    mesh2.position.set(0, 5, 0);
    mesh3.position.set(0, 5, 0);
    this.shapes.push(mesh1);
    this.shapes.push(mesh2);
    this.shapes.push(mesh3);
    this.scene.add(mesh1, mesh2, mesh3);
  }

  update() {
    this.shapes[0].rotation.x += 0.035;
    this.shapes[0].rotation.y -= 0.005;
    this.shapes[1].rotation.x += 0.015;
    this.shapes[1].rotation.y -= 0.005;
    this.shapes[2].rotation.x -= 0.025;
    this.shapes[2].rotation.y += 0.005;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.initTHREE();
    this.addSpotLight();
    this.initShapes();
    this.update();
  }
}
