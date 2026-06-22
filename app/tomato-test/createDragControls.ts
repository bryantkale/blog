import * as THREE from 'three';

export type TomatoDragControls = {
    dragVelocity: THREE.Vector3;
    isDragging: () => boolean;
    updateRootPosition: (root: THREE.Object3D) => void;
    dispose: () => void;
};

export function createDragControls(
    renderer: THREE.WebGLRenderer,
    camera: THREE.Camera
): TomatoDragControls {
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const targetPosition = new THREE.Vector3();
    const previousPosition = new THREE.Vector3();
    const dragVelocity = new THREE.Vector3();
    const dragPoint = new THREE.Vector3();
    let isDragging = false;

    const setPointerFromEvent = (event: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const updateDragTarget = (event: PointerEvent) => {
        setPointerFromEvent(event);
        raycaster.setFromCamera(pointer, camera);

        // Project the pointer onto the same z-plane as the tomato so dragging feels
        // like moving the object across the page instead of changing its depth.
        if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
            targetPosition.copy(dragPoint);
        }
    };

    const handlePointerDown = (event: PointerEvent) => {
        renderer.domElement.setPointerCapture(event.pointerId);
        renderer.domElement.style.cursor = 'grabbing';
        isDragging = true;
        updateDragTarget(event);
    };

    const handlePointerMove = (event: PointerEvent) => {
        if (!isDragging) {
            return;
        }

        updateDragTarget(event);
    };

    const handlePointerUp = (event: PointerEvent) => {
        if (renderer.domElement.hasPointerCapture(event.pointerId)) {
            renderer.domElement.releasePointerCapture(event.pointerId);
        }

        renderer.domElement.style.cursor = 'grab';
        isDragging = false;
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);
    renderer.domElement.addEventListener('pointercancel', handlePointerUp);

    return {
        dragVelocity,
        isDragging: () => isDragging,
        updateRootPosition: (root) => {
            previousPosition.copy(root.position);
            root.position.lerp(targetPosition, isDragging ? 0.28 : 0.08);
            dragVelocity.subVectors(root.position, previousPosition);
        },
        dispose: () => {
            renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
            renderer.domElement.removeEventListener('pointermove', handlePointerMove);
            renderer.domElement.removeEventListener('pointerup', handlePointerUp);
            renderer.domElement.removeEventListener('pointercancel', handlePointerUp);
        },
    };
}
