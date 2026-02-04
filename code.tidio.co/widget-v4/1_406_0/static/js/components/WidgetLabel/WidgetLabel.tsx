import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useNewSkin from '../../hooks/useNewSkin';

import { isInPreviewMode } from '../../helpers';
import { getIframeRef, getWindowRef } from '../../helpers/focusManager';
import { sanitizeLinkifyAndEmojifyString } from '../../helpers/ui';
import { views } from '../../helpers/views';

import {
    setChatOpenedState,
    setIframeView,
    visitorClicksOnChatIcon,
    widgetActivityTracking,
} from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import { getAwesomeIframe, getView } from '../../store/selectors';
import { IframeViews } from '../../store/typings';
import { getTextStyles } from '../../styles/text.styles';
import Translation from '../Translation';
import widgetLabelStyles from './WidgetLabel.styles';

const DESKTOP_MIN_WIDTH = 112;
const DESKTOP_MIN_HEIGHT = 140;
const AWESOME_IFRAME_MIN_WIDTH = 94;
const AWESOME_IFRAME_MIN_HEIGHT = 94;

const isInPreview = isInPreviewMode();
const getIframeWidth = (isAwesomeIframe: boolean): number =>
    isAwesomeIframe ? AWESOME_IFRAME_MIN_WIDTH : DESKTOP_MIN_WIDTH;

const getIframeHeight = (isAwesomeIframe: boolean): number =>
    isAwesomeIframe ? AWESOME_IFRAME_MIN_HEIGHT : DESKTOP_MIN_HEIGHT;

const WidgetLabel = (): React.ReactElement => {
    const dispatch = useDispatch();
    const view = useSelector(getView);
    const isAwesomeIframe = useSelector(getAwesomeIframe);
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    const labelRef = useRef<HTMLButtonElement>(null);

    const windowRef = useRef<Window | null>(null);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const iframeWidth = useRef<number | null>(null);
    const iframeHeight = useRef<number | null>(null);

    const rafId = useRef<number | null>(null);

    const expandIframeToMax = useCallback(() => {
        const width = 450;
        const height = getIframeHeight(isAwesomeIframe);
        dispatch(
            setIframeView(IframeViews.DYNAMIC, {
                width,
                height,
            }),
        );
        iframeWidth.current = width;
        iframeHeight.current = height;
    }, [dispatch, isAwesomeIframe]);

    const checkWidth = (): number => {
        try {
            if (labelRef.current) {
                labelRef.current.style.cssText =
                    'width: auto; align-self: flex-start; white-space: nowrap';
                const contentWidth = labelRef.current.clientWidth;
                labelRef.current.style.cssText = '';
                return contentWidth + 15;
            }
            return 250;
        } catch {
            return 250;
        }
    };

    const updateIframe = useCallback(() => {
        if (!windowRef.current) {
            return false;
        }
        if (isInPreview) {
            expandIframeToMax();
            return true;
        }

        let width = getIframeWidth(isAwesomeIframe);
        const height = getIframeHeight(isAwesomeIframe);

        width += checkWidth();
        if (iframeWidth.current !== width || iframeHeight.current !== height) {
            rafId.current = windowRef.current?.requestAnimationFrame(() => {
                dispatch(
                    setIframeView(IframeViews.DYNAMIC, {
                        width,
                        height,
                    }),
                );
                iframeWidth.current = width;
            });
        }
        return true;
    }, [dispatch, expandIframeToMax, isAwesomeIframe]);

    const cancelAnimationFrame = (): void => {
        if (rafId.current && windowRef?.current) {
            windowRef.current.cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
    };

    useEffect((): void => {
        windowRef.current = getWindowRef();
        iframeRef.current = getIframeRef();
        iframeWidth.current = iframeRef.current?.clientWidth || null;
        iframeHeight.current = iframeRef.current?.clientHeight || null;
    }, []);

    useEffect((): (() => void) => {
        if (view !== views.closed) {
            cancelAnimationFrame();
        } else {
            updateIframe();
        }
        return () => (): void => {
            cancelAnimationFrame();
        };
    }, [dispatch, updateIframe, view]);

    useEffect(
        () => (): void => {
            // i.e. window.tidioChatApi.setFeatures({widgetLabelStatus: false})
            if (view === views.closed) {
                // onlyBubble is only valid view here because there is no label on mobile where smaller bubble sizes exist
                dispatch(setIframeView(IframeViews.ONLY_BUBBLE));
            }
        },
        [dispatch, view],
    );

    const openWidget = (): void => {
        dispatch(widgetActivityTracking(trackingEvents.widgetLabelClicked));
        dispatch(visitorClicksOnChatIcon());
        dispatch(setChatOpenedState(true));
    };

    const truncateText = (string: string, maxLength: number): string => {
        let tempString = string;
        const tempArray = [...tempString];
        const wasTextShortened = tempString.length > maxLength;
        while (tempString.length > maxLength) {
            tempArray.pop();
            tempString = tempArray.join('');
        }
        return wasTextShortened ? `${tempString}&hellip;` : tempString;
    };

    return (
        <Translation value={['chatWithUsLabel']}>
            {({ chatWithUsLabel }): null | React.ReactElement => {
                if (chatWithUsLabel.length === 0) {
                    return null;
                }
                return (
                    <button
                        className="widgetLabel"
                        ref={labelRef}
                        onClick={openWidget}
                        type="button"
                        css={[widgetLabelStyles, textStyles.text16]}
                    >
                        <span
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                                __html: sanitizeLinkifyAndEmojifyString(
                                    truncateText(chatWithUsLabel, 25),
                                ),
                            }}
                        />
                    </button>
                );
            }}
        </Translation>
    );
};

export default WidgetLabel;
