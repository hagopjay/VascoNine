import { Shaders } from '../types/graph';

export const shaders: Shaders = {
  hub: {
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPos;
      void main() {
        vUv = uv;
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPos;
      void main() {
        vec3 color = vec3(0.5 + 0.5 * sin(time + vPos.x),
                         0.5 + 0.5 * sin(time + vPos.y + 2.0),
                         0.5 + 0.5 * sin(time + vPos.z + 4.0));
        gl_FragColor = vec4(color, 1.0);
      }
    `
  },
  network: {
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        vec3 glow = vec3(0.0, 0.5, 1.0) * intensity * sin(time * 2.0);
        gl_FragColor = vec4(glow, 1.0);
      }
    `
  },
  storage: {
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vPosition;
      void main() {
        float intensity = abs(sin(vPosition.x * 10.0 + time));
        vec3 color = mix(vec3(0.1, 0.8, 0.2), vec3(0.2, 0.9, 0.3), intensity);
        gl_FragColor = vec4(color, 1.0);
      }
    `
  },
  default: {
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vPosition;
      void main() {
        float intensity = fract(sin(dot(vPosition.xyz ,vec3(12.9898,78.233, 37.719))) * 43758.5453);
        vec3 color = vec3(intensity);
        gl_FragColor = vec4(color, 1.0);
      }
    `
  }
};