import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
@Component({
  selector: "app-three-hex-mosic",
  templateUrl: "./three-hex-mosic.component.html",
  styleUrls: ["./three-hex-mosic.component.css"]
})
export class ThreeHexMosicComponent implements OnInit {
  scene;
  camera;
  renderer;

  clock;
  constructor(private el: ElementRef) {}

  ngOnInit() {}

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, 0, 0.1, 1000);
    this.camera.position.z = 10;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xffffff);
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
  }
  update() {
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.update.bind(this));
  }
}
