import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { browserNameLowerCase } from '../../helpers';
import { getWindowRef } from '../../helpers/focusManager';

import { setIframeView } from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import { getFlyMessage, getIsMobile, getView } from '../../store/selectors';
import { MessageType, View } from '../../store/typings';
import CloseButton from './CloseButton';
import flyMessageStyles from './FlyMessage.styles';
import FlyMessageContent from './FlyMessageContent';
import FlyMessageFooter from './FlyMessageFooter';

const DESKTOP_MIN_WIDTH = 362;
const DESKTOP_WITH_BUTTONS_MIN_WIDTH = 495;
const MESSAGE_TYPES_WITHOUT_FLY_MESSAGE_FOOTER = [MessageType.RECOMMENDED_PRODUCTS];

const FlyMessage = (): ReactElement => {
    const dispatch = useDispatch();
    const windowRef = getWindowRef();
    const flyMessageRef = useRef<HTMLDivElement>(null);
    const rafId = useRef<number | null>(null);
    const message = useSelector(getFlyMessage);
    const isMobile = useSelector(getIsMobile);
    const view = useSelector(getView);
    const iframeWidth = useRef<number | string | null>(null);
    const iframeHeight = useRef<number | string | null>(null);

    const hasButtons =
        message?.quickReplies !== undefined ||
        message?.cards !== undefined ||
        message?.buttons !== undefined ||
        message?.iframe?.buttons !== undefined;

    const expandIframeToMax = useCallback(() => {
        let width: number | string = hasButtons
            ? DESKTOP_WITH_BUTTONS_MIN_WIDTH
            : DESKTOP_MIN_WIDTH;
        const height = '100%';
        if (isMobile) {
            width = '100%';
        }
        if (flyMessageRef.current) {
            flyMessageRef.current.style.maxHeight = 'none';
        }
        dispatch(
            setIframeView(`dynamic${width}_${height}`, {
                width,
                height,
            }),
        );
        iframeWidth.current = width;
        iframeHeight.current = height;
    }, [dispatch, hasButtons, isMobile]);

    const updateIframe = useCallback(() => {
        if (!windowRef) {
            return false;
        }

        expandIframeToMax();

        rafId.current = windowRef?.requestAnimationFrame(() => {
            if (flyMessageRef.current) {
                let { clientWidth: width, clientHeight: height } = flyMessageRef.current;
                if (isMobile) {
                    width += 95;
                    height += 80;
                    if (iframeWidth.current === width && iframeHeight.current === height) {
                        flyMessageRef.current.style.cssText = '';
                        return false;
                    }
                } else {
                    width += 90;
                    height += 90;
                    if (iframeWidth.current === width && iframeHeight.current === height) {
                        flyMessageRef.current.style.cssText = '';
                        return false;
                    }
                }
                dispatch(
                    setIframeView(`dynamic${width}_${height}`, {
                        width,
                        height,
                    }),
                );

                iframeWidth.current = width;
                iframeHeight.current = height;
                flyMessageRef.current.style.cssText = '';
                return true;
            }
            return true;
        });
        return true;
    }, [dispatch, expandIframeToMax, isMobile, windowRef]);

    useEffect(() => {
        let elementRef: HTMLDivElement | null = null;
        const handleAnimationEnd = (event: Event): void => {
            const target = event.target as HTMLDivElement;
            if (target?.getAttribute('id') === 'new-message-button-fly' && view === View.FLY) {
                updateIframe();
            }
        };
        if (flyMessageRef.current) {
            elementRef = flyMessageRef.current;
            elementRef.addEventListener('transitionend', handleAnimationEnd);
        }
        if (view !== View.FLY) {
            if (rafId.current) {
                windowRef?.cancelAnimationFrame(rafId.current);
                rafId.current = null;
            }
        } else {
            updateIframe();
        }

        return (): void => {
            if (elementRef) {
                elementRef.removeEventListener('transitionend', handleAnimationEnd);
            }
        };
    }, [updateIframe, view, windowRef]);

    return (
        <div
            ref={flyMessageRef}
            data-testid="flyMessage"
            className={`flyMessage ${hasButtons ? 'with-buttons' : ''} ${browserNameLowerCase} ${
                message?.type === MessageType.RECOMMENDED_PRODUCTS ? 'narrower' : ''
            }`}
            css={flyMessageStyles}
        >
            {message && (
                <>
                    <FlyMessageContent message={message} />
                    {!MESSAGE_TYPES_WITHOUT_FLY_MESSAGE_FOOTER.includes(message.type) && (
                        <FlyMessageFooter message={message} hasButtons={hasButtons} />
                    )}
                </>
            )}
            <div className="close-button-wrapper">
                <CloseButton trackingEvent={trackingEvents.flyMessageClosed} />
            </div>
        </div>
    );
};

export default FlyMessage;
