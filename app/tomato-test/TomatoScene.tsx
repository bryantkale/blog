'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createDragControls } from './createDragControls';
import { createTomatoModel } from './createTomatoModel';

function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    // The canvas itself is the drag handle for the tomato.
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'none';

    return renderer;
}

function addSceneLighting(scene: THREE.Scene) {
    const keyLight = new THREE.DirectionalLight('#ffffff', 3);
    keyLight.position.set(3, 4, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight('#fff7ef', '#7a1d1a', 1.8);
    scene.add(fillLight);
}

function createGroundShadow() {
    const ground = new THREE.Mesh(
        new THREE.CircleGeometry(1.8, 64),
        new THREE.MeshBasicMaterial({
            color: '#331b1c',
            transparent: true,
            opacity: 0.08,
        })
    );

    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.05;

    return ground;
}

export default function TomatoScene() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        // Scene setup stays here; tomato geometry and pointer math live in helpers.
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#ffe9e9');

        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 0.25, 4);

        const renderer = createRenderer();
        container.appendChild(renderer.domElement);

        const tomatoModel = createTomatoModel();
        scene.add(tomatoModel.root);
        addSceneLighting(scene);

        const ground = createGroundShadow();
        scene.add(ground);

        const dragControls = createDragControls(renderer, camera);

        const resize = () => {
            const size = Math.min(container.clientWidth, 520);
            renderer.setSize(size, size);
            camera.aspect = 1;
            camera.updateProjectionMatrix();
        };

        resize();
        window.addEventListener('resize', resize);

        let animationFrameId = 0;
        let lastTime = performance.now();

        const animate = (time: number) => {
            const dt = Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;

            // Drag controls move the root; Wiggle adds the springy follow-through.
            dragControls.updateRootPosition(tomatoModel.root);
            tomatoModel.updateWiggle(dragControls.dragVelocity, dt);

            tomatoModel.tomato.rotation.y += dragControls.isDragging()
                ? 0.018
                : 0.008;
            tomatoModel.tomato.rotation.x = Math.sin(time * 0.001) * 0.04;

            renderer.render(scene, camera);
            animationFrameId = window.requestAnimationFrame(animate);
        };

        animationFrameId = window.requestAnimationFrame(animate);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            dragControls.dispose();
            tomatoModel.dispose();
            ground.geometry.dispose();
            (ground.material as THREE.Material).dispose();
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            aria-label="Draggable Three.js tomato render"
            className="flex min-h-[320px] w-full items-center justify-center rounded-[8px] bg-[#ffe9e9]"
        />
    );
}
