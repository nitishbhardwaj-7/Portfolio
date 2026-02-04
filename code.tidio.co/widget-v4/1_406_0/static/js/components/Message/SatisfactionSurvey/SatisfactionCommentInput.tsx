import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import useNewSkin from '../../../hooks/useNewSkin';

import { focusNewMessageTextarea } from '../../../helpers/focusManager';

import { transformToAutomaticSurveyMessage } from '../../../connection/parsers';
import { addMessage, commentSatisfactionSurvey } from '../../../store/actions';
import { MessageType, SatisfactionSurveyConfig, SurveyMessage } from '../../../store/typings';
import { SendIcon } from '../../svgIcons/SvgIcons';
import InputWithValidation from '../InputWithValidation';

const inputWithButtonStyles = css({
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    borderRadius: 'var(--radius-component, 6px)',
    background: 'white',
    padding: '12px 16px',

    textarea: {
        height: '74px',
        fontSize: '14px',
        lineHeight: '18px',
        padding: 0,
        '::placeholder': {
            color: '#647491',
        },
    },
});

const borderStyles = css({
    border: '1px solid var(--border-color, #D3DBE5)',
});

const buttonStyles = css({
    outline: 'none',
    svg: {
        width: 20,
        height: 20,
        fill: 'var(--custom-action-color, #0566FF)',
    },
});

interface SatisfactionCommentInputProps extends SurveyMessage {
    comment: SatisfactionSurveyConfig['response']['comment'];
}

const ENTER_KEY_CODE = 13;

const SatisfactionCommentInput = ({
    threadSource,
    threadId,
    messageId,
    comment,
}: SatisfactionCommentInputProps): ReactElement => {
    const dispatch = useDispatch();
    const { isNewSkin } = useNewSkin();

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (): void => {
        dispatch(commentSatisfactionSurvey(inputValue, threadSource, threadId, messageId));
        dispatch(
            addMessage(
                transformToAutomaticSurveyMessage(
                    threadSource,
                    threadId,
                    messageId,
                    MessageType.AUTOMATIC_SURVEY_COMMENTED,
                ),
            ),
        );
        focusNewMessageTextarea();
    };

    const handleKeyDown = (keyCode: number): boolean => {
        const isEnter = keyCode === ENTER_KEY_CODE;
        if (!isEnter) {
            return false;
        }

        handleSubmit();

        return true;
    };

    return (
        <div css={[inputWithButtonStyles, isNewSkin && borderStyles]}>
            <InputWithValidation
                type="textarea"
                placeholder="satisfactionSurveyCommentPlaceholder"
                onChange={setInputValue}
                onKeyDown={handleKeyDown}
                value={comment || null}
                showIcon={false}
            />
            <button
                data-testid="send-survey-button"
                type="button"
                css={buttonStyles}
                onClick={handleSubmit}
            >
                <SendIcon />
            </button>
        </div>
    );
};

export default SatisfactionCommentInput;
