import React, { CSSProperties, ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { SerializedStyles, css } from '@emotion/react';

import useNewSkin from '../../../hooks/useNewSkin';
import useMessageForm, { FormMessageStateType } from './useForm';

import { getWidgetColors } from '../../../store/selectors';
import { FormFieldType, FormMessageField } from '../../../store/typings';
import { getTextStyles } from '../../../styles/text.styles';
import Translation from '../../Translation';
import { Loader, SuccessCheck } from '../../svgIcons/SvgIcons';
import { FormMessage } from '../types';
import FormInputWrapper from './FormInputWrapper';
import FormMessageFile from './FormMessageFile/FormMessageFile';
import FormMessageSelect from './FormMessageSelect';

const getInputStyles = (hasError: boolean, isNewSkin: boolean, sent?: boolean): SerializedStyles =>
    css({
        padding: sent ? '8px 40px 8px 12px' : '8px 12px',
        borderRadius: 6,
        fontSize: 15,
        border: 'none',
        color: '#080F1A',
        textOverflow: 'ellipsis',
        '&::placeholder': {
            color: '#647491',
        },
        '&:disabled': {
            background: '#fff',
        },
        ...(isNewSkin && {
            padding: '12px 16px',
            borderRadius: 'var(--radius-component, 8px)',
            border: '1px solid  var(--border-color, #D3DBE5)',
            '&:focus, &:active': {
                border: '1px solid  var(--border-color, #D3DBE5)',
            },
        }),
        ...(hasError && {
            outline: '1px solid #E81332',
            '&:focus, &:active': {
                outline: '1px solid #E81332',
            },
        }),
    });

const getErrorMessageStyles = (isNewSkin: boolean, hasErrors: boolean): SerializedStyles =>
    css({
        color: '#E81332',
        fontSize: 12,
        lineHeight: '16px',
        display: 'inline-block',
        ...(isNewSkin &&
            hasErrors && {
                margin: '12px 0',
            }),
    });

const titleStyles = css({
    marginBottom: 12,
    display: 'block',
    // this tricky code below is used to position element properly when focusing in widget
    marginTop: -30,
    paddingTop: 30,
});

const formStyles = css({
    marginBottom: 0,
});

const getSubmitButtonStyles = (
    activeColor: CSSProperties['color'],
    isNewSkin: boolean,
): SerializedStyles =>
    css({
        border: '1px solid var(--border-color, #D3DBE5)',
        padding: '2px 14px',
        height: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        borderRadius: 24,
        flexShrink: 0,
        '&:disabled': {
            color: '#ACB8CB',
        },
        svg: {
            marginRight: 7,
            fill: '#ACB8CB',
            height: 19,
            width: 'auto',
            marginLeft: -2,
        },
        '.loader-icon.circular': {
            position: 'static',
            circle: {
                stroke: activeColor,
            },
        },
        ...(isNewSkin && {
            borderRadius: 'var(--radius-component, 8px)',
            background: 'var(--custom-action-color)',
            color: 'var(--custom-action-color-contrast)',
            border: 'none',
            padding: '12px',
            width: '100%',
            height: 'unset',
            ':disabled': {
                background: 'var(--custom-action-color)',
                color: 'var(--custom-action-color-contrast)',
                svg: {
                    fill: 'var(--custom-action-color-contrast)',
                },
            },
        }),
    });

const getButtonContainerStyles = (isNewSkin: boolean): SerializedStyles =>
    css({
        display: 'flex',
        justifyContent: 'space-between',
        gap: 30,
        alignItems: 'center',
        ...(isNewSkin && {
            gap: 0,
            flexDirection: 'column',
        }),
    });

const checkboxLabelStyles = css({
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: '#080F1A',
    position: 'relative',
    svg: {
        display: 'none',
    },
    'input:checked + svg': {
        display: 'block',
        position: 'absolute',
        width: 14,
        left: 2,
    },
});

const getCheckboxStyles = (
    activeColor: CSSProperties['color'],
    hasError: boolean,
): SerializedStyles =>
    css({
        appearance: 'none',
        width: 18,
        height: 18,
        borderRadius: 4,
        border: '2px solid #647491',
        margin: '0 12px 0 0',
        flexShrink: 0,
        '&:focus, &:active': {
            border: '2px solid #647491',
            boxShadow: `0 0 2px 0 ${activeColor}`,
        },
        '&:checked': {
            borderColor: activeColor,
            backgroundColor: activeColor,
        },
        ...(hasError && {
            borderColor: '#E81332',
        }),
    });

const getFormMessageOperatorStyles = (isNewSkin: boolean): SerializedStyles =>
    css({
        maxWidth: isNewSkin ? '300px' : 'none',
    });

type FormProps = FormMessage;

const Form = ({ form, content, id: messageId }: FormProps): ReactElement => {
    const {
        formValues,
        formSubmitting,
        formValidityState,
        formRef,
        titleRef,
        handleSubmit,
        handleChange,
        hasErrors,
        sent,
        disabled,
        enableFormSubmission,
        disableFormSubmission,
        isSubmissionDisabled,
        removeItemFromArrayFormField,
        addItemToArrayFormField,
    } = useMessageForm({
        form,
        messageId,
    });
    const widgetColors = useSelector(getWidgetColors);
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    const mapFormFieldToComponent = useCallback(
        (field: FormMessageField): ReactElement | null => {
            const hasError = formValidityState[field.id] !== FormMessageStateType.VALID;
            const currentValue = formValues[field.id];
            const inputFieldProps = {
                placeholder: field.name,
                css: [getInputStyles(hasError, isNewSkin, sent), textStyles.text14],
                disabled,
                readOnly: sent,
                value: String(currentValue),
                onChange: (event: React.ChangeEvent<HTMLInputElement>): void =>
                    handleChange(field.id, event.target.value),
            };
            let fieldComponent = null;
            switch (field.type) {
                case FormFieldType.CHECKBOX:
                    fieldComponent = (
                        <label css={checkboxLabelStyles}>
                            <input
                                css={getCheckboxStyles(widgetColors[3], hasError)}
                                disabled={sent || disabled}
                                checked={Boolean(currentValue)}
                                type="checkbox"
                                onChange={(event): void =>
                                    handleChange(field.id, event.target.checked)
                                }
                            />
                            <SuccessCheck />
                            {field.name}
                        </label>
                    );
                    break;
                case FormFieldType.EMAIL:
                    fieldComponent = <input {...inputFieldProps} type="email" />;
                    break;
                case FormFieldType.NAME:
                    fieldComponent = <input {...inputFieldProps} type="text" />;
                    break;
                case FormFieldType.LONG_TEXT:
                    fieldComponent = (
                        <textarea
                            {...inputFieldProps}
                            onChange={(event): void => handleChange(field.id, event.target.value)}
                        />
                    );
                    break;
                case FormFieldType.TEXT:
                    fieldComponent = <input {...inputFieldProps} type="text" />;
                    break;
                case FormFieldType.NUMBER:
                    fieldComponent = <input {...inputFieldProps} type="number" />;
                    break;
                case FormFieldType.URL:
                    fieldComponent = <input {...inputFieldProps} type="text" />;
                    break;
                case FormFieldType.PHONE:
                    fieldComponent = <input {...inputFieldProps} type="tel" />;
                    break;
                case FormFieldType.SELECT:
                    fieldComponent = (
                        <FormMessageSelect
                            placeholder={field.name}
                            disabled={sent || disabled}
                            value={String(currentValue)}
                            onChange={(newValue): void => handleChange(field.id, newValue)}
                            hasError={hasError}
                            options={
                                field.choices?.map((choice) => ({
                                    value: choice.name,
                                })) || []
                            }
                        />
                    );
                    break;
                case FormFieldType.FILE:
                    if (typeof currentValue === 'object') {
                        return (
                            <FormMessageFile
                                key={field.id}
                                fileFieldValue={currentValue}
                                disabled={sent || disabled}
                                addFormFileMessageValue={(file): void =>
                                    addItemToArrayFormField(field.id, file)
                                }
                                removeFormFileMessageValue={(url): void => {
                                    removeItemFromArrayFormField(field.id, 'url', url);
                                }}
                                enableFormSubmission={enableFormSubmission}
                                disableFormSubmission={disableFormSubmission}
                                requiredError={
                                    formValidityState[field.id] === FormMessageStateType.EMPTY
                                }
                                fieldName={field.name}
                                sent={sent}
                                contactProperty={field.contact_property}
                            />
                        );
                    }
                    return null;
                case FormFieldType.MULTISELECT:
                default:
                    return null;
            }
            return (
                <FormInputWrapper
                    key={field.id}
                    type={field.type}
                    validity={formValidityState[field.id]}
                    shouldDisplaySuccessIcon={field.type === FormFieldType.CHECKBOX ? false : sent}
                >
                    {fieldComponent}
                </FormInputWrapper>
            );
        },
        [
            formValidityState,
            formValues,
            isNewSkin,
            sent,
            textStyles.text14,
            disabled,
            handleChange,
            widgetColors,
            enableFormSubmission,
            disableFormSubmission,
            addItemToArrayFormField,
            removeItemFromArrayFormField,
        ],
    );
    return (
        <div
            className="message message-operator message-form"
            css={getFormMessageOperatorStyles(isNewSkin)}
        >
            <span css={titleStyles} ref={titleRef}>
                {content}
            </span>
            <form onSubmit={handleSubmit} ref={formRef} noValidate css={formStyles}>
                {form.map(mapFormFieldToComponent)}
                <div css={getButtonContainerStyles(isNewSkin)}>
                    <span css={getErrorMessageStyles(isNewSkin, hasErrors)}>
                        {hasErrors && (
                            <Translation
                                value="fieldsNotFilledCorrectly"
                                fallback="Some fields are not filled out correctly. Please check."
                            />
                        )}
                    </span>
                    {sent ? (
                        <button
                            css={getSubmitButtonStyles(widgetColors[3], isNewSkin)}
                            disabled
                            type="submit"
                        >
                            <SuccessCheck />
                            <Translation value="sent" fallback="Sent" />
                        </button>
                    ) : (
                        <button
                            css={getSubmitButtonStyles(widgetColors[3], isNewSkin)}
                            disabled={
                                hasErrors || formSubmitting || disabled || isSubmissionDisabled
                            }
                            type="submit"
                        >
                            {formSubmitting ? (
                                <Loader />
                            ) : (
                                <Translation value="submit" fallback="Submit" />
                            )}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Form;
