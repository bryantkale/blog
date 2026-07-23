'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createRecord() {
  const record = new THREE.Group();

  const vinyl = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1,),
    new THREE.MeshStandardMaterial({
      color: '#101010',
      roughness: 0.35,
      metalness: 0.25,
    })
  );
  vinyl.rotation.x = Math.PI / 2;

  record.add(vinyl);

  const grooveMaterial = new THREE.MeshBasicMaterial({
    color: '#9a9a9a',
    transparent: true,
    opacity: 0.9,
  });

  for (let radius = 0.35; radius <= 1.04; radius += 0.14) {
    const groove = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.006, 8, 96),
      grooveMaterial
    );
    groove.rotation.x = Math.PI / 5;
    record.add(groove);
  }

  // const spinMarker = new THREE.Mesh(
  //   new THREE.BoxGeometry(0.62, 0.018, 0.018),
  //   new THREE.MeshBasicMaterial({
  //     color: 'pink',
  //     transparent: true,
  //     opacity: 0.85,
  //   })
  // );
  // spinMarker.position.set(0.62, 0, 0.06);
  // spinMarker.rotation.z = 0.35;
  // record.add(spinMarker);

  const label = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.09, 64),
    new THREE.MeshStandardMaterial({
      color: '#FFE9E9',
      roughness: 0.6,
    })
  );
  label.rotation.x = Math.PI / 2;
  label.position.z = 0.01;
  record.add(label);

  const centerHole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.1, 32),
    new THREE.MeshStandardMaterial({ color: '#331B1C' })
  );
  centerHole.rotation.x = Math.PI / 2;
  centerHole.position.z = 0.02;
  record.add(centerHole);

  record.rotation.x = -0.55;
  record.rotation.z = -0.25;

  return {
    record,
    materials: [
      vinyl.material,
      grooveMaterial,
      // spinMarker.material,
      label.material,
      centerHole.material,
    ],
  };
}

export default function SpinningVinyl() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const { record, materials } = createRecord();
    scene.add(record);

    const keyLight = new THREE.DirectionalLight('#ffffff', 2.4);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);
    scene.add(new THREE.AmbientLight('#ffffff', 1.1));

    const resize = () => {
      const size = Math.min(container.clientWidth || 160, 180);
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener('resize', resize);

    let animationFrameId = 0;

    const animate = () => {
      record.rotation.y += 0.035;
      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      materials.forEach((material) => material.dispose());
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Spinning Three.js vinyl record"
      className="pointer-events-none h-28 w-28 sm:h-36 sm:w-36"
    />
  );
}
