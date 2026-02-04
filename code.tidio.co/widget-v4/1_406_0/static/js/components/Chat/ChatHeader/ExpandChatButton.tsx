import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import { trans } from '../../../helpers/translations';

import { getIsMobile } from '../../../store/selectors';
import { CollapseIcon, ExpandIcon } from '../../svgIcons/SvgIcons';
import button from './Button';
import buttonLabel from './ButtonLabel';

const containerQuery = css`
    @media (max-height: 899px) {
        display: none !important;
    }
`;

const ExpandChatButton = ({
    chatViewRef,
}: {
    chatViewRef: React.RefObject<HTMLDivElement>;
}): ReactElement | null => {
    const isMobile = useSelector(getIsMobile);

    const [isExpanded, setIsExpanded] = useState(false);

    if (isMobile) {
        return null;
    }

    if (isExpanded) {
        return (
            <button
                type="button"
                css={[button, buttonLabel, containerQuery]}
                aria-label={trans('collapse', null, 'Collapse')}
                onClick={(): void => {
                    chatViewRef.current?.style.setProperty('height', '700px');
                    setIsExpanded(false);
                }}
            >
                <CollapseIcon />
                <span>{trans('collapse', null, 'Collapse')}</span>
            </button>
        );
    }

    return (
        <button
            type="button"
            css={[button, buttonLabel, containerQuery]}
            aria-label={trans('expand', null, 'Expand')}
            onClick={(): void => {
                chatViewRef.current?.style.setProperty('height', '100%');
                setIsExpanded(true);
            }}
        >
            <ExpandIcon />
            <span>{trans('expand', null, 'Expand')}</span>
        </button>
    );
};

export default ExpandChatButton;
