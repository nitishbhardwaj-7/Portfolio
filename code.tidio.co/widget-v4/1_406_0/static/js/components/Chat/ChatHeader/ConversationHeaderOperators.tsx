import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import useNewSkin from '../../../hooks/useNewSkin';
import useAssignedOperators from './useAssignedOperators';

import { getCustomAvatar, getOpenTab, getOperators } from '../../../store/selectors';
import { getTextStyles } from '../../../styles/text.styles';
import Translation from '../../Translation';
import Avatars from './Avatars';

const header = css({
    fontWeight: 600,
    margin: 0,
    display: 'inline-block',
    position: 'relative',
    maxWidth: 'calc(100% - 145px)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    verticalAlign: 'bottom',
    fontSize: 16,
    lineHeight: '19px',
    flexGrow: 1,
});

const headerText = css({
    flexGrow: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    alignItems: 'center',
    svg: {
        height: 16,
        width: 16,
    },
});

const assignedOperatorsText = css({
    display: 'block',
});

const ConversationHeaderOperators = (): ReactElement => {
    const { assignedOperatorsData, assignedOperatorsNames } = useAssignedOperators();
    const allOperators = useSelector(getOperators);
    const customAvatar = useSelector(getCustomAvatar);
    const openTab = useSelector(getOpenTab);
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    if (assignedOperatorsData.length) {
        return (
            <>
                <Avatars operators={assignedOperatorsData} openTab={openTab} />
                <h2 css={[header, textStyles.text14Medium]}>
                    {!isNewSkin && (
                        <span css={assignedOperatorsText}>
                            <Translation value="chatWith" fallback="Chat with" />{' '}
                        </span>
                    )}
                    {assignedOperatorsNames}
                </h2>
            </>
        );
    }

    if (customAvatar) {
        return (
            <div css={[headerText, textStyles.text14Medium]}>
                <Translation value="newWidgetHeaderText" fallback="&nbsp;" emojify />
            </div>
        );
    }

    return (
        <>
            <Avatars operators={allOperators} openTab={openTab} />
            <div css={[headerText, textStyles.text14Medium]}>
                <Translation value="newWidgetHeaderText" fallback="&nbsp;" emojify />
            </div>
        </>
    );
};

export default ConversationHeaderOperators;
