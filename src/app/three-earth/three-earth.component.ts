import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
import { SpotLight } from "three";
@Component({
  selector: "app-three-earth",
  templateUrl: "./three-earth.component.html",
  styleUrls: ["./three-earth.component.css"]
})
export class ThreeEarthComponent implements OnInit {
  scene;
  renderer;
  camera;

  cameraRotation = 0;
  cameraRotationSpeed = 0.001;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addSpotLight();
    this.addEarth();
    this.addGalaxy();
    this.update();
  }

  initThree() {
    this.scene = new THREE.Scene();
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1500);
    this.camera.position.set(1, 1, 1);
  }

  addSpotLight() {
    const light = new SpotLight(0xffffff, 1, 0, 10, 2);
    light.position.set(2, 0, 1);
    this.scene.add(light);
  }

  addEarth() {
    const planet = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      bumpScale: 0.05,
      specular: new THREE.Color("grey"),
      shininess: 10
    });

    const surface = new THREE.Mesh(geometry, material);
    surface.name = "surface";
    planet.add(surface);

    planet.receiveShadow = true;
    planet.castShadow = true;
    surface.geometry.center();

    const atmosphereGeometry = new THREE.SphereGeometry(0.503, 32, 32);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.name = "atmosphere";
    planet.add(atmosphere);

    const atmosphericGlowGeometry = new THREE.SphereGeometry(0.523, 32, 32);
    const atmosphericGlowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { type: "f", value: 0.7 },
        p: { type: "f", value: 7 },
        glowColor: {
          type: "c",
          value: new THREE.Color(0x93cfef)
        },
        viewVector: {
          type: "v3",
          value: this.camera.position
        }
      },
      vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main(){
          vec3 vNormal = normalize(normalMatrix*normal);
          vec3 vNormel = normalize(normalMatrix*viewVector);
          intensity=pow(c-dot(vNormal,vNormel), p);
          gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main(){
          vec3 glow=glowColor*intensity;
          gl_FragColor=vec4(glow,1.0);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const atmosphericGlow = new THREE.Mesh(
      atmosphericGlowGeometry,
      atmosphericGlowMaterial
    );
    atmosphericGlow.name = "atmosphericGlow";
    planet.add(atmosphericGlow);

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "true";
    material.map = loader.load("assets/images/earth.jpg");
    material.bumpMap = loader.load("assets/images/earthbump.jpg");
    material.specularMap = loader.load("assets/images/earthspec.jpg");

    atmosphereMaterial.map = loader.load("assets/images/earthcloudmap.jpg");
    atmosphereMaterial.alphaMap = loader.load(
      "assets/images/earthcloudmaptrans.jpg"
    );

    this.scene.add(planet);
  }

  addGalaxy() {
    const loader = new THREE.TextureLoader();
    const galaxyGeo = new THREE.SphereGeometry(100, 32, 32);
    const galaxyMaterial = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      map: loader.load("assets/images/starfield.png")
    });
    const galaxy = new THREE.Mesh(galaxyGeo, galaxyMaterial);
    this.scene.add(galaxy);
  }

  update() {
    this.renderer.render(this.scene, this.camera);

    const earth = this.scene.getObjectByName("surface");
    const atmosphere = this.scene.getObjectByName("atmosphere");
    earth.rotation.y += (1 / 32) * 0.01;
    atmosphere.rotation.y += (1 / 16) * 0.01;
    this.cameraRotation += this.cameraRotationSpeed;
    this.camera.position.y = 0;
    this.camera.position.x = 2 * Math.sin(this.cameraRotation);
    this.camera.position.z = 2 * Math.cos(this.cameraRotation);
    this.camera.lookAt(earth.position);

    requestAnimationFrame(this.update.bind(this));
  }
}
