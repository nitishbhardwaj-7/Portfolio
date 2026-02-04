import React, { ReactElement, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { closeImagePopup } from '../../store/actions';
import { DefaultRootState } from '../../store/typings';
import AsyncErrorBoundary from '../AsyncErrorBoundary';

const LazyShadowRootImage = React.lazy(
    () => import(/* webpackChunkName: "Image" */ './ShadowRootImage'),
);

const ImagePlaceholder = (): ReactElement => <div />;

type ShadowRootImagePopupProps = {
    shadowRoot?: ShadowRoot | null;
};

const ShadowRootImagePopup = ({ shadowRoot }: ShadowRootImagePopupProps): ReactElement | null => {
    const dispatch = useDispatch();
    const popupImageSrc = useSelector((state: DefaultRootState) => state.popupImageSrc);

    const shouldShow = typeof popupImageSrc === 'string' && popupImageSrc !== '';

    if (!shouldShow || !shadowRoot) {
        return null;
    }

    return createPortal(
        <AsyncErrorBoundary
            onDidCatch={(): void => {
                dispatch(closeImagePopup());
            }}
        >
            <Suspense fallback={<ImagePlaceholder />}>
                <LazyShadowRootImage imageSrc={popupImageSrc} shadowRoot={shadowRoot} />
            </Suspense>
        </AsyncErrorBoundary>,
        shadowRoot,
    );
};

export default ShadowRootImagePopup;
