import React, { ReactElement } from 'react';

import { SerializedStyles, css } from '@emotion/react';

import useNewSkin from '../../../hooks/useNewSkin';
import { FormMessageStateType } from './useForm';

import { FormFieldType } from '../../../store/typings';
import Translation from '../../Translation';
import { SuccessCheck } from '../../svgIcons/SvgIcons';

const getInputProps = (isNewSkin: boolean): SerializedStyles =>
    css({
        marginBottom: isNewSkin ? '8px' : '12px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    });

export const getSentMarkerContainer = (isNewSkin: boolean): SerializedStyles =>
    css({
        position: 'absolute',
        right: '10px',
        top: isNewSkin ? '10px' : '4px',
        svg: {
            fill: '#25833E',
            width: '20px',
        },
    });

export const errorMessageStyles = css(`
    color: #E81332;
    font-size: 12px;
    padding-left: 12px;
    line-height: 16px;
    display: inline-block;
    padding-top: 4px;
`);

const getInvalidFieldMessage = (type: FormFieldType): ReactElement | null => {
    let translationProps: {
        value: string;
        fallback: string;
    } | null = null;
    switch (type) {
        case FormFieldType.CHECKBOX:
            translationProps = {
                value: 'fieldRequired',
                fallback: 'This field is required',
            };
            break;

        case FormFieldType.EMAIL:
            translationProps = {
                value: 'wrongEmailFormat',
                fallback: "That email doesn't look quite right",
            };
            break;
        case FormFieldType.NAME:
            translationProps = {
                value: 'wrongNameFormat',
                fallback: "That name doesn't look quite right",
            };
            break;
        case FormFieldType.NUMBER:
            translationProps = {
                value: 'wrongNumberFormat',
                fallback: "That number doesn't look quite right",
            };
            break;
        case FormFieldType.URL:
            translationProps = {
                value: 'wrongUrlFormat',
                fallback: "That URL doesn't look quite right",
            };
            break;
        case FormFieldType.PHONE:
            translationProps = {
                value: 'wrongPhoneFormat',
                fallback: "That phone number doesn't look quite right",
            };
            break;
        case FormFieldType.SELECT:
            translationProps = {
                value: 'chooseOneOfTheOptions',
                fallback: 'Choose one of the options',
            };
            break;
        case FormFieldType.TEXT:
        case FormFieldType.LONG_TEXT:
        case FormFieldType.MULTISELECT:
        default:
            return null;
    }
    return (
        <span css={errorMessageStyles}>
            <Translation {...translationProps} />
        </span>
    );
};

const getFieldErrorMessage = (
    type: FormFieldType,
    state: FormMessageStateType,
): ReactElement | null => {
    switch (state) {
        case FormMessageStateType.EMPTY:
            return (
                <span css={errorMessageStyles}>
                    <Translation value="fieldCannotBeEmpty" fallback="Field cannot be empty" />
                </span>
            );
        case FormMessageStateType.INVALID:
            return getInvalidFieldMessage(type);
        case FormMessageStateType.VALID:
        default:
            return null;
    }
};

interface FormInputContainerProps {
    type: FormFieldType;
    validity: FormMessageStateType;
    shouldDisplaySuccessIcon: boolean;
    children: ReactElement;
}

const FormInputWrapper = ({
    shouldDisplaySuccessIcon,
    validity,
    type,
    children,
}: FormInputContainerProps): ReactElement => {
    const { isNewSkin } = useNewSkin();

    return (
        <div css={getInputProps(isNewSkin)}>
            {children}
            {shouldDisplaySuccessIcon && (
                <div css={getSentMarkerContainer(isNewSkin)}>
                    <SuccessCheck />
                </div>
            )}
            {getFieldErrorMessage(type, validity)}
        </div>
    );
};

export default FormInputWrapper;
