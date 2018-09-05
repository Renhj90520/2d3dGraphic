import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
import { ThrowStmt } from "@angular/compiler";
@Component({
  selector: "app-three-fire",
  templateUrl: "./three-fire.component.html",
  styleUrls: ["./three-fire.component.css"]
})
export class ThreeFireComponent implements OnInit {
  scene;
  camera;
  renderer;
  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() }
  };
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addMesh();
    this.update();
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();

    this.camera = new THREE.Camera();
    this.camera.position.z = 1;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);
    this.uniforms.u_resolution.value.x = width;
    this.uniforms.u_resolution.value.y = height;
  }

  addMesh() {
    const geometry = new THREE.PlaneBufferGeometry(2, 2);
    const vertexShader = `
      void main(){
        gl_Position=vec4(position,1.0);
      }
    `;
    const fragmentShader = `
      uniform vec2 u_resolution;
      uniform float u_time;
      float noise(vec3 p){
        vec3 i=floor(p);
        vec4 a=dot(i,vec3(1.,57.,21.))+vec4(0.,57.,21.,78.);
        vec3 f=cos((p-i)*acos(-1.))*(-.5)+.5;
        a=mix(sin(cos(a)*a),sin(cos(1.+a)*(1.+a)),f.x);
        a.xy=mix(a.xz,a.yw,f.y);
        return mix(a.x,a.y,f.z);
      }
      float sphere(vec3 p, vec4 spr){
        return length(spr.xyz-p) - spr.w;
      }

      float flame(vec3 p){
        float d = sphere(p*vec3(1.,.5,1.), vec4(.0,-1.,.0,1.));
        return d+(noise(p+vec3(.0,u_time*2.,.0))+noise(p*3.)*.5)*.25*(p.y);
      }

      float scene(vec3 p){
        return min(100.-length(p), abs(flame(p)));
      }

      vec4 raymarch(vec3 org, vec3 dir){
        float d=0.0, glow=0.0, eps=0.02;
        vec3 p=org;
        bool glowed =false;

        for(int i=0; i<64; i++){
          d=scene(p)+eps;
          p+=d*dir;
          if(d>eps){
            if(flame(p)<.0){
              glowed=true;
            }
            if(glowed){
              glow=float(i)/64.;
            }
          }
        }
        return vec4(p,glow);
      }
      void main(){
        vec2 v=-1.0+2.0*gl_FragCoord.xy/u_resolution.xy;

        v.x*=u_resolution.x/u_resolution.y;

        vec3 org=vec3(0.,-2.,4.);
        vec3 dir=normalize(vec3(v.x*1.6, -v.y, -1.5));

        vec4 p=raymarch(org, dir);
        float glow=p.w;
        vec4 col= mix(vec4(1.,.5,.1,1.), vec4(0.1,.5,1.,1.), p.y*.02+.4);

        gl_FragColor=mix(vec4(0.), col, pow(glow*2.,4.));


      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader
    });

    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
    this.uniforms.u_time.value += 0.05;
    requestAnimationFrame(this.update.bind(this));
  }
}
