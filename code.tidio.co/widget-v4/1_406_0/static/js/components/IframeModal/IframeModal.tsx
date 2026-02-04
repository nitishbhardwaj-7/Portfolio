import React, { Suspense } from 'react';
import Iframe from 'react-frame-component';
import { useDispatch, useSelector } from 'react-redux';

import { firefoxIframeProps } from '../../helpers';

import { setIframeModal } from '../../store/actions';
import { getIframeModalUrl } from '../../store/selectors';
import AsyncErrorBoundary from '../AsyncErrorBoundary';

const LazyIframeModalContent = React.lazy(
    () => import(/* webpackChunkName: "IframeModal" */ './IframeModalContent'),
);

const IframeModal = (): React.ReactElement | null => {
    const dispatch = useDispatch();
    const iframeModalUrl = useSelector(getIframeModalUrl);

    if (!iframeModalUrl) {
        return null;
    }

    return (
        <Iframe
            title="Tidio Chat - Iframe Modal"
            style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: '0',
                left: '0',
                zIndex: 2147483002, // close to max zIndex (2147483647)
                border: 0,
            }}
            {...firefoxIframeProps}
        >
            <AsyncErrorBoundary
                onDidCatch={(): void => {
                    dispatch(setIframeModal(null));
                }}
            >
                <Suspense fallback={null}>
                    <LazyIframeModalContent url={iframeModalUrl} />
                </Suspense>
            </AsyncErrorBoundary>
        </Iframe>
    );
};

export default IframeModal;
