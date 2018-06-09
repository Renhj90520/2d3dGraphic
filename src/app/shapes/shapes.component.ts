import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-shapes',
  templateUrl: './shapes.component.html',
  styleUrls: ['./shapes.component.css']
})
export class ShapesComponent implements OnInit {
  scene;
  renderer;
  camera;
  start = Date.now();
  material;
  fragShader = `
    uniform vec2 u_resolution;
    void main(){
      vec2 st=gl_FragCoord.xy/u_resolution.xy;

      float pct=0.0;
      pct=distance(st,vec2(0.5));
      vec3 color=vec3(pct);
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

    const uniforms = {
      resolution: { type: 'v2', value: new THREE.Vector2(width, height) }
    };

    this.material = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader: this.fragShader
    });

    const geo = new THREE.PlaneGeometry(1, 1);
    const mesh = new THREE.Mesh(geo, this.material);
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
