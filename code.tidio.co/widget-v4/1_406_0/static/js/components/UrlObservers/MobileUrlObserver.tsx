import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addSPAAction } from '../../helpers';
import { views } from '../../helpers/views';

import { setChatOpenedState } from '../../store/actions';
import { getIsMobile, getMobileHash, getView } from '../../store/selectors';
import { mobileWidgetHash, widgetStateCloseHash, widgetStateOpenHash } from './anchors';

const MobileUrlObserver = (): ReactNode => {
    const watchingUrlChangeRef = useRef(false);
    const preservedHashRef = useRef<string | null>(null);

    const dispatch = useDispatch();

    const restoreHash = useCallback((): string | null => {
        let toRestore: string | null = null;
        if (preservedHashRef.current) {
            toRestore = preservedHashRef.current;
            preservedHashRef.current = null;
        }
        return toRestore;
    }, []);

    const preserveHashIfItExists = (href: string): void => {
        if (
            href.includes('#') &&
            !href.includes(mobileWidgetHash) &&
            !href.includes(widgetStateOpenHash) &&
            !href.includes(widgetStateCloseHash)
        ) {
            preservedHashRef.current = href;
        }
    };

    const watchUrlChange = useCallback((): void => {
        addSPAAction(() => {
            setTimeout(() => {
                try {
                    const { href } = window.parent.location;
                    if (!href.includes(mobileWidgetHash)) {
                        dispatch(setChatOpenedState(false));
                    } else {
                        dispatch(setChatOpenedState(true));
                    }
                } catch {
                    //
                }
            }, 0);
        });
    }, [dispatch]);

    const addMobileHashToCurrentLocation = useCallback((): boolean => {
        try {
            if (!window.parent?.history) {
                return false;
            }
            const { href } = window.parent.location;
            preserveHashIfItExists(href);
            if (!href.includes(mobileWidgetHash)) {
                window.parent.history.pushState(null, 'mobile-widget', mobileWidgetHash);
            }
            if (!watchingUrlChangeRef.current) {
                watchUrlChange();
                watchingUrlChangeRef.current = true;
            }
            return true;
        } catch {
            return false;
        }
    }, [watchUrlChange]);

    useEffect(() => {
        addMobileHashToCurrentLocation();

        return (): void => {
            setTimeout(() => {
                try {
                    const { href } = window.parent.location;
                    if (href.includes(mobileWidgetHash)) {
                        const urlWithoutMobileWidgetHash =
                            restoreHash() || href.replace(mobileWidgetHash, '');
                        window.parent.history.pushState(null, '', urlWithoutMobileWidgetHash);
                    }
                } catch {
                    //
                }
            }, 0);
        };
    }, [addMobileHashToCurrentLocation, restoreHash]);

    return null;
};

const MobileUrlObserverWrapper = (): ReactNode => {
    const isMobile = useSelector(getIsMobile);
    const view = useSelector(getView);
    const mobileHash = useSelector(getMobileHash);

    const parentWindowIsTop = (function isParentWindowTop(): boolean {
        try {
            return window.parent === window.top;
        } catch {
            return false;
        }
    })();

    const shouldRender =
        parentWindowIsTop && isMobile && view !== views.closed && view !== views.fly && mobileHash;

    if (!shouldRender) {
        return null;
    }

    return <MobileUrlObserver />;
};

export default MobileUrlObserverWrapper;
