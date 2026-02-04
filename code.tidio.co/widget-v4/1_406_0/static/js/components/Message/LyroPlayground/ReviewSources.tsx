import React, { ReactNode, memo, useCallback, useEffect, useRef } from 'react';

import { trans } from '../../../helpers/translations';

import { CustomWindow, Message } from '../../../store/typings';
import { EyeIcon, StarsIcon } from '../../svgIcons/SvgIcons';
import { buttonStyles, containerStyle } from './LyroPlayground.styles';

export interface ReviewSourcesProps {
    questionMessageId: number;
    messageId: Message['idFromServer'];
    aiAssistantActionLogId?: Message['aiAssistantActionLogId'];
}

declare let window: CustomWindow;

const ReviewSources = ({
    questionMessageId,
    messageId,
    aiAssistantActionLogId,
}: ReviewSourcesProps): ReactNode => {
    const timestampRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        window.tidioChatApi?.trigger('reviewSourcesDisplayed');
    }, []);

    const handleOnClick = useCallback((): void => {
        window.tidioChatApi?.trigger('reviewSourcesClicked', {
            questionMessageId,
            messageId,
            aiAssistantActionLogId,
        });
    }, [questionMessageId, messageId, aiAssistantActionLogId]);

    useEffect(() => {
        // We use lazy loading for this component, so we need additional scroll after component is actually loaded.
        // Also, there is a lot of scrolling happening in widget which sometimes make this scroll run too soon, hence timeout
        timeoutRef.current = setTimeout(() => {
            timestampRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
        }, 150);

        return (): void => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="message message-operator timestamp-visible" css={containerStyle}>
            <StarsIcon />
            <div>
                <p>
                    {trans(
                        'reviewSourcesDescription',
                        null,
                        'AI response based on your data sources.',
                    )}
                </p>
                <button css={buttonStyles} type="button" onClick={handleOnClick}>
                    {trans('reviewSources', null, 'Review sources')}
                </button>
            </div>
            <div className="messageTimestamp" ref={timestampRef}>
                <EyeIcon />
                {trans('onlyVisibleToYou', null, 'Only visible to you')}
            </div>
        </div>
    );
};

export default memo(ReviewSources);
