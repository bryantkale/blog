declare module 'wiggle/spring' {
    import type { Bone } from 'three';

    export class WiggleBone {
        constructor(
            target: Bone,
            options?: {
                stiffness?: number;
                damping?: number;
            }
        );

        reset(): void;
        update(dt?: number): void;
        dispose(): void;
    }
}
