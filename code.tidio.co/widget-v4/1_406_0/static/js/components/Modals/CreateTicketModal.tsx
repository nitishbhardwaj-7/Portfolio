import React, { FormEvent, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { css } from '@emotion/react';
import { animated, useTransition } from '@react-spring/web';

import { useShake } from '../../hocs/withShakeHOC';
import { createTicketWhenOperatorsOffline } from '../../store/actions';
import { getBlockedMessage, getIsMobile, getVisitorEmail } from '../../store/selectors';
import InputTextarea from '../Message/InputTextarea';
import InputWithValidation from '../Message/InputWithValidation';
import Translation from '../Translation';
import { SuccessOutlineEmptyIcon } from '../svgIcons/SvgIcons';
import { userDataModalText } from './UserDataModal.styles';
import UserDataModalSubmitField from './UserDataModalSubmitField';
import OnlineOperators from './WidgetAvatarOrOnlineOperators';

const MIN_MESSAGE_LENGTH = 3;

const createTicketSuccessStyles = css`
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    align-items: center;
    justify-content: center;
    background: #fff;
    padding: 32px 20px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;

    svg {
        position: unset;
        width: 48px;
        height: 48px;
    }
`;

const textStyles = css(userDataModalText, {
    textAlign: 'center',
});

const CreateTicketModal = (): ReactElement => {
    const dispatch = useDispatch();
    const isMobile = useSelector(getIsMobile);
    const visitorEmail = useSelector(getVisitorEmail);
    const [showEmailInput] = useState(!visitorEmail);
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    const blockedMessage = useSelector(getBlockedMessage);
    const [message, setMessage] = useState(blockedMessage ?? '');
    const [isMessageValid, setIsMessageValid] = useState(message.length >= MIN_MESSAGE_LENGTH);

    const [showError, setShowError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { triggerShake, shakeClassName } = useShake();

    const firstInputRef = React.useRef<HTMLInputElement>();
    React.useEffect(() => {
        // Skip auto focus on mobile: keyboard opens before modal is positioned, hiding content
        // Safari blocks programmatic focus after animations or timeouts, so users must tap the input
        if (firstInputRef.current && !isMobile) {
            firstInputRef.current.focus();
        }
    }, [isMobile]);

    function onSubmit(e?: FormEvent<HTMLFormElement>): boolean {
        if (e) {
            e.preventDefault();
        }
        if ((!visitorEmail && !isEmailValid) || !isMessageValid) {
            setShowError(true);
            triggerShake();
            return false;
        }
        dispatch(createTicketWhenOperatorsOffline(visitorEmail || email, message));
        setIsSubmitted(true);
        return true;
    }

    const transition = useTransition(isSubmitted, {
        from: { opacity: 0, transform: 'scale(0.9)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(0.9)' },
        config: {
            tension: 300,
            friction: 30,
        },
    });

    return (
        <>
            <div className="always-online" data-testid="createTicketModal">
                <OnlineOperators />
                <form onSubmit={onSubmit} noValidate>
                    <div css={userDataModalText}>
                        <Translation value="alwaysOnlineEngageMessage" emojify />
                    </div>
                    <div className="user-data-modal-fields">
                        {showEmailInput && (
                            <InputWithValidation
                                type="email"
                                placeholder="preformInput_email"
                                onChange={(value: string, isValidValue: boolean): void => {
                                    setEmail(value);
                                    setIsEmailValid(isValidValue);
                                    setShowError(false);
                                }}
                                disabled={false}
                                bindInputRef={firstInputRef}
                                forceErrorIcon={!isEmailValid && showError}
                                shakeClassName={!isEmailValid ? shakeClassName : ''}
                            />
                        )}

                        <InputTextarea
                            value={message}
                            placeholder="preformInput_firstmsg"
                            minLength={MIN_MESSAGE_LENGTH}
                            onChange={(value: string, isValidValue: boolean): void => {
                                setMessage(value);
                                setIsMessageValid(isValidValue);
                                setShowError(false);
                            }}
                            disabled={false}
                            forceErrorIcon={!isMessageValid && showError}
                            shakeClassName={!isMessageValid ? shakeClassName : ''}
                        />
                    </div>
                    <UserDataModalSubmitField />
                </form>
            </div>
            {transition((style, showConfirmation) =>
                showConfirmation ? (
                    <animated.div css={createTicketSuccessStyles} style={style}>
                        <SuccessOutlineEmptyIcon />
                        <div css={textStyles}>
                            <Translation value="ticketSubmittedConfirmation" emojify />
                        </div>
                    </animated.div>
                ) : null,
            )}
        </>
    );
};

export default CreateTicketModal;
