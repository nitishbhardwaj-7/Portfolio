import React, { ReactElement, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setIframeModal } from '../../store/actions';
import { DefaultRootState } from '../../store/typings';
import AsyncErrorBoundary from '../AsyncErrorBoundary';

const LazyShadowRootIframeModalContent = React.lazy(
    () => import(/* webpackChunkName: "IframeModal" */ './ShadowRootIframeModalContent'),
);

const IframePlaceholder = (): ReactElement => <div />;

type ShadowRootIframeModalProps = {
    shadowRoot?: ShadowRoot | null;
};

const ShadowRootIframeModal = ({ shadowRoot }: ShadowRootIframeModalProps): ReactElement | null => {
    const dispatch = useDispatch();
    const iframeModalUrl = useSelector((state: DefaultRootState) => state.iframeModalUrl);

    const shouldShow = typeof iframeModalUrl === 'string' && iframeModalUrl !== '';

    if (!shouldShow || !shadowRoot) {
        return null;
    }

    return createPortal(
        <AsyncErrorBoundary
            onDidCatch={(): void => {
                dispatch(setIframeModal(null));
            }}
        >
            <Suspense fallback={<IframePlaceholder />}>
                <LazyShadowRootIframeModalContent url={iframeModalUrl} shadowRoot={shadowRoot} />
            </Suspense>
        </AsyncErrorBoundary>,
        shadowRoot,
    );
};

export default ShadowRootIframeModal;
