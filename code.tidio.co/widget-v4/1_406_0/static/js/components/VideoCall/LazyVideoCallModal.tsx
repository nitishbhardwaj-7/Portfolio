import React, { ReactElement, Suspense, useEffect, useState } from 'react';

import AsyncErrorBoundary from '../AsyncErrorBoundary';
import { useVideoCallOffer } from './VideoCallContext';

const Lazy = React.lazy(
    () => import(/* webpackChunkName: "IncomingVideoCallModal" */ './IncomingVideoCallModal'),
    // this will supress error boundary and error completely
    // TODO should we add some retry logic for async chunk?
    // .catch(() => ({ default: (): ReactElement => <></> })),
);

const LazyIncomingVideoCallModal = (): ReactElement => {
    const videoCall = useVideoCallOffer().state;
    const [isMounted, setIsMounted] = useState(Boolean(videoCall));

    const onDidCatch = (): void => {
        // TODO do we need do reset some state? or just do nothing?
        // we probably should not store this in redux so it won't get propagated to other windows
    };

    useEffect(() => {
        if (videoCall) {
            setIsMounted(true);
        }
    }, [videoCall]);
    return (
        <AsyncErrorBoundary onDidCatch={onDidCatch}>
            <Suspense fallback={null}>
                {isMounted && (
                    <Lazy
                        resetVideoCallConnectionRequest={(): void => {
                            setIsMounted(false);
                        }}
                    />
                )}
            </Suspense>
        </AsyncErrorBoundary>
    );
};

export default LazyIncomingVideoCallModal;
