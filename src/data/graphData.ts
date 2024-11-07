import { GraphData } from '../types/graph';

export const initialGraphData: GraphData = {
  nodes: [
    { id: 1, label: "Main Hub", img: "https://picsum.photos/200/200?1", size: 25, color: '#ff6b6b', group: 'hub' },
    { id: 2, label: "Data Center", img: "https://picsum.photos/200/200?2", size: 20, color: '#48dbfb', group: 'infrastructure' },
    { id: 3, label: "Network Node", img: "https://picsum.photos/200/200?3", size: 20, color: '#1dd1a1', group: 'network' },
    { id: 4, label: "Security Gate", img: "https://picsum.photos/200/200?4", size: 18, color: '#ffd93d', group: 'security' },
    { id: 5, label: "User Interface", img: "https://picsum.photos/200/200?5", size: 22, color: '#6c5ce7', group: 'frontend' },
    { id: 6, label: "Database", img: "https://picsum.photos/200/200?6", size: 23, color: '#a8e6cf', group: 'storage' },
    { id: 7, label: "API Gateway", img: "https://picsum.photos/200/200?7", size: 19, color: '#ff8b94', group: 'api' },
    { id: 8, label: "Load Balancer", img: "https://picsum.photos/200/200?8", size: 21, color: '#ffd3b6', group: 'infrastructure' },
    { id: 9, label: "Cache Server", img: "https://picsum.photos/200/200?9", size: 18, color: '#dcedc1', group: 'storage' },
    { id: 10, label: "Auth Service", img: "https://picsum.photos/200/200?10", size: 20, color: '#ff9f43', group: 'security' },
    { id: 11, label: "Message Queue", img: "https://picsum.photos/200/200?11", size: 19, color: '#0abde3', group: 'messaging' },
    { id: 12, label: "Analytics", img: "https://picsum.photos/200/200?12", size: 21, color: '#ee5253', group: 'analysis' },
    { id: 13, label: "Monitoring", img: "https://picsum.photos/200/200?13", size: 20, color: '#00d2d3', group: 'monitoring' },
    { id: 14, label: "Backup System", img: "https://picsum.photos/200/200?14", size: 18, color: '#54a0ff', group: 'storage' },
    { id: 15, label: "CDN Edge", img: "https://picsum.photos/200/200?15", size: 19, color: '#5f27cd', group: 'network' }
  ],
  links: [
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 1, target: 4 },
    { source: 2, target: 6 },
    { source: 2, target: 8 },
    { source: 3, target: 7 },
    { source: 4, target: 10 },
    { source: 5, target: 7 },
    { source: 6, target: 9 },
    { source: 7, target: 11 },
    { source: 8, target: 12 },
    { source: 9, target: 13 },
    { source: 10, target: 14 },
    { source: 11, target: 15 },
    { source: 12, target: 13 },
    { source: 13, target: 14 },
    { source: 14, target: 15 },
    { source: 15, target: 1 }
  ]
};