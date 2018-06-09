import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
import MyCamera from '../magic-ball/mycamera';
import Plane from './plane';
import ParticleEmitter from './particle-emitter';
import TimerModel from './timer-model';
@Component({
  selector: 'app-framerate',
  templateUrl: './framerate.component.html',
  styleUrls: ['./framerate.component.css']
})
export class FramerateComponent implements OnInit {
  camera;
  scene;
  renderer;
  particleEmitter;
  constructor(private el: ElementRef) {}
  setUpTHREE() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = MyCamera.getInstance(width, height);

    const plane = new Plane();
    this.scene.add(plane);
    this.particleEmitter = new ParticleEmitter();
    this.scene.add(this.particleEmitter);
    this.update();
  }
  update() {
    this.camera.update();
    this.renderer.render(this.scene, this.camera);
    this.particleEmitter.update();
    TimerModel.getInstance().updateTimeRatio();
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.setUpTHREE();
  }
}
