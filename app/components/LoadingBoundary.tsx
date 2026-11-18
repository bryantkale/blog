'use client';

import { Component, Suspense, type ErrorInfo, type ReactNode } from 'react';

type LoadingBoundaryProps = {
    children: ReactNode;
    label?: string;
};

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Content failed to load:', error, info);
    }

    render() {
        if (this.state.error) {
            return (
                <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
                    <p className="font-semibold">This content couldn’t be loaded.</p>
                    <p className="mt-1 text-sm opacity-75">
                        Check your connection and try again.
                    </p>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="mt-4 rounded-full border px-3 py-1.5 text-sm underline"
                    >
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

function LoadingPlaceholder({ label }: { label: string }) {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-busy="true"
            className="space-y-4 rounded-xl border border-black/10 bg-white/30 p-5 dark:border-white/10 dark:bg-black/10"
        >
            <span className="sr-only">Loading {label}</span>
            <div className="h-4 w-1/3 animate-pulse rounded bg-current opacity-15" />
            <div className="h-3 w-full animate-pulse rounded bg-current opacity-10" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-current opacity-10" />
        </div>
    );
}

export default function LoadingBoundary({
    children,
    label = 'content',
}: LoadingBoundaryProps) {
    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingPlaceholder label={label} />}>
                {children}
            </Suspense>
        </ErrorBoundary>
    );
}
