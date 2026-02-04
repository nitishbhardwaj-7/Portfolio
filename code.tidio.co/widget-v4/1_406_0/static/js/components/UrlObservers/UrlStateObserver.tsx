import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addSPAAction } from '../../helpers';

import { setChatOpenedState } from '../../store/actions';
import { widgetStateCloseHash, widgetStateOpenHash } from './anchors';

const UrlStateObserver = (): ReactNode => {
    const watchingUrlChangeRef = useRef(false);
    const dispatch = useDispatch();

    const watchUrlChange = useCallback((): void => {
        addSPAAction(() => {
            setTimeout(() => {
                try {
                    const { href } = window.parent.location;
                    if (href.includes(widgetStateOpenHash)) {
                        dispatch(setChatOpenedState(true));
                    } else if (href.includes(widgetStateCloseHash)) {
                        dispatch(setChatOpenedState(false));
                    }
                } catch {
                    //
                }
            }, 0);
        });
    }, [dispatch]);

    const setupUrlWatching = useCallback((): boolean => {
        try {
            if (!window.parent?.location) {
                return false;
            }

            const { href } = window.parent.location;

            if (href.includes(widgetStateOpenHash)) {
                dispatch(setChatOpenedState(true));
            } else if (href.includes(widgetStateCloseHash)) {
                dispatch(setChatOpenedState(false));
            }

            if (!watchingUrlChangeRef.current) {
                watchUrlChange();
                watchingUrlChangeRef.current = true;
            }
            return true;
        } catch {
            return false;
        }
    }, [watchUrlChange, dispatch]);

    useEffect(() => {
        setupUrlWatching();

        return (): void => {
            watchingUrlChangeRef.current = false;
        };
    }, [setupUrlWatching]);

    return null;
};

const UrlStateObserverWrapper = (): ReactNode => {
    const parentWindowIsTop = (function isParentWindowTop(): boolean {
        try {
            return window.parent === window.top;
        } catch {
            return false;
        }
    })();

    const shouldRender = parentWindowIsTop;

    if (!shouldRender) {
        return null;
    }

    return <UrlStateObserver />;
};

export default UrlStateObserverWrapper;
