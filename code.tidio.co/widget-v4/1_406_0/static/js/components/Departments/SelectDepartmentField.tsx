import React, { ChangeEvent, ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import { isInPreviewMode } from '../../helpers';
import { trans } from '../../helpers/translations';

import { getRoutingRules } from '../../store/selectors';
import { RoutingRule } from '../../store/typings';
import { ArrowDown } from '../svgIcons/SvgIcons';

const Wrapper = css({
    position: 'relative',
    zIndex: 1,
    marginBottom: 8,
    border: '1px solid rgba(108, 125, 159, 0.24)',
    borderRadius: 'var(--radius-component, 5px)',
});

const WarningWrapper = css({
    borderColor: '#f6303a',
    select: {
        '&:not(:focus):invalid': {
            color: '#f6303a',
        },
    },
    svg: {
        fill: '#f6303a',
    },
});

const FocusedWrapper = css({
    borderColor: '#0566ff',
    svg: {
        fill: '#647491',
    },
});

const CustomSelect = css({
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    padding: '11px 40px 12px 16px',
    border: 'none',
    borderRadius: 0,
    outline: 'none',
    background: 'transparent',
    color: '#080F1A',
    fontSize: 15,
    appearance: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    '&:not(:focus):invalid': {
        color: '#8894ab',
    },
    'option[value=""][disabled]': {
        display: 'none',
    },
});

const DropdownIndicator = css({
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 8,
    width: 24,
    height: 24,
    margin: 'auto',
    pointerEvents: 'none',
    svg: {
        top: 'auto',
        left: 'auto',
        fill: '#647491',
    },
});

type SelectDepartmentFieldProps = {
    onChange?: (departmentId: RoutingRule['departmentId']) => void;
    hasError?: boolean;
    shakeClassName?: string;
};

const isPreviewMode = isInPreviewMode();

const SelectDepartmentField = ({
    onChange,
    hasError,
    shakeClassName,
}: SelectDepartmentFieldProps): ReactElement | null => {
    const routingRules = useSelector(getRoutingRules);
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const onFocus = (): void => {
        setFocused(true);
    };
    const onBlur = (): void => {
        setFocused(false);
    };

    const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        const selectedPosition = event.target.value;
        const selectedDepartmentId = routingRules.find(
            (routingRule: RoutingRule) => routingRule.position === Number(selectedPosition),
        )?.departmentId;

        if (!isPreviewMode) {
            setValue(selectedPosition);
        }
        if (onChange && selectedDepartmentId) {
            onChange(selectedDepartmentId);
        }
    };

    if (!routingRules.length) {
        return null;
    }

    const label = trans('routingRules_selector', null, 'Select Department...');

    return (
        <div
            css={[Wrapper, hasError && WarningWrapper, focused && FocusedWrapper]}
            className={shakeClassName}
        >
            <select
                css={CustomSelect}
                value={value}
                required
                form="novalidatedform"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                title={label}
            >
                <option value="" disabled>
                    {label}
                </option>
                {routingRules.map(({ alias, position }: RoutingRule) => (
                    <option key={position} value={position}>
                        {alias}
                    </option>
                ))}
            </select>
            <div css={DropdownIndicator}>
                <ArrowDown />
            </div>
        </div>
    );
};

export default SelectDepartmentField;
