import React, { ReactElement } from 'react';

import { EmojiData } from 'emoji-mart';

import AsyncErrorBoundary from '../AsyncErrorBoundary';

const Placeholder = (): ReactElement => (
    <div className="emoji-wrapper">
        <div className="emoji-mart" />
    </div>
);

const EmojiPicker = React.lazy(() => import(/* webpackChunkName: "EmojiPicker" */ './EmojiPicker'));

type LazyEmojiPickerProps = {
    onEmojiClick: (emoji: EmojiData) => void;
    handleEmojiPanel: () => void;
    isMobile: boolean;
};

const LazyEmojiPicker = (props: LazyEmojiPickerProps): ReactElement => (
    <AsyncErrorBoundary onDidCatch={props.handleEmojiPanel}>
        <React.Suspense fallback={<Placeholder />}>
            <EmojiPicker onEmojiClick={props.onEmojiClick} isMobile={props.isMobile} />
        </React.Suspense>
    </AsyncErrorBoundary>
);

export default LazyEmojiPicker;
