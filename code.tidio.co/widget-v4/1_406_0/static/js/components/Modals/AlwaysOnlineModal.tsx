import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isInPreviewMode } from '../../helpers';

import { useShake } from '../../hocs/withShakeHOC';
import { sendFilledAlwaysOnlineMessage } from '../../store/actions';
import { getIsMobile } from '../../store/selectors';
import InputWithValidation from '../Message/InputWithValidation';
import Translation from '../Translation';
import { userDataModalText } from './UserDataModal.styles';
import UserDataModalSubmitField from './UserDataModalSubmitField';
import OnlineOperators from './WidgetAvatarOrOnlineOperators';

const isInPreview = isInPreviewMode();

const AlwaysOnlineModal = (): ReactElement => {
    const dispatch = useDispatch();
    const isMobile = useSelector(getIsMobile);
    const [email, setEmail] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);
    const [showError, setShowError] = React.useState(false);
    const { triggerShake, shakeClassName } = useShake();

    const firstInputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        // Skip auto focus on mobile: keyboard opens before modal is positioned, hiding content
        // Safari blocks programmatic focus after animations or timeouts, so users must tap the input
        if (firstInputRef.current && !isInPreview && !isMobile) {
            firstInputRef.current.focus();
        }
    }, [isMobile]);

    const onSubmit = (event?: React.FormEvent<HTMLFormElement>): boolean => {
        if (event) {
            event.preventDefault();
        }

        if (!isValid) {
            setShowError(true);
            triggerShake();
            return false;
        }

        dispatch(sendFilledAlwaysOnlineMessage(email));
        return true;
    };

    const onKeyDown = (keyCode: number): void => {
        const enterKeyCode = 13;
        const isEnter = keyCode === enterKeyCode;

        if (isEnter) {
            onSubmit();
        }
    };

    return (
        <div className="always-online">
            <OnlineOperators />
            <form onSubmit={onSubmit}>
                <div css={userDataModalText}>
                    <Translation value="alwaysOnlineEngageMessage" emojify />
                </div>
                <div className="user-data-modal-fields">
                    <InputWithValidation
                        type="email"
                        placeholder="preformInput_email"
                        onChange={(value: string, isValidValue: boolean): void => {
                            setEmail(value);
                            setIsValid(isValidValue);
                            setShowError(false);
                        }}
                        onKeyDown={onKeyDown}
                        disabled={false}
                        bindInputRef={firstInputRef}
                        forceErrorIcon={showError}
                        shakeClassName={shakeClassName}
                    />
                </div>
                <UserDataModalSubmitField />
            </form>
        </div>
    );
};

export default AlwaysOnlineModal;
