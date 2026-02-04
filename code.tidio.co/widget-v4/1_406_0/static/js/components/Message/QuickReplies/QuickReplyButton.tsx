import React, { ReactElement, useCallback, useEffect, useRef } from 'react';

import { css } from '@emotion/react';

import useNewSkin from '../../../hooks/useNewSkin';

import { getWindowRef } from '../../../helpers/focusManager';
import { sanitizeAndEmojifyString } from '../../../helpers/ui';

import { QuickReply } from '../../../store/typings';
import { getTextStyles } from '../../../styles/text.styles';

const replyButtonStyles = css({
    '&&': {
        padding: '12px 16px !important',
        '&:hover': {
            background: 'var(--custom-action-color)',
            color: 'var(--custom-action-color-contrast)',
            textDecoration: 'none !important',
        },
    },
});

interface Props {
    quickReply: QuickReply;
    onButtonClick: (quickReply: QuickReply, metadata?: { is_ai_assistant_task?: boolean }) => void;
    metadata?: { is_ai_assistant_task?: boolean };
}

const QuickReplyButton = ({ quickReply, onButtonClick, metadata }: Props): ReactElement => {
    const wrapperRef = useRef<HTMLButtonElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const windowRef = getWindowRef();
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    const adjustButtonWidth = useCallback((): void => {
        if (wrapperRef.current && spanRef.current) {
            const buttonPadding = isNewSkin ? 38 : 34; // 2*14px (new skin 2*16px) + borders + font size fluctuations (edge case when refreshing page on slow connection)
            wrapperRef.current.style.width = `${spanRef.current.offsetWidth + buttonPadding}px`;
            spanRef.current.classList.add('line-clamp');
        }
    }, [isNewSkin]);

    useEffect(() => {
        if (windowRef) {
            windowRef.requestAnimationFrame(adjustButtonWidth);
        }
    }, [windowRef, adjustButtonWidth]);

    return (
        <button
            ref={wrapperRef}
            type="button"
            title={quickReply.title}
            onClick={(): void => {
                onButtonClick(quickReply, metadata);
            }}
            css={isNewSkin ? replyButtonStyles : undefined}
        >
            <span
                ref={spanRef}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: sanitizeAndEmojifyString(quickReply.title),
                }}
                css={textStyles.text14}
            />
        </button>
    );
};

export default QuickReplyButton;
