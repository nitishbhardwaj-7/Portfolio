import React, { ReactElement } from 'react';

import { css } from '@emotion/react';

import useNewSkin from '../../../hooks/useNewSkin';

import { SatisfactionSurveyConfig, SurveyMessage } from '../../../store/typings';
import SatisfactionCommentInput from './SatisfactionCommentInput';

const rateCommentStyles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
});

const paddingStyles = css({
    padding: '16px',
});

interface SatisfactionRateCommentProps extends SurveyMessage {
    commentQuestion: SatisfactionSurveyConfig['commentQuestion'];
    comment: SatisfactionSurveyConfig['response']['comment'];
}

const SatisfactionRateComment = ({
    threadSource,
    threadId,
    messageId,
    commentQuestion,
    comment,
}: SatisfactionRateCommentProps): ReactElement => {
    const { isNewSkin } = useNewSkin();
    return (
        <div className="message message-operator" css={!isNewSkin && paddingStyles}>
            <div css={rateCommentStyles}>
                <span>{commentQuestion}</span>
                <SatisfactionCommentInput
                    threadSource={threadSource}
                    threadId={threadId}
                    messageId={messageId}
                    comment={comment}
                />
            </div>
        </div>
    );
};

export default SatisfactionRateComment;
