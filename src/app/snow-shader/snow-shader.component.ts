import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-snow-shader',
  templateUrl: './snow-shader.component.html',
  styleUrls: ['./snow-shader.component.css']
})
export class SnowShaderComponent implements OnInit {
  scene;
  renderer;
  camera;
  start = Date.now();
  points;
  numParticles = 100;
  width = 100;
  height = 100;
  depth = 100;
  clock = new THREE.Clock();
  pointsGeometry = new THREE.Geometry();
  pointsMaterial;
  vertexShader = `
    uniform float u_height;
    uniform float u_elapsedTime;
    void main(){
      vec3 pos=position;
      pos.x+=cos((u_elapsedTime+position.z)*0.25)*2.5;
      pos.y=mod(pos.y-u_elapsedTime,u_height);
      pos.z+=sin((u_elapsedTime+position.x)*0.25)*2.5;
      gl_PointSize=1.0;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);
    }
  `;
  fragShader = `
    uniform vec3 u_color;
    void main(){
      gl_FragColor=vec4(u_color, 1.0);
    }
  `;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initScene();
    this.addParticles();
    this.render();
  }
  initScene() {
    this.scene = new THREE.Scene();

    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0), 1.0);
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  }

  addParticles() {
    for (let i = 0; i < this.numParticles; i++) {
      const vertex = new THREE.Vector3(
        this.rand(this.width),
        Math.random() * this.height,
        this.rand(this.depth)
      );
      this.pointsGeometry.vertices.push(vertex);
    }
    // this.pointsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    this.pointsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_color: {
          type: 'c',
          value: new THREE.Color(0xffffff)
        },
        u_height: {
          type: 'f',
          value: 100.0
        },
        u_elapsedTime: {
          type: 'f',
          value: 0.0
        }
      },
      vertexShader: this.vertexShader,
      fragmentShader: this.fragShader
    });
    this.points = new THREE.Points(this.pointsGeometry, this.pointsMaterial);
    this.points.position.y = -50;
    this.scene.add(this.points);
  }
  rand(v) {
    return v * (Math.random() - 0.5);
  }

  updateParticleSystem(elapsed) {
    const geometry = this.points.geometry;
    const vertices = geometry.vertices;
    const numVertices = vertices.length;
    const speedY = elapsed;

    for (let i = 0; i < numVertices; i++) {
      const v = vertices[i];
      if (v.y > 0) {
        v.y -= speedY * Math.random();
      } else {
        v.y = 100;
      }
    }

    geometry.verticesNeedUpdate = true;
  }
  render() {
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    const delta = this.clock.getDelta();
    const t = this.clock.getElapsedTime() * 0.5;
    this.points.material.uniforms.u_elapsedTime.value = t * 20;
    this.camera.position.set(200 * Math.sin(t), 0, 200 * Math.cos(t));
    this.camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
    requestAnimationFrame(() => {
      this.render();
    });
  }
}
