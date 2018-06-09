import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import * as noise from '../../glslnoise/noises';
@Component({
  selector: 'app-fireball',
  templateUrl: './fireball.component.html',
  styleUrls: ['./fireball.component.css']
})
export class FireballComponent implements OnInit {
  scene;
  renderer;
  camera;
  start = Date.now();
  material;
  vertexShader = noise.classicnoise3D +
  `
    varying vec2 vUv;
    varying float noise;
    uniform float time;
    float turbulence(vec3 p){
      float w = 100.0;
      float t = -.5;
      for(float f=1.0;f<=10.0;f++){
        float power = pow(2.0,f);
        t+=abs(pnoise(vec3(power*p),vec3(10.0,10.0,10.0))/power);
      }
      return t;
    }
    void main(){
      vUv=uv;

      noise=10.0*-.10*turbulence(.5*normal+time);
      float b=5.0*pnoise(0.05*position+vec3(2.0*time),vec3(100.0));
      float displacement=-10.0*noise+b;

      vec3 newPosition=position+normal*displacement;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(newPosition,1.0);
    }
  `;
  fragmentShader = `
    varying vec2 vUv;
    varying float noise;
    uniform sampler2D tExplosion;
    float random(vec3 scale, float seed){
      return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);
    }
    void main(){
      float r=.01*random(vec3(12.9898,78.233,151.7182),0.0);
      vec2 tPos=vec2(0,1.3*noise+r);
      vec4 color=texture2D(tExplosion,tPos);
      gl_FragColor=vec4(color.rgb,1.0);
    }
  `;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initScene();
    this.addSphere();
    this.update();
  }
  initScene() {
    this.scene = new THREE.Scene();
    this.scene.backgroundColor = new THREE.Color(0, 0, 0);

    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000);
    this.camera.position.z = 100;
  }
  addSphere() {
    const geo = new THREE.IcosahedronGeometry(20, 3);
    // const material = new THREE.MeshBasicMaterial({
    //   color: 0xb7ff00,
    //   wireframe: true
    // });

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        tExplosion: {
          type: 't',
          value: new THREE.TextureLoader().load('assets/images/explosion.png')
        },
        time: {
          type: 'f',
          value: 0.0
        }
      },
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader
    });
    const mesh = new THREE.Mesh(geo, this.material);
    this.scene.add(mesh);
  }

  update() {
    this.material.uniforms['time'].value = 0.00025 * (Date.now() - this.start);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => {
      this.update();
    });
  }
}
