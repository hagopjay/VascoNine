import { Object3D } from 'three';

export interface Node {
  id: number;
  label: string;
  img: string;
  size: number;
  color: string;
  group: string;
}

export interface Link {
  source: number;
  target: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface NodeObject extends Node {
  x?: number;
  y?: number;
  z?: number;
  __threeObj?: Object3D;
}