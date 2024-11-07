import { Mesh, SphereGeometry, BoxGeometry, ConeGeometry, TorusGeometry, ShaderMaterial, TextureLoader } from 'three';
import SpriteText from 'three-spritetext';
import { NodeObject } from '../types/graph';
import { shaders } from './shaders';

export const createNodeObject = (node: NodeObject, geometryType: string, showLabels: boolean) => {
  if (!node) return null;

  let geometry;
  switch(geometryType) {
    case 'box':
      geometry = new BoxGeometry(node.size, node.size, node.size);
      break;
    case 'cone':
      geometry = new ConeGeometry(node.size/2, node.size, 32);
      break;
    case 'torus':
      geometry = new TorusGeometry(node.size/2, node.size/6, 16, 100);
      break;
    default:
      geometry = new SphereGeometry(node.size/2, 32, 32);
  }

  const shader = shaders[node.group] || shaders['default'];
  const material = new ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      texture: { value: new TextureLoader().load(node.img) }
    },
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader,
    transparent: true
  });

  const mesh = new Mesh(geometry, material);

  if (showLabels) {
    const label = new SpriteText(node.label);
    label.color = 'white';
    label.textHeight = 8;
    label.position.y = node.size + 5;
    mesh.add(label);
  }

  return mesh;
};