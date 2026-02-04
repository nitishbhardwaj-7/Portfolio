import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { allowedPreChatFieldTypes, getPreChatFields } from '../../connection/parsers';
import {
    PRECHAT_FIELD_TYPE_DEPARTMENT_ID,
    PRECHAT_FIELD_TYPE_EMAIL_CONSENT,
    PRECHAT_GDPR_CONSENT_ID,
} from '../../connection/prechatFieldTypes';
import { useShake } from '../../hocs/withShakeHOC';
import { sendFilledPreChat } from '../../store/actions';
import {
    getAreDepartmentsEnabled,
    getIsDepartmentSelected,
    getIsMobile,
    getPrechatSubscriptionCheckboxDefaultValue,
    getSelectedDepartmentId,
} from '../../store/selectors';
import { getGoogleTracker } from '../../tracking/GoogleTracker/GoogleTracker';
import SelectDepartmentField from '../Departments/SelectDepartmentField';
import PreChatField from '../Message/PreChatField/PreChatField';
import Translation from '../Translation';
import { userDataModalText } from './UserDataModal.styles';
import UserDataModalSubmitField from './UserDataModalSubmitField';
import OnlineOperators from './WidgetAvatarOrOnlineOperators';

/**
 * @typedef EmailConsentValue
 * @property {('subscribed' | 'unsubscribed')} value
 * @property {number} date - timestamp in seconds
 * @property {('operator' | 'user')} setBy
 * @property {number} [operatorId] - optional property set when setBy = 'operator'
 */

/**
 * @param {boolean} emailConsent
 * @return EmailConsentValue
 */
function transformEmailConsentField(emailConsent) {
    return {
        value: emailConsent ? 'subscribed' : 'unsubscribed',
        date: Math.round(Date.now() / 1000),
        setBy: 'user',
    };
}

function transformPrechatValues(inputValues) {
    const transformed = inputValues;
    const fieldValuesToBoolean = [PRECHAT_FIELD_TYPE_EMAIL_CONSENT, 'signUpNewsletter'];
    fieldValuesToBoolean.forEach((field) => {
        if (typeof transformed[field] !== 'undefined') {
            transformed[field] = Boolean(transformed[field]);
        }
    });
    if (typeof transformed[PRECHAT_FIELD_TYPE_EMAIL_CONSENT] === 'boolean') {
        transformed[PRECHAT_FIELD_TYPE_EMAIL_CONSENT] = transformEmailConsentField(
            transformed[PRECHAT_FIELD_TYPE_EMAIL_CONSENT],
        );
    }

    return transformed;
}

function getFilledPreChatValues(inputValues) {
    const values = {};
    Object.keys(inputValues).forEach((key) => {
        values[key] = inputValues[key].value;
    });
    if (values.signUpNewsletter === true) {
        // if there is no emailConsent field but there is email integration we automatically mark emailConsent as true
        values.emailConsent = true;
    }

    return transformPrechatValues(values);
}

const SET_INPUT = 'SET_INPUT';
const SHOW_ERROR_ON_INVALID_FIELDS = 'SHOW_ERROR_ON_INVALID_FIELDS';

function reducer(state, action) {
    switch (action.type) {
        case SET_INPUT: {
            const { fieldType, isValid, value } = action;
            return {
                ...state,
                inputValues: {
                    ...state.inputValues,
                    [fieldType]: {
                        isValid,
                        value,
                    },
                },
                fieldsWithErrors: {
                    ...state.fieldsWithErrors,
                    [fieldType]: false,
                },
            };
        }
        case SHOW_ERROR_ON_INVALID_FIELDS: {
            const fieldsWithErrors = Object.entries(state.inputValues)
                .filter(([, data]) => !data.isValid)
                .reduce(
                    (acc, [fieldType]) => ({
                        ...acc,
                        [fieldType]: true,
                    }),
                    {},
                );
            return {
                ...state,
                fieldsWithErrors,
            };
        }
        default:
            throw new Error();
    }
}

