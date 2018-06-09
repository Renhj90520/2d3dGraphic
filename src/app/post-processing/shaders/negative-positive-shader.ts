import { IShader, IShaderUniforms } from './IShader';

export default class NegativePositiveShader implements IShader {
  vertexShader = `
    varying vec2 vUv;
    void main(){
        vUv=uv;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
    }
  `;
  uniforms: { [key: string]: IShaderUniforms } = {
    tDiffuse: { type: 't', value: null }
  };
  fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    void main(){
        vec4 color=texture2D(tDiffuse, vUv);
        gl_FragColor=vev4(1.0-color.r,1.0-color.g,1.0-color.z);
    }
  `;
}
