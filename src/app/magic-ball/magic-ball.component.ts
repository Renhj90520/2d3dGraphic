import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
import MyCamera from './mycamera';
import Plane from './plane';
import MagmaFlare from './magmaFlare/magmaFlare';
@Component({
  selector: 'app-magic-ball',
  templateUrl: './magic-ball.component.html',
  styleUrls: ['./magic-ball.component.css']
})
export class MagicBallComponent implements OnInit {
  scene;
  camera;
  renderer;
  magicFlare;
  constructor(private el: ElementRef) {}
  setUpTHREE() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();

    this.camera = MyCamera.getInstance(width, height);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    const ground = new Plane();
    ground.position.y = -3;
    this.scene.add(ground);

    this.magicFlare = new MagmaFlare();
    this.scene.add(this.magicFlare);

    this.update();
  }
  update() {
    this.camera.update();
    this.magicFlare.update();
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.setUpTHREE();
  }
}
