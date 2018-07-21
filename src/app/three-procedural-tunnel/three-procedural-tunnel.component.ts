import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
@Component({
  selector: "app-three-procedural-tunnel",
  templateUrl: "./three-procedural-tunnel.component.html",
  styleUrls: ["./three-procedural-tunnel.component.css"]
})
export class ThreeProceduralTunnelComponent implements OnInit {
  scene;
  camera;
  renderer;
  shapes = [];
  shapeNum = 40;
  light;
  light1;
  constructor(private el: ElementRef) {}

  initTHREE() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 10);
  }

  initShapes() {
    for (let k = 0; k < this.shapeNum; k++) {
      let geometry;
      if (Math.random() < 0.5) {
        geometry = new THREE.RingGeometry(4, 40, 3);
      } else {
        geometry = new THREE.RingBufferGeometry(3, 40, 5);
      }
      let material;
      if (k % 7 === 0) {
        material = new THREE.MeshPhongMaterial({ color: 0xffffff });
      } else if (k % 2 === 0) {
        material = new THREE.MeshPhongMaterial({ color: 0x666666 });
      } else {
        material = new THREE.MeshPhongMaterial({ color: 0x333333 });
      }

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = -k * 2;
      mesh.rotation.z = k;
      this.shapes.push(mesh);
      this.scene.add(mesh);
    }
  }
  addLight() {
    this.light = new THREE.PointLight(0xa805fa, 10, 100);
    this.light.position.set(0, 0, 20);
    this.scene.add(this.light);
    this.light1 = new THREE.PointLight(0x07faa0, 10, 100);
    this.light1.position.set(0, 0, -20);
    this.scene.add(this.light1);
  }
  u_time = 0;
  update() {
    requestAnimationFrame(this.update.bind(this));
    this.u_time++;
    for (let k = 0; k < this.shapeNum; k++) {
      this.shapes[k].position.z += 0.2;
      this.shapes[k].rotation.z += 0.02;
      this.shapes[k].scale.x = 1 + Math.sin(k + this.u_time * 0.1) * 0.07;
      this.shapes[k].scale.y = 1 + Math.sin(k + this.u_time * 0.1) * 0.07;
      const valor = 0.5 + Math.sin(this.u_time * 0.05) * 0.5;

      if (Math.random() < valor) {
        this.shapes[k].material.wireframe = true;
        this.shapes[k].material.wireframeLineWidth = Math.random() * 3;
      } else {
        this.shapes[k].material.wireframe = false;
      }

      if (this.shapes[k].z > 10) {
        this.shapes[k].position.z = -70;
        this.shapes[k].rotation.z = k;
      }
    }
    this.light.intensity = Math.abs(Math.sin(this.u_time * 0.2) * 2);
    this.light1.intensity = Math.abs(Math.cos(this.u_time * 0.2) * 2);
    this.light.position.z = Math.abs(Math.sin(this.u_time * 0.02) * 30);
    this.light1.position.z = Math.abs(Math.cos(this.u_time * 0.02) * 30);
    this.renderer.render(this.scene, this.camera);
  }

  ngOnInit() {
    this.initTHREE();
    this.initShapes();
    this.addLight();
    this.update();
  }
}
