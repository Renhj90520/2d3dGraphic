import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
import TessellateModifier from "./tessellateModifier";
import ExplodeModifier from "./explodeModifier";
@Component({
  selector: "app-three-explode-text",
  templateUrl: "./three-explode-text.component.html",
  styleUrls: ["./three-explode-text.component.css"]
})
export class ThreeExplodeTextComponent implements OnInit {
  scene;
  camera;
  renderer;
  uniforms = { time: { type: "f", value: 0.0 } };
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addLights();
    this.addText();
    this.update();
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 100000);
    this.camera.position.set(0, 100, 500);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);
  }

  addLights() {
    const sunlight = new THREE.DirectionalLight(0xffeedd, 1);
    sunlight.position.set(0.3, -1, -1).normalize();
    this.scene.add(sunlight);
    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(-500, 1000, 500);
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight(0x404040));
  }

  addText() {
    const text = "FANCYPANTS";
    const loader = new THREE.FontLoader();
    const font = loader.load(
      "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
      font => {
        let textGeo: any = new THREE.TextGeometry(text, {
          size: 100,
          height: 20,
          curveSegments: 2,
          font,
          bevelThickness: 2,
          bevelSize: 1,
          bevelEnabled: true
        });
        textGeo.center();

        const tessellateModifier = new TessellateModifier(4);
        for (let i = 0; i < 6; i++) {
          tessellateModifier.modify(textGeo);
        }

        const explodeModifier = new ExplodeModifier();
        explodeModifier.modify(textGeo);

        const numFaces = textGeo.faces.length;
        const bb = textGeo.boundingBox;

        const vertices = textGeo.vertices;
        textGeo = new THREE.BufferGeometry().fromGeometry(textGeo);

        const colors = new Float32Array(numFaces * 3 * 3);

        const displacement = new Float32Array(numFaces * 3 * 3);
        const color = new THREE.Color();

        for (let f = 0; f < numFaces; f++) {
          const index = 9 * f;
          const h = 0.2 * Math.random();
          const s = 0.5 + 0.5 * Math.random();
          const l = 0.5 + 0.5 * Math.random();

          color.setHSL(h, s, l);

          const x = Math.random() * (bb.max.x - bb.min.x);
          const y = Math.random() * (bb.max.y - bb.min.y) * 4;
          const z = Math.random() * (bb.max.z - bb.min.z) * 10;

          for (let i = 0; i < 3; i++) {
            colors[index + 3 * i] = color.r;
            colors[index + 3 * i + 1] = color.g;
            colors[index + 3 * i + 2] = color.b;
            displacement[index + 3 * i] = x;
            displacement[index + 3 * i + 1] = y;
            displacement[index + 3 * i + 2] = z;
          }
        }

        textGeo.addAttribute(
          "customColor",
          new THREE.BufferAttribute(colors, 3)
        );

        textGeo.addAttribute(
          "displacement",
          new THREE.BufferAttribute(displacement, 3)
        );

        const vertexShader = `
          uniform float time;
          attribute vec3 customColor;
          attribute vec3 displacement;
          varying vec3 vNormal;
          varying vec3 vColor;
          float quadraticEaseInOut(float k){
            if((k*=2.0)<1.0) return 0.5*k*k;
            return - 0.5*(--k * (k-2.0)-1.0);
          }
          void main(){
            vNormal=normal;
            vColor=customColor;
            float t=abs(time*2.0-1.0);
            vec3 newPosition= position + normal*time*displacement;
            gl_Position=projectionMatrix*modelViewMatrix*vec4(newPosition,1.0);

          }
        `;
        const fragmentShader = `
          varying vec3 vNormal;
          varying vec3 vColor;

          void main(){
            const float ambient=0.005;
            vec3 light=vec3(1.0);
            light=normalize(light);

            float directional =max(dot(vNormal,light),0.0);

            gl_FragColor=vec4((directional+ambient)*vColor,1.0);
            gl_FragColor.xyz=sqrt(gl_FragColor.xyz);
          }
        `;
        const shaderMaterial = new THREE.ShaderMaterial({
          uniforms: this.uniforms,
          vertexShader,
          fragmentShader
        });

        const mesh = new THREE.Mesh(textGeo, shaderMaterial);
        this.scene.add(mesh);
      }
    );
  }

  update() {
    this.renderer.render(this.scene, this.camera);

    const time = Date.now() * 0.001;
    this.uniforms.time.value = 1.0 + Math.sin(time * 0.5);
    requestAnimationFrame(this.update.bind(this));
  }
}
