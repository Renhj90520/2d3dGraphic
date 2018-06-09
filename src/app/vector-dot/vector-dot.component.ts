import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
import FlashLight from './flashlight';
import ParticleEmiter from './particle-emitter';
@Component({
  selector: 'app-vector-dot',
  templateUrl: './vector-dot.component.html',
  styleUrls: ['./vector-dot.component.css']
})
export class VectorDotComponent implements OnInit {
  scene;
  camera;
  renderer;
  flashlight;
  particleEmitter;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setUpThree();
  }

  setUpThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 10, 500);
    this.camera.position.set(10, 50, 10);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.addAmbientLight();
    this.addFlashlight();
    this.addParticle();
    const axesHelper = new THREE.AxesHelper(20);
    this.scene.add(axesHelper);
    this.update();
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light);
  }

  addFlashlight() {
    this.flashlight = new FlashLight();
    this.scene.add(this.flashlight);
  }

  addParticle() {
    this.particleEmitter = new ParticleEmiter();
    this.scene.add(this.particleEmitter);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
    this.flashlight.update();
    this.particleEmitter.update(
      this.flashlight.frontVector,
      this.flashlight.aperture
    );
    requestAnimationFrame(() => {
      this.update();
    });
  }
}
