import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
@Component({
  selector: "app-three-flower",
  templateUrl: "./three-flower.component.html",
  styleUrls: ["./three-flower.component.css"]
})
export class ThreeFlowerComponent implements OnInit {
  scene;
  renderer;
  camera;
  uniforms;
  flower;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addLight();
    this.addFlower();
    this.update();
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    this.camera.position.z = 800;
  }

  addFlower() {
    const geometry = new THREE.SphereBufferGeometry(100, 200, 100);
    const verticesCount = geometry.attributes.position.count;

    const replacements = new Float32Array(verticesCount);
    for (let i = 0; i < verticesCount; i++) {
      replacements[i] = Math.sin(i * 0.04) * 50 - Math.cos(i * 0.1) * 50;
    }

    geometry.addAttribute(
      "displacement",
      new THREE.BufferAttribute(replacements, 1)
    );
    const vertexShader = `
      uniform float amplitude;
      attribute float displacement;
      varying vec3 vNormal;
      
      void main(){
        vNormal=normal;
        vec3 newPosition=position+normal*vec3(displacement*amplitude);
        gl_Position=projectionMatrix*modelViewMatrix*vec4(newPosition,1.0);
      }
    `;

    const fragmentShader = `
      uniform float coloroffset;
      uniform float coloroffsetR;
      uniform float coloroffsetG;
      uniform float coloroffsetB;

      varying vec3 vNormal;
      void main(){
        vec3 light=vec3(0.3,-4.0,2.0);
        light=normalize(light);
        float dProd=max(0.0, dot(vNormal, light));
        gl_FragColor=vec4(dProd*coloroffsetR,dProd*coloroffsetG,dProd*coloroffsetB,1.0);
      }
    `;

    this.uniforms = {
      amplitude: {
        type: "f",
        value: 0
      },
      coloroffset: {
        type: "f",
        value: 1
      },
      coloroffsetR: {
        type: "f",
        value: 1
      },
      coloroffsetG: {
        type: "f",
        value: 1
      },
      coloroffsetB: {
        type: "f",
        value: 1
      }
    };
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader
    });

    this.flower = new THREE.Mesh(geometry, material);
    this.scene.add(this.flower);
  }

  addLight() {
    const light = new THREE.PointLight(0xffffff);
    light.position.set(10, 50, 130);
    this.scene.add(light);
  }

  frame = 0;
  update() {
    this.renderer.render(this.scene, this.camera);

    this.uniforms.amplitude.value = Math.sin(this.frame);
    this.uniforms.coloroffsetR.value = Math.sin(this.frame);
    this.uniforms.coloroffsetG.value = Math.sin(-this.frame);
    this.uniforms.coloroffsetB.value = Math.sin(this.frame / 7);

    this.frame += 0.01;
    this.flower.rotation.x = 180;
    this.flower.rotation.y += 0.01;

    requestAnimationFrame(this.update.bind(this));
  }
}
