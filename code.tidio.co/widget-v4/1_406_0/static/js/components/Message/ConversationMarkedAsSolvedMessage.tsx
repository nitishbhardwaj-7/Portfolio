import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import { getAssignedOperatorsData } from '../../store/selectors';
import Translation from '../Translation';
import { SuccessOutlineIcon } from '../svgIcons/SvgIcons';
import { ConversationMarkedAsSolvedMessage as ConversationMarkedAsSolvedMessageType } from './types';

type ConversationMarkedAsSolvedMessageProps = ConversationMarkedAsSolvedMessageType;

const conversationSolvedMessageStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #647491;
    margin: auto;
    text-align: center;
    padding-top: 24px;

    p {
        margin: 6px 0;
    }
`;

const ConversationMarkedAsSolvedMessage = ({
    operator_id,
}: ConversationMarkedAsSolvedMessageProps): ReactElement | null => {
    const assignedOperatorsData = useSelector(getAssignedOperatorsData);
    const conversationOperator = assignedOperatorsData.find(
        (operator) => operator.id === operator_id,
    );

    return (
        <div className="message" css={conversationSolvedMessageStyles}>
            <SuccessOutlineIcon />
            <p>
                {conversationOperator ? (
                    <Translation
                        value="operatorMarkedConversationAsSolved"
                        replacements={{ '{operatorName}': conversationOperator.name }}
                        fallback="{operatorName} marked the conversation as solved"
                    />
                ) : (
                    <Translation
                        value="conversationWasMarkedAsSolved"
                        fallback="The conversation was marked as solved"
                    />
                )}
            </p>
        </div>
    );
};

export default ConversationMarkedAsSolvedMessage;
