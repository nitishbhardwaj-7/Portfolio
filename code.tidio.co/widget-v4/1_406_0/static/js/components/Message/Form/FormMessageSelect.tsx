import React, { ReactElement } from 'react';

import { SerializedStyles, css } from '@emotion/react';

import useNewSkin from '../../../hooks/useNewSkin';

import { ArrowDown } from '../../svgIcons/SvgIcons';

const containerStyles = css({
    position: 'relative',
});

const getSelectStyles = (
    showPlaceholder: boolean,
    hasError: boolean,
    newSkin: boolean,
): SerializedStyles =>
    css({
        width: '100%',
        appearance: 'none',
        fontSize: '15px',
        lineHeight: '19px',
        padding: '9px 35px 9px 12px',
        border: 'none',
        borderRadius: '6px',
        backgroundColor: 'white',
        textOverflow: 'ellipsis',
        color: '#080F1A',
        ':disabled': {
            opacity: 1,
        },
        ...(showPlaceholder && {
            color: '#647491',
        }),
        ...(newSkin && {
            padding: '12px 16px',
            borderRadius: 'var(--radius-component, 8px)',
            border: '1px solid  var(--border-color, #D3DBE5)',
            ':focus, :active': {
                border: '1px solid  var(--border-color, #D3DBE5)',
            },
        }),
        ...(hasError && {
            outline: '1px solid #E81332',
            ':focus': {
                outline: '1px solid #E81332',
            },
        }),
    });

const dropdownIndicatorStyles = css({
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    right: '8px',
    pointerEvents: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    svg: {
        fill: '#080F1A',
    },
});

type SelectProps = {
    options: { value: string }[];
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
    hasError?: boolean;
    disabled?: boolean;
};

const FormMessageSelect = ({
    placeholder,
    onChange,
    value,
    options,
    hasError = false,
    disabled,
}: SelectProps): ReactElement => {
    const { isNewSkin } = useNewSkin();

    return (
        <div css={[containerStyles]}>
            <select
                css={getSelectStyles(!value, hasError, isNewSkin)}
                value={value}
                onChange={(event): void => onChange(event.target.value)}
                disabled={disabled}
            >
                <option value="" selected disabled hidden>
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.value}
                    </option>
                ))}
            </select>

            {!disabled && (
                <div css={dropdownIndicatorStyles}>
                    <ArrowDown />
                </div>
            )}
        </div>
    );
};
export default FormMessageSelect;
