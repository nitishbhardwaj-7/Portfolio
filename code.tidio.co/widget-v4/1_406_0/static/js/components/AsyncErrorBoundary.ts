import React from 'react';

import { ravenCaptureInfo } from '../helpers/raven';

class AsyncErrorBoundary extends React.Component<{
    onDidCatch: () => void;
    children: React.ReactNode;
}> {
    state = { hasError: false };

    static getDerivedStateFromError(): { hasError: true } {
        return { hasError: true };
    }

    componentDidCatch(error: Error): void {
        ravenCaptureInfo('Error while loading async chunk', { message: error.message });
        this.props.onDidCatch();
    }

    render(): null | React.ReactNode {
        if (this.state.hasError) {
            return null;
        }

        return this.props.children;
    }
}

export default AsyncErrorBoundary;
