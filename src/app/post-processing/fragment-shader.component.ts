import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { IShader } from './shaders/IShader';
import NegativePositiveShader from './shaders/negative-positive-shader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
interface IShaderMap {
  material: IShader;
  pass: ShaderPass;
}
@Component({
  selector: 'app-fragment-shader',
  templateUrl: './fragment-shader.component.html',
  styleUrls: ['./fragment-shader.component.css']
})
export class FragmentShaderComponent implements OnInit {
  scene;
  camera;
  renderer;
  composer: EffectComposer;
  effects: { [key: string]: IShaderMap };
  effectList: IShaderMap[] = [];
  constructor(private el: ElementRef) {}
  setUpThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x0000000);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(77, width / height, 0.1, 1000);
    this.camera.position.z = 3;
    this.addPicture();

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.addShaders();
    this.update();
  }
  addPicture() {
    const texture = new THREE.TextureLoader().load('assets/images/flower.jpg');
    texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

    const geometry = new THREE.PlaneGeometry(1.5, 1, 1.1);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.x = mesh.scale.y = 6;
    this.scene.add(mesh);
  }

  addShaders() {
    this.addEffect('nega', new NegativePositiveShader());
  }

  addEffect(name: string, shader: IShader) {
    const pass = new ShaderPass(shader);
    this.composer.addPass(pass);
    pass.renderToScreen = true;
    pass.enabled = true;
    this.effects[name] = { material: shader, pass: pass };
    this.effectList.push(this.effects[name]);
  }
  update() {
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.setUpThree();
  }
}
