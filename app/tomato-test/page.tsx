import TomatoScene from './TomatoScene';

export default function TomatoTestPage() {
    return (
        <section className="space-y-4">
            <h1 className="text-2xl font-semibold">Tomato Test</h1>
            <p>
                A small Three.js scene rendering a stylized tomato with a stem and
                leaves.
            </p>
            <TomatoScene />
        </section>
    );
}
