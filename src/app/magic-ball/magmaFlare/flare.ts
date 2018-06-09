import * as THREE from 'three';

export default class Flare extends THREE.Object3D {
  private offset = new THREE.Vector2();
  private map: THREE.Texture;
  private topradius = 6;
  private bottomradius = 2;
  private diameter = this.topradius - this.bottomradius;
  private randomRatio = Math.random() + 1;
  constructor() {
    super();
    const loader = new THREE.TextureLoader();
    this.map = loader.load('assets/images/aura3_type2.png');
    this.map.wrapS = this.map.wrapT = THREE.RepeatWrapping;
    this.map.repeat.set(10, 10);

    const geometry = new THREE.CylinderGeometry(
      this.topradius,
      this.bottomradius,
      0,
      30,
      3,
      true
    );
    const material = this.createMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }
  createMaterial() {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        map: { type: 't', value: this.map },
        offset: { type: 'v2', value: this.offset },
        opacity: { type: 'f', value: 0.15 },
        innerRadius: { type: 'f', value: this.bottomradius },
        diameter: { type: 'f', value: this.diameter }
      },
      vertexShader: `
        varying vec2 vUv;
        varying float radius;
        uniform vec2 offset;

        void main(){
            vUv=uv+offset;
            radius=length(position); //中心坐标到顶点距离
            gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float opacity;
        uniform float diameter;
        uniform float innerRadius;
        varying vec2 vUv;
        varying float radius;
        const float PI =3.1415926;
        void main(){
            vec4 tColor=texture2D(map,vUv);// 从uv的位置获取texture的颜色
            float ratio=(radius-innerRadius)/diameter; // 描画位置是donut的scale map
            float opacity=opacity*sin(PI*ratio);
            vec4 baseColor=tColor+vec4(0.0,0.0,0.3,1.0);
            gl_FragColor=baseColor*vec4(1.0,1.0,1.0,opacity);
        }
      `,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true
    });
    return material;
  }

  update() {
    this.offset.x += 0.004 * this.randomRatio;
    this.offset.y -= 0.005 * this.randomRatio;
  }
}
