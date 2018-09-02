import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
@Component({
  selector: "app-three-area-light",
  templateUrl: "./three-area-light.component.html",
  styleUrls: ["./three-area-light.component.css"]
})
export class ThreeAreaLightComponent implements OnInit {
  scene;
  camera;
  renderer;
  areaLight;
  material;
  mesh;
  t = 0;
  delta = 0.004;
  uniforms = {
    color: { type: "c", value: new THREE.Color(0xaaaadd) },
    lightColor: { type: "c", value: new THREE.Color(0xffffff) },
    lightIntensity: { type: "f", value: 1 },
    lightverts: { type: "v3v", value: null },
    lightMatrixWorld: { type: "m4", value: null }
  };
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addAreaLight();
    this.update();
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.physicallyBasdShading = true;
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
    this.camera.position.set(150, 50, 150);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  addAreaLight() {
    const geometry = new THREE.PlaneGeometry(100, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
      side: THREE.FrontSide
    });

    this.areaLight = new THREE.Mesh(geometry, material);
    this.areaLight.position.set(0, 25, -25);
    this.areaLight.rotation.set(0, 0, 0);
    this.areaLight.scale.set(1, 1, 1);

    this.scene.add(this.areaLight);

    this.areaLight.add(
      new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ wireframe: true }))
    );

    const vertices = this.areaLight.geometry.vertices;
    const verts = [];
    verts.push(vertices[0]);
    verts.push(vertices[1]);
    verts.push(vertices[3]); // swap 2 & 3; must be in clockwise order; they are not
    verts.push(vertices[2]);

    this.uniforms.lightverts.value = verts;
    this.uniforms.lightMatrixWorld.value = this.areaLight.matrixWorld;

    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main(){
        vec4 mvPosition=modelViewMatrix*vec4(position,1.0);
        vNormal=normalize(normalMatrix*normal);
        vViewPosition=-mvPosition.xyz;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
      }
    `;
    const fragmentShader = `
      #define NVERTS 4
      uniform vec3 color;
      uniform vec3 lightColor;
      uniform float lightIntensity;
      uniform vec3 lightverts[NVERTS];
      uniform mat4 lightMatrixWorld;

      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main(){
        vec3 normal=normalize(vNormal);
        vec4 lPosition[NVERTS];
        vec3 lVector[NVERTS];

        // stub in some ambient reflectance
        vec3 ambient=color*vec3(0.2);

        //direction vectors from point to area light corners
        for(int i=0;i<NVERTS;i++){
          lPosition[i]=viewMatrix*lightMatrixWorld*vec4(lightverts[i],1.0);
          lVector[i]=normalize(lPosition[i].xyz+vViewPosition.xyz);// dir from vertex to areaLight
        }

        float tmp=dot(lVector[0],cross((lPosition[2]-lPosition[0]).xyz,(lPosition[1]-lPosition[0]).xyz));
        if(tmp>0.0){
          gl_FragColor=vec4(ambient,1.0);
          return;
        }

        vec3 lightVec=vec3(0.0);
        for(int i=0;i<NVERTS;i++){
          vec3 v0=lVector[i];
          vec3 v1=lVector[int(mod(float(i+1),float(NVERTS)))];

          lightVec+=acos(dot(v0,v1))*normalize(cross(v0,v1));
        }

        float factor=max(dot(lightVec,normal),0.0)/(2.0*3.14159265);

        vec3 diffuse=color*lightColor*lightIntensity*factor;
        gl_FragColor=vec4(ambient+diffuse,1.0);
      }
    `;
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader
    });

    const bufferGeo = new THREE.PlaneBufferGeometry(200, 200);
    bufferGeo.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    const shaderMesh = new THREE.Mesh(bufferGeo, shaderMaterial);
    shaderMesh.position.y = -0.1;
    this.scene.add(shaderMesh);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
    this.areaLight.position.set(
      0,
      25 + 25 * Math.sin(this.t),
      Math.min(-25 * Math.cos(this.t), 0)
    );
    this.areaLight.rotation.set(Math.min(this.t, Math.PI / 2), 0, 0);
    this.t += this.delta;
    if (this.t > 4.4 || this.t < 0) this.delta = -this.delta;
    requestAnimationFrame(this.update.bind(this));
  }
}
