import React, { ReactElement } from 'react';

import { css } from '@emotion/react';

import { trans } from '../../../helpers/translations';

import { SatisfactionSurveyConfig } from '../../../store/typings';

const commentedStyles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
});

const commentStyles = css({
    color: '#647491',
});

const getRateEmoji = (rate: SatisfactionSurveyConfig['response']['rating']): string => {
    switch (rate) {
        case 1:
            return '😡';
        case 2:
            return '☹️';
        case 3:
            return '😐';
        case 4:
            return '😀';
        case 5:
            return '😍';
        default:
            return '';
    }
};

type SatisfactionSurveyCommentedProps = {
    rate: SatisfactionSurveyConfig['response']['rating'];
    comment: SatisfactionSurveyConfig['response']['comment'];
};

const SatisfactionSurveyCommented = ({
    rate,
    comment,
}: SatisfactionSurveyCommentedProps): ReactElement => (
    <div className="message message-operator" css={commentedStyles}>
        <span>
            {trans('satisfactionSurveyCommented')} {getRateEmoji(rate)}
        </span>
        <span css={commentStyles}>{comment || trans('satisfactionSurveyThanks')}</span>
    </div>
);

export default SatisfactionSurveyCommented;
