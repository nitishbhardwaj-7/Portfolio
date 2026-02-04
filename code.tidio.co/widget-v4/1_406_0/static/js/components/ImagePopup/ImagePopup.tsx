import React, { Suspense } from 'react';
import Iframe from 'react-frame-component';
import { useDispatch, useSelector } from 'react-redux';

import { firefoxIframeProps } from '../../helpers';

import { closeImagePopup } from '../../store/actions';
import { DefaultRootState } from '../../store/typings';
import AsyncErrorBoundary from '../AsyncErrorBoundary';

const LazyImage = React.lazy(() => import(/* webpackChunkName: "Image" */ './Image'));
const ImagePlaceholder = (): React.ReactElement => <div />;

const ImagePopup = (): React.ReactElement | null => {
    const dispatch = useDispatch();
    const popupImageSrc = useSelector((state: DefaultRootState) => state.popupImageSrc);

    const shouldShow = typeof popupImageSrc === 'string' && popupImageSrc !== '';

    if (!shouldShow) {
        return null;
    }

    return (
        <Iframe
            title="Tidio Chat - Image Popup"
            style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: '0',
                left: '0',
                zIndex: 2147483003,
                border: 0,
            }}
            id="tidio-chat-image-popup"
            {...firefoxIframeProps}
        >
            <AsyncErrorBoundary
                onDidCatch={(): void => {
                    dispatch(closeImagePopup());
                }}
            >
                <Suspense fallback={<ImagePlaceholder />}>
                    <LazyImage imageSrc={popupImageSrc} />
                </Suspense>
            </AsyncErrorBoundary>
        </Iframe>
    );
};

export default ImagePopup;
