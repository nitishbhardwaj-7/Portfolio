import React, { ReactElement, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';
import { SerializedStyles } from '@emotion/react/dist/emotion-react.cjs';

import useNewSkin from '../../hooks/useNewSkin';

import { trans } from '../../helpers/translations';
import { parseContent } from './helpers';

import { widgetActivityTracking } from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import { getTextStyles } from '../../styles/text.styles';
import { CopyIcon, SuccessCheck } from '../svgIcons/SvgIcons';
import { CouponCodeMessage as CouponCodeMessageType } from './types';

const Text = css({
    marginBottom: 10,
});

const getCouponCodeBoxStyles = (isButton = false, isNewSkin = false): SerializedStyles =>
    css({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isNewSkin ? '4px 8px' : '12px 40px',
        background: '#fff',
        border: '1px dashed var(--border-color, #D3DBE5)',
        borderRadius: '8px',
        outline: 'none',
        position: 'relative',
        fontWeight: 600,
        ...(isButton
            ? {
                  '&:hover': {
                      border: '1px solid #ACB8CB',
                      color: '#647491',
                      fontWeight: 400,
                  },
              }
            : {}),
        svg: {
            width: '16px',
            height: '16px',
        },
    });

const CouponCodeName = css({
    lineHeight: '20px',
    fontSize: '16px',
});

const CopiedCouponCodeName = css({
    color: '#647491',
    fontWeight: 400,
});

const getCopyIconContainer = (isNewSkin: boolean): SerializedStyles =>
    css({
        position: 'absolute',
        right: isNewSkin ? '6px' : '18px',
        top: isNewSkin ? '6px' : '14px',
    });

const CopiedIconContainer = css({
    display: 'flex',
    marginRight: '4px',
    svg: {
        fill: '#647491',
    },
});

type CouponCodeMessageProps = CouponCodeMessageType;

const CouponCodeMessage = ({ content, couponCode }: CouponCodeMessageProps): ReactElement => {
    const [currentButtonText, setCurrentButtonText] = useState(couponCode);
    const [codeRecentlyCopied, setCodeRecentlyCopied] = useState(false);
    const [copyToClipboardEnabled, setCopyToClipboardEnabled] = useState(true);
    const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>();
    const dispatch = useDispatch();
    const parsedContent = parseContent(content);
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    const handleMouseEnter = (): void => {
        if (copyToClipboardEnabled) {
            setCurrentButtonText(trans('clickToCopy', null, 'Click to copy'));
        }
    };

    const handleMouseLeave = (): void => {
        if (copyToClipboardEnabled) {
            setCurrentButtonText(couponCode);
        }
    };

    const copyToClipboard = async (): Promise<void> => {
        try {
            if (couponCode && copyToClipboardEnabled) {
                await window.parent.navigator.clipboard.writeText(couponCode);
                dispatch(widgetActivityTracking(trackingEvents.couponCodeCopyClicked));
                setCodeRecentlyCopied(true);
                if (copiedTimeoutRef.current) {
                    clearTimeout(copiedTimeoutRef.current);
                }
                copiedTimeoutRef.current = setTimeout(() => {
                    setCodeRecentlyCopied(false);
                }, 1500);
            }
        } catch {
            setCopyToClipboardEnabled(false);
            setCurrentButtonText(couponCode);
        }
    };

    return (
        <div className="message message-operator coupon-code-message">
            <div
                css={Text}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
            {copyToClipboardEnabled ? (
                <button
                    css={[
                        getCouponCodeBoxStyles(true, isNewSkin),
                        codeRecentlyCopied && CopiedCouponCodeName,
                    ]}
                    onClick={copyToClipboard}
                    type="button"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {codeRecentlyCopied && (
                        <span css={CopiedIconContainer}>
                            <SuccessCheck />
                        </span>
                    )}
                    <span css={[CouponCodeName, textStyles.text14Medium]}>
                        {codeRecentlyCopied ? trans('copied', null, 'Copied') : currentButtonText}
                    </span>
                    {!codeRecentlyCopied && (
                        <span css={getCopyIconContainer(isNewSkin)}>
                            <CopyIcon />
                        </span>
                    )}
                </button>
            ) : (
                <span css={getCouponCodeBoxStyles(false, isNewSkin)}>
                    <span css={CouponCodeName}>{currentButtonText}</span>
                </span>
            )}
        </div>
    );
};

export default CouponCodeMessage;
