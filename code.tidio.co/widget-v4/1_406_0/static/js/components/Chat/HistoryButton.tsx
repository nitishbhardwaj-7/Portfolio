import React, { ReactElement } from 'react';

import { SerializedStyles, css } from '@emotion/react';

import useNewSkin from '../../hooks/useNewSkin';

import { trans } from '../../helpers/translations';

import { HistoryIcon } from '../svgIcons/SvgIcons';

export const historyButtonWrapperStyles = css({
    clear: 'both',
    width: '100%',
    float: 'left',
});

export const getHistoryButtonStyles = (newSkin: boolean): SerializedStyles =>
    css({
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        letterSpacing: '-0.1px',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: newSkin ? 500 : 600,
        color: '#8894ab',
        borderRadius: '14px',
        border: 'solid 1px rgba(136, 148, 171, 0.24)',
        paddingRight: '10px',

        svg: {
            fill: '#8894ab',
            width: '19px',
            marginInline: '4px',
        },

        '&:hover': {
            color: 'var(--custom-action-color, #0566ff)',
            svg: {
                fill: 'var(--custom-action-color, #0566ff)',
            },
        },

        marginBottom: newSkin ? '10px' : '20px',
    });

interface HistoryButtonProps {
    onClick: () => void;
}

const HistoryButton = ({ onClick }: HistoryButtonProps): ReactElement => {
    const { isNewSkin } = useNewSkin();

    return (
        <div css={historyButtonWrapperStyles} data-testid="historyButtonWrapper">
            <button
                css={getHistoryButtonStyles(isNewSkin)}
                type="button"
                onClick={onClick}
                data-testid="historyButton"
            >
                <HistoryIcon />
                {trans('previousMessages', null, 'Previous messages')}
            </button>
        </div>
    );
};

export default HistoryButton;
