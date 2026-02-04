import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useNewSkin from '../../hooks/useNewSkin';

import { trans } from '../../helpers/translations';

import {
    sendMessageFromVisitor,
    setMessageDisabledState,
    showAlert,
    visitorSetRating,
} from '../../store/actions';
import { getIsLastMessageWithDisableTextInput } from '../../store/selectors';
import { getTextStyles } from '../../styles/text.styles';
import Translation from '../Translation';
import { RateConversationMessage as RateConversationMessageType } from './types';

type RateConversationMessageProps = RateConversationMessageType;

const RateConversationMessage = (props: RateConversationMessageProps): React.ReactElement => {
    const dispatch = useDispatch();
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    const isLastMessageWithDisableTextInput = useSelector(getIsLastMessageWithDisableTextInput);

    const disableRateButtons = (): void => {
        dispatch(setMessageDisabledState(props.id));
    };
    const onRateClick = (isRateGood: boolean): void => {
        if (isLastMessageWithDisableTextInput) {
            dispatch(
                showAlert(
                    trans(
                        'disabledTextInputPlaceholder',
                        null,
                        'Choose one of the options above ☝️',
                    ),
                ),
            );
        } else {
            const messageContent = isRateGood
                ? trans('rateSatisfied', null, 'Yes, I did!')
                : trans('rateDissatisfied', null, 'No. I’m not satisfied.');
            dispatch(sendMessageFromVisitor(messageContent, false));
            dispatch(visitorSetRating(isRateGood));
            disableRateButtons();
        }
    };

    return (
        <div
            className={`message message-operator message-with-buttons ${
                props.disabled ? 'buttons-hidden' : ''
            }`}
        >
            <span>
                <Translation value="rateConversationMessage" />
            </span>
            {!props.disabled && (
                <div className="button-wrapper">
                    <button type="button" onClick={(): void => onRateClick(true)}>
                        <span css={textStyles.text14}>
                            <Translation value="rateSatisfied" />
                        </span>
                    </button>
                    <button type="button" onClick={(): void => onRateClick(false)}>
                        <span css={textStyles.text14}>
                            <Translation value="rateDissatisfied" />
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default RateConversationMessage;
