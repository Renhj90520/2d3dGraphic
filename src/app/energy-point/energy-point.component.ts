import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
import Camera from './camera';
import SavePoint from './save-point';
@Component({
  selector: 'app-energy-point',
  templateUrl: './energy-point.component.html',
  styleUrls: ['./energy-point.component.css']
})
export class EnergyPointComponent implements OnInit {
  scene;
  renderer;
  camera;
  savepoint;
  constructor(private el: ElementRef) {}

  setUpThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x83a3b7);
    this.renderer.shadowMap.enable = true;
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new Camera(width / height);
    this.addLight();
    this.addGround();
    this.savepoint = new SavePoint();
    this.scene.add(this.savepoint);
    this.update();
  }
  addLight() {
    const light = new THREE.DirectionalLight(0x555555, 1.6);
    light.position.set(0.577, 0.577, 0.577);
    light.castShadow = true;
    this.scene.add(light);
  }

  addGround() {
    const planeTexture = new THREE.TextureLoader().load(
      'assets/images/tile.png'
    );
    planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;
    planeTexture.repeat.set(16, 16);
    const planeGeo = new THREE.PlaneGeometry(100, 100, 1, 1);
    const planeMat = new THREE.MeshPhongMaterial({
      map: planeTexture,
      bumpMap: planeTexture,
      bumpScale: 0.2,
      shininess: 3,
      specularMap: planeTexture,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = 90 * Math.PI / 180;
    this.scene.add(plane);
  }
  update() {
    this.camera.update();
    this.savepoint.update();
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.setUpThree();
  }
}
