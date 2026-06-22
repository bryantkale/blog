import * as THREE from 'three';
import { WiggleBone } from 'wiggle/spring';

type TomatoMaterials = {
    body: THREE.MeshStandardMaterial;
    lobe: THREE.MeshStandardMaterial;
    leaf: THREE.MeshStandardMaterial;
    stem: THREE.MeshStandardMaterial;
};

export type TomatoModel = {
    root: THREE.Group;
    tomato: THREE.Group;
    updateWiggle: (dragVelocity: THREE.Vector3, dt: number) => void;
    dispose: () => void;
};

function createMaterials(): TomatoMaterials {
    return {
        body: new THREE.MeshStandardMaterial({
            color: '#d9251d',
            roughness: 0.42,
            metalness: 0.03,
        }),
        lobe: new THREE.MeshStandardMaterial({
            color: '#bf1f18',
            roughness: 0.5,
        }),
        leaf: new THREE.MeshStandardMaterial({
            color: '#2f7d32',
            roughness: 0.75,
        }),
        stem: new THREE.MeshStandardMaterial({
            color: '#315d28',
            roughness: 0.8,
        }),
    };
}

function createLeaf(angle: number, material: THREE.Material) {
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.42, 4), material);

    leaf.position.set(Math.cos(angle) * 0.18, 0.78, Math.sin(angle) * 0.18);
    leaf.rotation.set(Math.PI / 2.7, 0, -angle);
    leaf.scale.set(1, 0.65, 1);

    return leaf;
}

function addTomatoBody(tomato: THREE.Group, materials: TomatoMaterials) {
    const body = new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        materials.body
    );

    body.scale.set(1.12, 0.92, 1.05);
    body.castShadow = true;
    body.receiveShadow = true;
    tomato.add(body);
}

function addTomatoLobes(tomato: THREE.Group, material: THREE.Material) {
    for (let i = 0; i < 6; i += 1) {
        const angle = (i / 6) * Math.PI * 2;
        const groove = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 24), material);

        groove.position.set(Math.cos(angle) * 0.82, 0.02, Math.sin(angle) * 0.82);
        groove.scale.set(0.45, 2.5, 0.2);
        groove.rotation.y = -angle;
        tomato.add(groove);
    }
}

function addStemAndLeaves(tomato: THREE.Group, materials: TomatoMaterials) {
    const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.1, 0.45, 16),
        materials.stem
    );

    stem.position.y = 0.98;
    stem.rotation.z = -0.24;
    stem.castShadow = true;
    tomato.add(stem);

    for (let i = 0; i < 7; i += 1) {
        tomato.add(createLeaf((i / 7) * Math.PI * 2, materials.leaf));
    }
}

export function createTomatoModel(): TomatoModel {
    const materials = createMaterials();
    const root = new THREE.Group();

    // Wiggle works by taking control of a Bone, so the tomato hangs from a tiny
    // bone hierarchy instead of being attached directly to the scene.
    const rootBone = new THREE.Bone();
    const wiggleBone = new THREE.Bone();
    wiggleBone.position.y = 0.28;
    rootBone.add(wiggleBone);
    root.add(rootBone);

    const tomato = new THREE.Group();
    tomato.position.y = -0.28;
    wiggleBone.add(tomato);

    const wiggleSpring = new WiggleBone(wiggleBone, {
        stiffness: 380,
        damping: 12,
    });

    addTomatoBody(tomato, materials);
    addTomatoLobes(tomato, materials.lobe);
    addStemAndLeaves(tomato, materials);

    return {
        root,
        tomato,
        updateWiggle: (dragVelocity, dt) => {
            // Lean the controlled bone opposite the drag direction, then let Wiggle
            // spring it back toward its original transform.
            wiggleBone.rotation.z = THREE.MathUtils.clamp(
                dragVelocity.x * -3,
                -0.45,
                0.45
            );
            wiggleBone.rotation.x = THREE.MathUtils.clamp(
                dragVelocity.y * 3,
                -0.35,
                0.35
            );
            wiggleSpring.update(dt);
        },
        dispose: () => {
            wiggleSpring.dispose();
            materials.body.dispose();
            materials.lobe.dispose();
            materials.leaf.dispose();
            materials.stem.dispose();
        },
    };
}
