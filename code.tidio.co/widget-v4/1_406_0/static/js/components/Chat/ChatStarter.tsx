import React, { Fragment, ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import useNewSkin from '../../hooks/useNewSkin';

import { sendMessageFromVisitor, setOpenTab, widgetActivityTracking } from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import { ConversationStarter } from '../../store/typings';
import { getTextStyles } from '../../styles/text.styles';
import Text from '../Text/Text';
import { ChevronRight } from '../svgIcons/SvgIcons';

const borderColor = '#E2E8EF';

const buttonStyle = css({
    display: 'flex',
    paddingInline: 16,
    paddingBlock: 'var(--starter-padding-block, 16px)',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'space-between',
    width: '100%',
    background: 'transparent',
    ':hover': {
        background: 'var(--custom-action-color-hover, #EFF2F6)',
        outline: `1px solid ${borderColor}`,
    },
    ':focus': {
        outline: 'none',
    },
    svg: {
        fill: 'currentColor',
        width: 20,
        height: 20,
        flexShrink: 0,
    },
});

const divider = css({
    width: 'calc(100% - 32px)',
    borderBottom: `1px solid ${borderColor}`,
    margin: '0 16px',
});

type ChatStarterProps = {
    starter: ConversationStarter;
    shouldDisplayDivider: boolean;
};

const ChatStarter = ({ starter, shouldDisplayDivider }: ChatStarterProps): ReactElement => {
    const dispatch = useDispatch();
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    const handleSendStarter = useCallback(
        (text: string): void => {
            dispatch(sendMessageFromVisitor(text));
            dispatch(setOpenTab('conversations'));
            dispatch(widgetActivityTracking(trackingEvents.conversationStarterClicked));
        },
        [dispatch],
    );

    return (
        <Fragment key={starter.id}>
            <button
                type="button"
                key={starter.id}
                css={buttonStyle}
                onClick={(): void => handleSendStarter(starter.answer)}
            >
                <Text size={15} numberOfLines={3} css={textStyles.text14Medium}>
                    {starter.answer}
                </Text>
                <ChevronRight />
            </button>
            {shouldDisplayDivider && <div css={divider} />}
        </Fragment>
    );
};
export default ChatStarter;
