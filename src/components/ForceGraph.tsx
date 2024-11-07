import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from '3d-force-graph';
import { WebGLRenderer } from 'three';
import { Controls } from './Controls';
import { createNodeObject } from '../utils/nodeCreation';
import { GraphData, NodeObject } from '../types/graph';
import { initialData } from '../data/initialData';

const ForceGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const [graphData, setGraphData] = useState<GraphData>(initialData);
  const [showLabels, setShowLabels] = useState(true);
  const [currentGeometryType, setCurrentGeometryType] = useState('sphere');
  const [orbitInterval, setOrbitInterval] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    graphRef.current = ForceGraph3D()(containerRef.current)
      .graphData(graphData)
      .nodeLabel((node: NodeObject) => showLabels ? node.label : '')
      .nodeColor((node: NodeObject) => node.color)
      .nodeVal((node: NodeObject) => node.size)
      .linkColor(() => '#ffffff')
      .linkWidth(2)
      .linkOpacity(0.5)
      .nodeThreeObject((node: NodeObject) => createNodeObject(node, currentGeometryType, showLabels));

    const renderer = graphRef.current.renderer() as WebGLRenderer;
    renderer.setSize(window.innerWidth, window.innerHeight);

    return () => {
      if (orbitInterval) {
        clearInterval(orbitInterval);
      }
      if (graphRef.current) {
        const container = containerRef.current;
        if (container) {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        }
      }
    };
  }, [graphData, showLabels, currentGeometryType]);

  const handleAddNode = () => {
    const id = graphData.nodes.length + 1;
    const newNode = {
      id,
      label: `Node ${id}`,
      img: `https://picsum.photos/200/200?${id}`,
      size: 15 + Math.random() * 10,
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      group: 'default'
    };
    
    setGraphData(prev => ({
      nodes: [...prev.nodes, newNode],
      links: prev.links
    }));
  };

  const handleRemoveNode = () => {
    const nodeId = parseInt(prompt('Enter node ID to remove:') || '0');
    if (!nodeId) return;

    setGraphData(prev => ({
      nodes: prev.nodes.filter(n => n.id !== nodeId),
      links: prev.links.filter(l => l.source !== nodeId && l.target !== nodeId)
    }));
  };

  const handleAddLink = () => {
    const source = parseInt(prompt('Enter source node ID:') || '0');
    const target = parseInt(prompt('Enter target node ID:') || '0');
    if (!source || !target) return;

    setGraphData(prev => ({
      nodes: prev.nodes,
      links: [...prev.links, { source, target }]
    }));
  };

  const handleEditNode = () => {
    const nodeId = parseInt(prompt('Enter node ID to edit:') || '0');
    if (!nodeId) return;

    const node = graphData.nodes.find(n => n.id === nodeId);
    if (!node) {
      alert('Node not found!');
      return;
    }

    const newLabel = prompt('Enter new label:', node.label);
    if (newLabel) {
      setGraphData(prev => ({
        ...prev,
        nodes: prev.nodes.map(n => 
          n.id === nodeId ? { ...n, label: newLabel } : n
        )
      }));
    }
  };

  const handleStartOrbit = () => {
    if (orbitInterval) {
      clearInterval(orbitInterval);
      setOrbitInterval(null);
    } else {
      let angle = 0;
      const interval = window.setInterval(() => {
        if (graphRef.current) {
          graphRef.current.cameraPosition({
            x: 400 * Math.cos(angle),
            y: 200,
            z: 400 * Math.sin(angle)
          });
          angle += 0.01;
        }
      }, 30);
      setOrbitInterval(interval);
    }
  };

  return (
    <div className="w-screen h-screen bg-black">
      <Controls
        onToggleLabels={() => setShowLabels(!showLabels)}
        onAddNode={handleAddNode}
        onRemoveNode={handleRemoveNode}
        onAddLink={handleAddLink}
        onStartOrbit={handleStartOrbit}
        onFocusScene={() => {
          graphRef.current?.zoomToFit(1000);
        }}
        onEditNode={handleEditNode}
        onGeometryChange={setCurrentGeometryType}
      />
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default ForceGraph;