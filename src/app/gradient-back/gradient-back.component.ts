import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-gradient-back',
  templateUrl: './gradient-back.component.html',
  styleUrls: ['./gradient-back.component.css']
})
export class GradientBackComponent implements OnInit {
  scene;
  renderer;
  camera;

  fragShader = `
    uniform vec2 resolution;
    void main(){
      vec2 pos=gl_FragCoord.xy/resolution.xy;
      gl_FragColor=vec4(1.0,pos.x,pos.y,1.0);
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

    const uniforms = {
      resolution: { type: 'v2', value: new THREE.Vector2(width, height) }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader: this.fragShader
    });

    const geo = new THREE.PlaneGeometry(10, 10);
    const mesh = new THREE.Mesh(geo, material);
    this.scene.add(mesh);
    mesh.position.z = -1;
  }
  render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => {
      this.render();
    });
  }
}
