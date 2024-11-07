export const shaders = {
  'hub': {
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
  'default': {
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