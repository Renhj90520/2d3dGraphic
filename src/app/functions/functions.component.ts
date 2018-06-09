import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {
  scene;
  renderer;
  camera;
  start = Date.now();
  material;
  fragShader = `
    uniform float u_time;
    vec3 colorA=vec3(0.149,0.141,0.912);
    vec3 colorB=vec3(1.000,0.883,0.224);
    void main(){
      vec3 color=vec3(0.0);
      float pct=abs(sin(u_time));

      color=mix(colorA,colorB,pct);
      gl_FragColor=vec4(color,1.0);
    }
  `;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initScene();
    this.render();
  }
  initScene() {
    this.scene = new THREE.Scene();

    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    // const uniforms = {
    //   resolution: { type: 'v2', value: new THREE.Vector2(width, height) }
    // };
    const uniforms = {
      u_time: { type: 'f', value: 0.0 }
    };
    this.material = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader: this.fragShader
    });

    const geo = new THREE.PlaneGeometry(10, 10);
    const mesh = new THREE.Mesh(geo, this.material);
    this.scene.add(mesh);
    mesh.position.z = -1;
  }
  render() {
    this.material.uniforms['u_time'].value =
      0.00025 * (Date.now() - this.start);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => {
      this.render();
    });
  }
}
