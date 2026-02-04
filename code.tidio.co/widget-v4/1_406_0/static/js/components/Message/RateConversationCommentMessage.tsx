import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { focusNewMessageTextarea } from '../../helpers/focusManager';
import { trans } from '../../helpers/translations';
import { sanitizeLinkifyAndEmojifyString } from '../../helpers/ui';

import {
    sendRateConversationComment,
    setFlagForSendingMessageFromVisitor,
} from '../../store/actions';
import { DefaultRootState, MessageType } from '../../store/typings';
import InputWithValidation from './InputWithValidation';
import { RateCommentMessage } from './types';

const ENTER_KEY_CODE = 13;

type RateConversationCommentMessageProps = RateCommentMessage;

const RateConversationMessage = ({
    disabled,
    type,
    id,
    content,
}: RateConversationCommentMessageProps): ReactElement => {
    const dispatch = useDispatch();
    const sendVisitorMessageFlag = useSelector(
        (store: DefaultRootState) => store.sendVisitorMessageFlag,
    );

    const [isValid, setIsValid] = useState(false);
    const [comment, setComment] = useState('');

    const isRateGood = type === MessageType.RATE_COMMENT_GOOD;

    useEffect(() => {
        if (!disabled && sendVisitorMessageFlag && isValid) {
            dispatch(sendRateConversationComment(id, comment));
        }
    }, [comment, disabled, dispatch, id, isValid, sendVisitorMessageFlag]);

    const onKeyDown = (keyCode: number): boolean => {
        const isEnter = keyCode === ENTER_KEY_CODE;
        if (!isEnter || !isValid) {
            return false;
        }
        dispatch(setFlagForSendingMessageFromVisitor(true));
        focusNewMessageTextarea();
        return true;
    };

    return (
        <div className="message message-operator rate-comment">
            <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: sanitizeLinkifyAndEmojifyString(
                        trans(
                            isRateGood ? 'commentForGoodRating' : 'commentForBadRating',
                            null,
                            isRateGood
                                ? 'Thank you for your rate 😍 Would you like to leave a comment?'
                                : 'Thank you for your rate 😥 Would you like to leave a comment?',
                        ),
                    ),
                }}
            />
            <InputWithValidation
                type="text"
                placeholder="typeOptional"
                onChange={setComment}
                onKeyDown={onKeyDown}
                isValidCallback={setIsValid}
                value={disabled ? content : null}
                disabled={disabled}
            />
        </div>
    );
};

export default RateConversationMessage;
