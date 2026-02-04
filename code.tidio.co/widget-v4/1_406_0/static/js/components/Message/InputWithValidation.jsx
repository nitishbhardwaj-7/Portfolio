import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { css } from '@emotion/react';
import PropTypes from 'prop-types';

import useNewSkin from '../../hooks/useNewSkin';

import { isValidEmail, isValidMobilePhone } from '../../helpers';

import { hideHeader } from '../../store/actions';
import { getIsMobile } from '../../store/selectors';
import { getTextStyles } from '../../styles/text.styles';
import Translation from '../Translation';

const newSkinTextStyles = getTextStyles(true);

const inputStyles = css({
    input: newSkinTextStyles.text14,
    textarea: newSkinTextStyles.text14,
    svg: {
        top: 6,
    },
});

function isInputValid(value, fieldType, validator) {
    if (validator) {
        return validator(value);
    }
    if (fieldType === 'email') {
        return isValidEmail(value);
    }
    if (fieldType === 'tel') {
        return isValidMobilePhone(value);
    }
    return value.trim() !== '';
}

class InputWithValidation extends React.Component {
    constructor(props) {
        super(props);
        const value = props.value === null ? '' : props.value;
        this.state = {
            value,
            isValid: isInputValid(value, props.type, props.validator),
            showErrorIcon: false,
        };
        this.isMobile = this.props.isMobile;
        this.errorIconHideTimer = null;
    }

    componentDidMount() {
        // is valid on mount?
        const { isValid } = this.state;
        if (this.state.isValid) {
            if (this.props.onChange) {
                this.props.onChange(this.state.value, isValid);
            }
            if (this.props.isValidCallback) {
                this.props.isValidCallback(isValid);
            }
        }
    }

    onChange = (event) => {
        const { value, checked, type } = event.target;
        const valueBasedOnInputType = type !== 'checkbox' ? value : checked;
        const isValid = isInputValid(valueBasedOnInputType, this.props.type, this.props.validator);
        this.setState({
            value: valueBasedOnInputType,
            isValid,
        });
        if (this.props.onChange) {
            this.props.onChange(valueBasedOnInputType, isValid);
        }
        if (this.props.isValidCallback) {
            this.props.isValidCallback(isValid);
        }
    };

    onKeyDown = (event) => {
        const { keyCode } = event;
        const enterKeyCode = 13;
        const isEnter = keyCode === enterKeyCode;
        if (isEnter && !this.state.isValid) {
            this.setState({
                showErrorIcon: true,
            });
            if (this.props.onKeyDown) {
                this.props.onKeyDown(false);
            }
            clearTimeout(this.errorIconHideTimer);
            this.errorIconHideTimer = null;
            this.errorIconHideTimer = setTimeout(() => {
                this.setState({
                    showErrorIcon: false,
                });
            }, 820);
        }
        if (!isEnter || !this.state.isValid) {
            return false;
        }
        event.preventDefault();
        if (this.props.onKeyDown) {
            this.props.onKeyDown(keyCode);
        }
        return true;
    };

    onFocus = () => {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
        if (this.props.shouldToggleHeader && !this.props.disabled && this.isMobile) {
            this.props.dispatch(hideHeader(true));
        }
    };

    onBlur = () => {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
        if (this.props.shouldToggleHeader && !this.props.disabled && this.isMobile) {
            // Timeout for possible close button click
            setTimeout(() => {
                this.props.dispatch(hideHeader(false));
            }, 100);
        }
    };

    getError = () => {
        if (this.props.forceErrorIcon === undefined) {
            return this.state.showErrorIcon;
        }
        return this.props.forceErrorIcon;
    };

    render() {
        let Input = null;
        if (this.props.type !== 'checkbox') {
            Input = (
                <Translation value={[this.props.placeholder]}>
                    {(translation) =>
                        this.props.type === 'textarea' ? (
                            <textarea
                                placeholder={translation[this.props.placeholder]}
                                onChange={this.onChange}
                                onKeyDown={this.onKeyDown}
                                value={this.state.value}
                                readOnly={this.props.disabled}
                                className={this.props.disabled ? 'disabled' : ''}
                                ref={this.props.bindInputRef}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                            />
                        ) : (
                            <input
                                type={this.props.type}
                                placeholder={translation[this.props.placeholder]}
                                onChange={this.onChange}
                                onKeyDown={this.onKeyDown}
                                value={this.state.value}
                                readOnly={this.props.disabled}
                                className={this.props.disabled ? 'disabled' : ''}
                                ref={this.props.bindInputRef}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                            />
                        )
                    }
                </Translation>
            );
        } else {
            Input = (
                <label htmlFor={this.props.id}>
                    <input
                        id={this.props.id}
                        type={this.props.type}
                        onChange={this.onChange}
                        checked={this.state.value}
                        disabled={this.props.disabled}
                        className={this.props.disabled ? 'disabled' : ''}
                        ref={this.props.bindInputRef}
                    />
                    <Translation value={this.props.placeholder} linkify />
                </label>
            );
        }
        return (
            <div
                className={`field-wrapper ${this.props.shakeClassName} ${
                    this.getError() ? 'field-wrapper-with-error' : ''
                }`}
                css={this.props.isNewSkin ? inputStyles : undefined}
            >
                {Input}
            </div>
        );
    }
}

InputWithValidation.propTypes = {
    type: PropTypes.oneOf(['email', 'text', 'tel', 'checkbox', 'textarea']).isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
    bindInputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    isValidCallback: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    forceErrorIcon: PropTypes.bool,
    id: PropTypes.string,
    validator: PropTypes.func,
    shouldToggleHeader: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    shakeClassName: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    isNewSkin: PropTypes.bool,
    isMobile: PropTypes.bool,
};

InputWithValidation.defaultProps = {
    placeholder: '',
    bindInputRef: undefined,
    onChange: undefined,
    onKeyDown: null,
    disabled: false,
    isValidCallback: null,
    value: null,
    forceErrorIcon: false,
    id: undefined,
    validator: undefined,
    shouldToggleHeader: true,
    onFocus: undefined,
    onBlur: undefined,
    shakeClassName: '',
    isNewSkin: false,
    isMobile: false,
};

const WrappedInputWithValidation = (props) => {
    const dispatch = useDispatch();
    const isMobile = useSelector(getIsMobile);
    const { isNewSkin } = useNewSkin();

    return (
        <InputWithValidation
            {...props}
            dispatch={dispatch}
            isNewSkin={isNewSkin}
            isMobile={isMobile}
        />
    );
};

export default WrappedInputWithValidation;
