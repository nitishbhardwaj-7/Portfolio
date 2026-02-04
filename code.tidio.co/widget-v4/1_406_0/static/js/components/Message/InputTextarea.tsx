import React, { ChangeEvent, KeyboardEvent, ReactElement, useRef, useState } from 'react';

import Translation from '../Translation';

const isInputValid = (value: string, minLength: number): boolean =>
    value.trim().length >= minLength;

interface InputTextareaProps {
    value?: string;
    placeholder?: string;
    minLength?: number;
    onChange?: (value: string, isValid: boolean) => void;
    onKeyDown?: (keyCode: number) => void;
    disabled?: boolean;
    isValidCallback?: (isValid: boolean) => void;
    forceErrorIcon?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    shakeClassName?: string;
}

const InputTextarea = ({
    value: initValue = '',
    placeholder = '',
    onChange,
    onKeyDown,
    disabled = false,
    isValidCallback,
    forceErrorIcon = false,
    onFocus,
    onBlur,
    shakeClassName = '',
    minLength = 1,
}: InputTextareaProps): ReactElement => {
    const [value, setValue] = useState(initValue);
    const [isValid, setIsValid] = useState(isInputValid(value, minLength));
    const [showErrorIcon, setShowErrorIcon] = useState(false);
    const errorIconHideTimer = useRef<ReturnType<typeof setTimeout> | undefined>();

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        const newValue = event.target.value;
        const isNewValueValid = isInputValid(newValue, minLength);
        setValue(newValue);
        setIsValid(isNewValueValid);
        if (onChange) {
            onChange(newValue, isNewValueValid);
        }
        if (isValidCallback) {
            isValidCallback(isValid);
        }
    };

    const handleOnKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): boolean => {
        const { keyCode } = event;
        const enterKeyCode = 13;
        const isEnter = keyCode === enterKeyCode;
        if (isEnter && !isValid) {
            setShowErrorIcon(true);
            if (errorIconHideTimer.current) {
                clearTimeout(errorIconHideTimer.current);
            }

            errorIconHideTimer.current = setTimeout(() => {
                setShowErrorIcon(false);
            }, 820);
        }
        if (!isEnter || !isValid) {
            return false;
        }
        event.preventDefault();
        if (onKeyDown) {
            onKeyDown(keyCode);
        }
        return true;
    };

    const handleOnFocus = (): void => {
        if (onFocus) {
            onFocus();
        }
    };

    const handleOnBlur = (): void => {
        if (onBlur) {
            onBlur();
        }
    };

    const getError = (): boolean => {
        if (forceErrorIcon === undefined) {
            return showErrorIcon;
        }
        return forceErrorIcon;
    };

    return (
        <div
            className={`field-wrapper ${shakeClassName} ${
                getError() ? 'field-wrapper-with-error' : ''
            }`}
        >
            <Translation value={[placeholder]}>
                {(translation): ReactElement => (
                    <textarea
                        placeholder={translation[placeholder]}
                        onChange={handleOnChange}
                        onKeyDown={handleOnKeyDown}
                        value={value}
                        readOnly={disabled}
                        className={disabled ? 'disabled' : ''}
                        onFocus={handleOnFocus}
                        onBlur={handleOnBlur}
                        rows={4}
                    />
                )}
            </Translation>
        </div>
    );
};

export default InputTextarea;
