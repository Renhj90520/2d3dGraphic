import * as THREE from 'three';
import MyCamera from '../mycamera';

export default class InGlow extends THREE.Object3D {
  constructor() {
    super();

    const geometry = new THREE.SphereGeometry(2.07, 20, 20);

    const camera = MyCamera.getInstance(200, 200);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { type: 'c', value: new THREE.Color(0x96ecff) },
        viewVector: { type: 'v3', value: camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector; //camera 的位置
        varying float opacity; // 透明度
        void main(){
            // 顶点法线向量
            vec3 nNormal=normalize(normal);
            vec3 nViewVec=normalize(viewVector);

            //透明度
            opacity=dot(nNormal,nViewVec);

            opacity=1.0-opacity;

            gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float opacity;
        void main(){
            gl_FragColor=vec4(glowColor, opacity);
        }
      `,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }
}
