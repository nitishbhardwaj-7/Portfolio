import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import { trans } from '../../../helpers/translations';
import { sanitizeAndEmojifyString } from '../../../helpers/ui';

import { transformToAutomaticSurveyMessage } from '../../../connection/parsers';
import { addMessage, rateSatisfactionSurvey } from '../../../store/actions';
import {
    MessageType,
    SatisfactionSurveyConfig,
    SurveyMessage,
    SurveyValues,
} from '../../../store/typings';

interface SatisfactionRateOptionsProps extends SurveyMessage {
    rateQuestion: SatisfactionSurveyConfig['rateQuestion'];
    scale: SurveyValues;
    selectedRating?: SatisfactionSurveyConfig['response']['rating'];
}

const satisfactionSurveyStyles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    maxWidth: 300,
});

const satisfactionOptions = css({
    display: 'flex',
    alignItems: 'center',
    clear: 'both',
    position: 'relative',
    gap: '8px',
    transition: 'margin 0.28s ease-in-out',
});

const selectedSatisfactionOptions = css({
    border: '1px solid var(--custom-action-color)',
    letterSpacing: '-0.01em',
});

const selectedOptionBackground = css({
    background: 'var(--custom-action-color)',
    color: 'var(--custom-action-color-contrast)',
});

const satisfactionButton = css({
    color: '#06132b',
    border: '1px solid var(--custom-action-color, #0566ff)',
    outline: 'none',
    padding: '12px',
    borderRadius: 'var(--radius-component, 12px)',
    display: 'inline-block',
    clear: 'both',
    position: 'relative',
    fontSize: 15,
    img: {
        minWidth: 18,
        minHeight: 18,
        width: 18,
        height: 18,
    },
    ':hover': {
        background: 'var(--custom-action-color)',
        color: 'var(--custom-action-color-contrast)',
    },
});

const SatisfactionRateOptions = ({
    threadSource,
    threadId,
    messageId,
    rateQuestion,
    scale,
    selectedRating,
}: SatisfactionRateOptionsProps): ReactElement => {
    const dispatch = useDispatch();

    const handleClick = (score: number): void => {
        dispatch(rateSatisfactionSurvey(score, threadSource, threadId, messageId));
        if (!selectedRating) {
            dispatch(
                addMessage(
                    transformToAutomaticSurveyMessage(
                        threadSource,
                        threadId,
                        messageId,
                        MessageType.AUTOMATIC_SURVEY_RATED,
                    ),
                ),
            );
        }
    };

    return (
        <>
            <div className="message message-operator">{rateQuestion}</div>
            <div className="message message-operator" css={satisfactionSurveyStyles}>
                <span>{trans('satisfactionSurveyRate')}</span>
                <div css={satisfactionOptions}>
                    {scale.map(({ value, rating: scoreRating }) => (
                        <button
                            type="button"
                            css={[
                                satisfactionButton,
                                selectedRating && selectedSatisfactionOptions,
                                selectedRating === scoreRating && selectedOptionBackground,
                            ]}
                            key={scoreRating}
                            onClick={(): void => {
                                handleClick(scoreRating);
                            }}
                        >
                            <span
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeAndEmojifyString(value),
                                }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SatisfactionRateOptions;
