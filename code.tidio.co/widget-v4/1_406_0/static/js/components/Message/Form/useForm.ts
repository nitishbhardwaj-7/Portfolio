import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isValidEmail } from '../../../helpers';

import { submitForm } from '../../../store/actions';
import { getLastMessage, getNextMessage } from '../../../store/selectors';
import {
    DefaultRootState,
    FileFormFieldValue,
    FilledFormField,
    FormFieldType,
    FormFieldValue,
    FormMessageField,
    MessageType,
} from '../../../store/typings';

export enum FormMessageStateType {
    VALID = 'valid',
    INVALID = 'invalid',
    EMPTY = 'empty',
}

const getDefaultFieldValue = (type: FormFieldType): string | boolean | [] => {
    switch (type) {
        case FormFieldType.FILE:
            return [];
        case FormFieldType.CHECKBOX:
            return false;
        default:
            return '';
    }
};

// those regexp values are in sync with regexp values in API
const phoneNumberRegexp = /(?:\+?\d+[\s-]?)?(?:\(\d+\))?(?:\s?\/\s?)?(?:[-.\s]?\d{1,5}){5,}.*\d/;
const nameRegexp = /[^?!@#$%^&*()_+-=;':"|,./<>`~\d]+/;
const urlRegexp =
    /((?:https?:\/\/)?(?:www\.)?[a-z-.\d]+\.[a-z]{2,13}(?:(?:\?|\/)(?:\S+)?)?)(?:[.!?,].*)?$/i;

const getPredefinedValidator = (fieldType: FormFieldType): ((value: string) => boolean) => {
    switch (fieldType) {
        case FormFieldType.PHONE:
            return (val): boolean => phoneNumberRegexp.test(val);
        case FormFieldType.NAME:
            return (val): boolean => nameRegexp.test(val);
        case FormFieldType.URL:
            return (val): boolean => urlRegexp.test(val);
        case FormFieldType.EMAIL:
            return (val): boolean => isValidEmail(val);
        default:
            return (): boolean => true;
    }
};

const useMessageForm = ({
    form,
    messageId,
}: {
    form: FormMessageField[];
    messageId: string;
}): {
    formSubmitting: boolean;
    formValidityState: { [key: string]: FormMessageStateType };
    formValues: { [key: string]: FormFieldValue };
    handleChange: (id: string, value: FormFieldValue) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    formRef: React.RefObject<HTMLFormElement>;
    titleRef: React.RefObject<HTMLSpanElement>;
    disableFormSubmission: () => void;
    enableFormSubmission: () => void;
    isSubmissionDisabled: boolean;
    removeItemFromArrayFormField: (
        id: string,
        key: keyof FileFormFieldValue,
        value: string,
    ) => void;
    addItemToArrayFormField: (id: string, value: FileFormFieldValue) => void;
    hasErrors: boolean;
    sent: boolean;
    disabled: boolean;
} => {
    const dispatch = useDispatch();
    const nextMessage = useSelector((state: DefaultRootState) => getNextMessage(state, messageId));
    const lastMessage = useSelector(getLastMessage);
    const nextMessageType = nextMessage?.type;
    const isCurrentMessageLast = lastMessage?.id === messageId;
    const [formValues, setFormValues] = useState(
        form.reduce(
            (formObj: { [key: string]: FormFieldValue }, field) => ({
                ...formObj,
                [field.id]: getDefaultFieldValue(field.type),
            }),
            {},
        ),
    );

    const [isSubmissionDisabled, setIsSubmissionDisabled] = useState(false);

    const disableFormSubmission = useCallback(() => {
        setIsSubmissionDisabled(true);
    }, []);

    const enableFormSubmission = useCallback(() => {
        setIsSubmissionDisabled(false);
    }, []);

    const [formSubmitting, setIsFormSubmitting] = useState(false);

    const [formValidityState, setFormValidityState] = useState(
        form.reduce(
            (formObj: { [key: string]: FormMessageStateType }, field) => ({
                ...formObj,
                [field.id]: FormMessageStateType.VALID,
            }),
            {},
        ),
    );

    const hasErrors = useMemo(
        () =>
            Object.values(formValidityState).some((state) => state !== FormMessageStateType.VALID),
        [formValidityState],
    );

    const formRef = useRef<HTMLFormElement>(null);
    const titleRef = useRef<HTMLSpanElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const areValuesPopulatedRef = useRef(false);

    const clearErrorForField = useCallback((id: string) => {
        setFormValidityState((prevErrors) => ({ ...prevErrors, [id]: FormMessageStateType.VALID }));
    }, []);

    const handleChange = useCallback(
        (id: string, value: FormFieldValue): void => {
            setFormValues((prevFormState) => ({ ...prevFormState, [id]: value }));
            clearErrorForField(id);
        },
        [clearErrorForField],
    );

    const addItemToArrayFormField = useCallback(
        (id: string, value: FileFormFieldValue): void => {
            setFormValues((prevFormState) => {
                const prevArray = prevFormState[id];
                if (Array.isArray(prevArray)) {
                    return { ...prevFormState, [id]: [...prevArray, value] };
                }
                return prevFormState;
            });
            clearErrorForField(id);
        },
        [clearErrorForField],
    );

    const removeItemFromArrayFormField = useCallback(
        (id: string, key: keyof FileFormFieldValue, value: string): void => {
            setFormValues((prevFormState) => {
                const prevArray = prevFormState[id];
                if (Array.isArray(prevArray)) {
                    return {
                        ...prevFormState,
                        [id]: prevArray.filter((item) => item[key] !== value),
                    };
                }
                return prevFormState;
            });
        },
        [],
    );

    const validateForm = useCallback(() => {
        const formErrors = { ...formValidityState };
        let isFormInvalid = false;
        form.forEach((field) => {
            const currentValue = formValues[field.id];
            switch (typeof currentValue) {
                case 'boolean':
                    if (field.required && !currentValue) {
                        isFormInvalid = true;
                        formErrors[field.id] = FormMessageStateType.EMPTY;
                    }
                    break;
                case 'object':
                    if (
                        field.type === FormFieldType.FILE &&
                        field.required &&
                        !currentValue[0]?.url
                    ) {
                        isFormInvalid = true;
                        formErrors[field.id] = FormMessageStateType.EMPTY;
                    }
                    break;
                case 'string':
                default:
                    if (field.required && currentValue === '') {
                        isFormInvalid = true;
                        formErrors[field.id] = FormMessageStateType.EMPTY;
                    } else if (
                        currentValue !== '' &&
                        !getPredefinedValidator(field.type)(currentValue)
                    ) {
                        isFormInvalid = true;
                        formErrors[field.id] = FormMessageStateType.INVALID;
                    }
                    break;
            }
        });
        return {
            formErrors,
            isFormInvalid,
        };
    }, [form, formValidityState, formValues]);

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>): boolean => {
            event.preventDefault();
            if (isSubmissionDisabled) {
                return false;
            }
            const { formErrors, isFormInvalid } = validateForm();
            if (isFormInvalid) {
                setFormValidityState(formErrors);
            } else {
                setIsFormSubmitting(true);
                dispatch(
                    submitForm({
                        formResponse: form.map((field) => ({
                            name: field.name,
                            id: field.id,
                            value: formValues[field.id],
                        })),
                    }),
                );
            }
            return true;
        },
        [dispatch, form, formValues, isSubmissionDisabled, validateForm],
    );

    const setAllFormValues = useCallback(
        (formFields: FilledFormField[]) => {
            setFormValues(
                form.reduce((formObj: { [key: string]: FormFieldValue }, field) => {
                    const valueFromResponse = formFields.find(
                        (responseField) => responseField.id === field.id,
                    )?.value;

                    return {
                        ...formObj,
                        [field.id]:
                            field.type === FormFieldType.CHECKBOX
                                ? Boolean(valueFromResponse)
                                : (valueFromResponse ?? ''),
                    };
                }, {}),
            );
        },
        [form],
    );

    useEffect(() => {
        if (typeof titleRef.current?.scrollIntoView === 'function' && isCurrentMessageLast) {
            // There are multiple events across the widget which scroll its content to bottom.
            // They are usually based on timeouts. We didn't want to mess them up with their internal conditions, so
            // we use the latest timeout to scroll up the form
            timeoutRef.current = setTimeout(() => {
                try {
                    titleRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                    });
                } catch {
                    titleRef.current?.scrollIntoView();
                }
            }, 150);
        }
        return (): void => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isCurrentMessageLast]);

    useEffect(() => {
        if (
            !isCurrentMessageLast &&
            nextMessageType === MessageType.FORM_RESPONSE &&
            nextMessage?.formResponse &&
            !areValuesPopulatedRef.current
        ) {
            setAllFormValues(nextMessage.formResponse);
            areValuesPopulatedRef.current = true;
        }
    }, [isCurrentMessageLast, nextMessage?.formResponse, nextMessageType, setAllFormValues]);

    return {
        formSubmitting,
        formValidityState,
        formValues,
        handleChange,
        handleSubmit,
        formRef,
        titleRef,
        hasErrors,
        enableFormSubmission,
        disableFormSubmission,
        isSubmissionDisabled,
        addItemToArrayFormField,
        removeItemFromArrayFormField,
        disabled: nextMessageType !== MessageType.FORM_RESPONSE && !isCurrentMessageLast,
        sent: nextMessageType === MessageType.FORM_RESPONSE && !isCurrentMessageLast,
    };
};

export default useMessageForm;
