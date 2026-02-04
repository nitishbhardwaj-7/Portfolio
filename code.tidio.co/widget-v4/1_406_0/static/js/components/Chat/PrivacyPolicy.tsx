import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SerializedStyles, css } from '@emotion/react';

import useNewSkin from '../../hooks/useNewSkin';

import { isInPreviewMode } from '../../helpers';

import { dismissPrivacyPolicy } from '../../store/actions';
import {
    getIsMobile,
    getIsPrivacyPolicyDismissed,
    getisPrivacyPolicyEnabled,
} from '../../store/selectors';
import { DefaultRootState } from '../../store/typings';
import Translation from '../Translation';
import { Close } from '../svgIcons/SvgIcons';

const getContainerStyles = (
    isNewSkin: boolean,
    isMobile: boolean,
    hideHeader: boolean,
): SerializedStyles =>
    css({
        position: 'absolute',
        zIndex: 9,
        backgroundColor: '#fff',
        width: 'calc(100% - (var(--chat-padding, 24px) * 2))',
        borderBottomLeftRadius: 'var(--radius-component, 12px)',
        borderBottomRightRadius: 'var(--radius-component, 12px)',
        ...(!isNewSkin && {
            top: isMobile ? '112px' : '124px',
        }),
        ...(hideHeader && {
            top: '60px',
        }),
        ...((hideHeader || !isNewSkin) && {
            borderRadius: 'var(--radius-component, 12px)',
        }),
    });

const privacyPolicyStyles = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F7F9',
    padding: '8px',
    gap: '8px',
    borderRadius: 'var(--radius-component, 12px)',
    fontSize: '12px',
    a: {
        outline: 'none',
        color: '#080F1A',
    },
});

const buttonStyles = css({
    margin: '2px',
    outline: 'none',
    svg: {
        flexShrink: 0,
        fill: '#4C596B',
        width: '20px',
        height: '20px',
    },
});

const isInPreview = isInPreviewMode();

const PrivacyPolicy = (): ReactElement | null => {
    const dispatch = useDispatch();
    const hideHeader = useSelector((store: DefaultRootState) => store.hideHeader);
    const isMobile = useSelector(getIsMobile);
    const isPrivacyPolicyEnabled = useSelector(getisPrivacyPolicyEnabled);
    const isPrivacyPolicyDismissed = useSelector(getIsPrivacyPolicyDismissed);
    const { isNewSkin } = useNewSkin();

    const dismiss = useCallback(() => {
        if (!isInPreview) {
            dispatch(dismissPrivacyPolicy());
        }
    }, [dispatch]);

    if (!isPrivacyPolicyEnabled || isPrivacyPolicyDismissed) {
        return null;
    }

    return (
        <div css={getContainerStyles(isNewSkin, isMobile, hideHeader)}>
            <div css={privacyPolicyStyles}>
                <Translation value="privacyPolicy" markdownify />
                <button
                    aria-label="Close privacy policy"
                    type="button"
                    onClick={dismiss}
                    tabIndex={-1}
                    css={buttonStyles}
                >
                    <Close />
                </button>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
