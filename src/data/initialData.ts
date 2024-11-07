import { GraphData } from '../types/graph';

export const initialData: GraphData = {
  nodes: [
    { id: 1, label: "Main Hub", img: "https://picsum.photos/200/200?1", size: 25, color: '#ff6b6b', group: 'hub' },
    { id: 2, label: "Data Center", img: "https://picsum.photos/200/200?2", size: 20, color: '#48dbfb', group: 'infrastructure' },
    { id: 3, label: "Network Node", img: "https://picsum.photos/200/200?3", size: 20, color: '#1dd1a1', group: 'network' },
    { id: 4, label: "Security Gate", img: "https://picsum.photos/200/200?4", size: 18, color: '#ffd93d', group: 'security' },
    { id: 5, label: "User Interface", img: "https://picsum.photos/200/200?5", size: 22, color: '#6c5ce7', group: 'frontend' }
  ],
  links: [
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 2, target: 4 },
    { source: 3, target: 5 },
    { source: 4, target: 5 }
  ]
};