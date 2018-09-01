import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-three-voronoi-zoom",
  templateUrl: "./three-voronoi-zoom.component.html",
  styleUrls: ["./three-voronoi-zoom.component.css"]
})
export class ThreeVoronoiZoomComponent implements OnInit {
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
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.uniforms.u_resolution.value.x = this.renderer.domElement.width;
    this.uniforms.u_resolution.value.y = this.renderer.domElement.height;
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
      uniform vec3 u_colors[5];
      const float multiplier=0.7;
      const float zoomSpeed=8.0;
      const int layers=6;

      const float seed=86135.7315468;
      float random2d(vec2 uv){
        return fract(sin(dot(uv.xy,vec2(12.9898,78.233)))*seed);
      }
      mat2 rotate2d(float _angle){
        return mat2(cos(_angle),sin(_angle),
                    -sin(_angle),cos(_angle));
      }
      vec2 random2( vec2 p ) {
        return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
      }

      vec3 voronoi(in vec2 x, inout vec2 nearest_point, inout vec2 s_nearest_point, inout float s_nearest_distance, inout float nearest_distance){
        vec2 n=floor(x);
        vec2 f=fract(x);

        // first pass: regular voronoi
        vec2 mg, mr;
        float md=8.0;
        float smd=8.0;
        for(int j=-1;j<=1;j++){
          for(int i=-1; i<=1;i++){
            vec2 g=vec2(float(i),float(j));
            vec2 o=random2(n+g);

            vec2 r=g+o-f;
            float d=dot(r,r);
            if(d<md){
              smd=md;
              s_nearest_distance=md;
              nearest_distance=d;
              md=d;
              mr=r;
              mg=g;
              nearest_point=r;
            }else if(smd>d){
              s_nearest_distance=d;
              nearest_distance=d;
              smd=d;
              s_nearest_point=r;
            }
          }
        }

        // second passs： distance to border
        for(int j=-2;j<=2;j++){
          for(int i=-2;i<=2;i++){
            vec2 g=mg+vec2(float(i),float(j));
            vec2 o=random2(n+g);

            vec2 r=g+o-f;
            if(dot(mr-r,mr-r)>0.00001){
              md=min(md,dot(0.5*(mr+r),normalize(r-mr)));
            }
          }
        }
        return vec3(md,mr);
      }
      vec3 getColor(vec2 nearest_point, vec2 s_nearest_point, float modMultiplier){
        return vec3(0.);
      }
      vec3 render(vec2 uv){
        vec3 color=vec3(0.5);
        // Voronoi
        vec2 nearest_point=vec2(0.,0.);
        vec2 s_nearest_point=vec2(0.,0.);
        float s_nearest_distance=0.;
        float nearest_distance=0.;
        vec3 c =voronoi(uv, nearest_point, s_nearest_point, s_nearest_distance,nearest_distance);

        // color
        color=getColor(nearest_point, s_nearest_point, 10.);
        color.r=abs(1.-length(nearest_point));

        // borders
        vec3 border=vec3(-4.);
        color=mix(border, color, smoothstep(-.1,0.03,c.x));

        return color;
      }

      vec3 renderLayer(int layer, int layers, vec2 uv, inout float opacity){
        // Scale
        // Generating a scale value between zero and 1 based on a mod of u_time
        // A frequency of 10 dixided by the layer index (10/layers*layer)

        float scale=mod((u_time+zoomSpeed/float(layers)*float(layer))/zoomSpeed,-1.);
        uv*=15.;
        uv*=scale;
        uv=rotate2d(u_time/10.)*uv;
        uv+=vec2(1000.)*float(layer);

        //render
        vec3 pass=render(uv*multiplier);

        // this is the opacity of the layer fading in from the 'bottom
        opacity=1.+scale;
        float _opacity=opacity;

        // this is the opacity of the layer fading out at the top (we want this minimal, hence the smoothstep)
        float endOpacity=smoothstep(0.,0.2,scale*-1.);
        opacity+=endOpacity;

        return pass*_opacity*endOpacity;
      }
      void main(){
        vec2 uv=(gl_FragCoord.xy-0.5*u_resolution.xy);

        if(u_resolution.y<u_resolution.x){
          uv/=u_resolution.y;
        }else{
          uv/=u_resolution.x;
        }

        uv.x+=sin(u_time/10.)*.5;
        vec3 color=vec3(0.);
        float opacity=1.;
        float opacity_sum=1.;
        for(int i=1; i<layers;i++){
          color+=renderLayer(i,layers,uv,opacity);
          opacity_sum+=opacity;
        }

        color/=opacity_sum;

        gl_FragColor= vec4(color*5.,1.0);
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