const PrechatModal = (props) => {
    function initReducer(preChatFields) {
        const inputValues = {};
        preChatFields.forEach((field) => {
            inputValues[field.type] = {
                isValid: false,
                // populate local state with value from prefilled prechat
                value: field.value ? field.value : '',
            };
        });
        if (
            props.prechatSubscriptionCheckboxDefaultValue &&
            inputValues.emailConsent &&
            !inputValues.emailConsent.value
        ) {
            inputValues.emailConsent = { ...inputValues.emailConsent, value: true };
        }

        return { inputValues, fieldsWithErrors: {} };
    }

    const initialState =
        props.areDepartmentsEnabled && !props.isDepartmentSelected
            ? [...props.preChatFields, { type: PRECHAT_FIELD_TYPE_DEPARTMENT_ID }]
            : props.preChatFields;
    const [state, dispatch] = React.useReducer(reducer, initialState, initReducer);
    const { triggerShake, shakeClassName } = useShake();
    function showErrorOnInvalidFields() {
        dispatch({
            type: SHOW_ERROR_ON_INVALID_FIELDS,
        });
    }

    const setInputVal = (value, isValid, fieldType) => {
        dispatch({
            type: SET_INPUT,
            fieldType,
            value,
            isValid,
        });
    };

    const setDepartmentId = (departmentId) => {
        dispatch({
            type: SET_INPUT,
            fieldType: PRECHAT_FIELD_TYPE_DEPARTMENT_ID,
            value: departmentId,
            isValid: true,
        });
    };

    const firstInputRef = React.useRef();
    React.useEffect(() => {
        // Skip auto focus on mobile: keyboard opens before modal is positioned, hiding content
        // Safari blocks programmatic focus after animations or timeouts, so users must tap the input
        if (firstInputRef.current && !props.isMobile) {
            firstInputRef.current.focus();
        }
    }, [props.isMobile]);

    React.useEffect(() => {
        if (props.isDepartmentSelected) {
            setDepartmentId(props.selectedDepartmentId);
        }
    }, [props.isDepartmentSelected, props.selectedDepartmentId]);

    const isPrechatStartedEventSent = React.useRef(false);
    React.useEffect(() => {
        if (!isPrechatStartedEventSent.current) {
            const visiblePrechatFieldsTypes = props.preChatFields.map((field) => field.type);

            getGoogleTracker().trackEvent({
                eventName: 'tidio_prechat_started',
                params: {
                    email: visiblePrechatFieldsTypes.includes('email'),
                    phone: visiblePrechatFieldsTypes.includes('phone'),
                    name: visiblePrechatFieldsTypes.includes('name'),
                    consent_given: visiblePrechatFieldsTypes.includes('emailConsent'),
                },
            });

            isPrechatStartedEventSent.current = true;
        }
    }, [props.preChatFields]);

    function onSubmit(e) {
        if (e) {
            e.preventDefault();
        }
        const isFormValid = Object.values(state.inputValues).every(
            (inputValue) => inputValue.isValid === true,
        );
        if (!isFormValid) {
            triggerShake();
            showErrorOnInvalidFields();
            return false;
        }
        props.dispatch(sendFilledPreChat(getFilledPreChatValues(state.inputValues)));
        return true;
    }

    const onKeyDown = (keyCode) => {
        const enterKeyCode = 13;
        const isEnter = keyCode === enterKeyCode;
        if (isEnter) {
            onSubmit();
        }
    };

    const renderPreChatField = (field, index) => (
        <PreChatField
            key={field.type}
            type={field.type}
            placeholder={field.placeholder}
            onInputChange={setInputVal}
            disabled={false}
            onKeyDown={onKeyDown}
            forceErrorIcon={state.fieldsWithErrors[field.type]}
            shakeClassName={
                state.fieldsWithErrors[field.type] && shakeClassName ? shakeClassName : ''
            }
            ref={index === 0 ? firstInputRef : undefined}
            value={field.value}
        />
    );

    // extend prechat fields with value from local state
    const prechatFieldsWithValue = props.preChatFields.map((field) => {
        const inputValue = state.inputValues[field.type]?.value;
        return { ...field, value: inputValue };
    });
    const preChatWithoutEmailConsent = prechatFieldsWithValue.filter(
        ({ type }) => type !== PRECHAT_FIELD_TYPE_EMAIL_CONSENT && type !== PRECHAT_GDPR_CONSENT_ID,
    );
    const emailConsentField = prechatFieldsWithValue.find(
        ({ type }) => type === PRECHAT_FIELD_TYPE_EMAIL_CONSENT,
    );
    const gdprConsentField = prechatFieldsWithValue.find(
        ({ type }) => type === PRECHAT_GDPR_CONSENT_ID,
    );
    const hasEmptyDepartmentField = state.fieldsWithErrors[PRECHAT_FIELD_TYPE_DEPARTMENT_ID];

    return (
        <div className="pre-chat">
            <OnlineOperators />
            <form onSubmit={onSubmit}>
                <div css={userDataModalText}>
                    <Translation value="preformMessage" emojify />
                </div>
                <div className="user-data-modal-fields">
                    {preChatWithoutEmailConsent.map(renderPreChatField)}
                    {props.areDepartmentsEnabled && !props.isDepartmentSelected && (
                        <SelectDepartmentField
                            onChange={setDepartmentId}
                            shakeClassName={
                                hasEmptyDepartmentField && shakeClassName ? shakeClassName : ''
                            }
                            hasError={hasEmptyDepartmentField}
                        />
                    )}
                    {emailConsentField &&
                        renderPreChatField(emailConsentField, preChatWithoutEmailConsent.length)}
                    {gdprConsentField &&
                        renderPreChatField(gdprConsentField, preChatWithoutEmailConsent.length)}
                </div>
                <UserDataModalSubmitField />
            </form>
        </div>
    );
};

PrechatModal.propTypes = {
    preChatFields: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(allowedPreChatFieldTypes),
            placeholder: PropTypes.string,
        }),
    ).isRequired,
    areDepartmentsEnabled: PropTypes.bool.isRequired,
    isDepartmentSelected: PropTypes.bool.isRequired,
    selectedDepartmentId: PropTypes.number,
    prechatSubscriptionCheckboxDefaultValue: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

PrechatModal.defaultProps = {
    selectedDepartmentId: null,
};

export default connect((state) => ({
    preChatFields: getPreChatFields(state.preChat.data, state.visitor),
    areDepartmentsEnabled: getAreDepartmentsEnabled(state),
    isDepartmentSelected: getIsDepartmentSelected(state),
    selectedDepartmentId: getSelectedDepartmentId(state),
    prechatSubscriptionCheckboxDefaultValue: getPrechatSubscriptionCheckboxDefaultValue(state),
    isMobile: getIsMobile(state),
}))(PrechatModal);
