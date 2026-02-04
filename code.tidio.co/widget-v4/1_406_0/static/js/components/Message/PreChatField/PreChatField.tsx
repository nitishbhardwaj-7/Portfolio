import React, { LegacyRef, useMemo } from 'react';

import { AllowedPreChatFields } from '../../../connection/types';
import { DefaultRootState } from '../../../store/typings';
import Translation from '../../Translation';
import InputWithValidation from '../InputWithValidation';

type ValueType = DefaultRootState['visitor'][AllowedPreChatFields];

interface PreChatFieldProps {
    type: AllowedPreChatFields;
    placeholder: string;
    value?: ValueType;
    disabled?: boolean;
    forceErrorIcon?: boolean;
    onInputChange?: (value: string | boolean, isValid: boolean, type: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    shakeClassName?: string;
}

const getFieldType = (type: AllowedPreChatFields): string => {
    switch (type) {
        case AllowedPreChatFields.EMAIL:
            return 'email';
        case AllowedPreChatFields.NAME:
            return 'text';
        case AllowedPreChatFields.PHONE:
            return 'tel';
        case AllowedPreChatFields.GDPR_CONSENT:
            return 'checkbox';
        case AllowedPreChatFields.PRECHAT_FIELD_TYPE_EMAIL_CONSENT:
            return 'checkbox';
        case AllowedPreChatFields.SIGN_UP_NEWSLETTER:
            return 'checkbox';
        default:
            return '';
    }
};

const getDynamicProps = (type: AllowedPreChatFields, value: ValueType): Record<string, unknown> => {
    switch (type) {
        case AllowedPreChatFields.PRECHAT_FIELD_TYPE_EMAIL_CONSENT:
            if (value && typeof value === 'object') {
                return {
                    validator: () => true,
                    placeholder: 'signUpNewsletter',
                    value: value.value === 'subscribed',
                };
            }
            return {
                validator: () => true,
                placeholder: 'signUpNewsletter',
            };
        case AllowedPreChatFields.SIGN_UP_NEWSLETTER:
            return {
                validator: () => true,
                placeholder: 'signUpNewsletter',
            };
        default:
            return {};
    }
};

const PreChatField = React.forwardRef(
    (props: PreChatFieldProps, ref: LegacyRef<HTMLInputElement> | undefined) => {
        const {
            value,
            type,
            placeholder,
            forceErrorIcon = false,
            disabled = false,
            onKeyDown = undefined,
            onInputChange = (): void => {},
            shakeClassName = '',
        } = props;

        const fieldType = useMemo(() => getFieldType(type), [type]);
        const dynamicProps = useMemo(() => getDynamicProps(type, value), [type, value]);

        if (!fieldType) {
            return null;
        }

        if (type === AllowedPreChatFields.GDPR_CONSENT) {
            return (
                <div
                    className={`field-wrapper ${shakeClassName} ${
                        forceErrorIcon ? 'field-wrapper-with-error' : ''
                    }`}
                >
                    <label htmlFor={type} className="small-text">
                        <input
                            id={type}
                            type={fieldType}
                            checked={Boolean(value)}
                            onChange={(event): void => {
                                onInputChange(event.target.checked, event.target.checked, type);
                            }}
                            disabled={disabled}
                            className={disabled ? 'disabled' : ''}
                            ref={ref}
                        />
                        <Translation value={placeholder} linkify markdownify />
                    </label>
                </div>
            );
        }

        return (
            <InputWithValidation
                id={type}
                type={fieldType}
                onChange={(inputValue: string | boolean, isValid: boolean): void => {
                    onInputChange(inputValue, isValid, type);
                }}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                bindInputRef={ref}
                onKeyDown={onKeyDown}
                forceErrorIcon={forceErrorIcon}
                shakeClassName={shakeClassName}
                {...dynamicProps}
            />
        );
    },
);

export default PreChatField;
