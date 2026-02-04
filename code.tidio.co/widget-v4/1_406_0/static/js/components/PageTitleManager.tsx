import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { trans } from '../helpers/translations';

import { DefaultRootState } from '../store/typings';

const PageTitleManager = (): null => {
    const pageTitle = useRef('');
    const unreadMessages = useSelector((state: DefaultRootState) => state.unreadMessages);
    const isPageVisible = useSelector((state: DefaultRootState) => state.isPageVisible);
    const titleChangeInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const noPermission = useRef(false);
    const [newTitleMessageRegex] = useState(() =>
        RegExp(`\\([0-9]+\\) ${trans('newMessageTitle', null, 'New message')}$`),
    );

    useEffect(() => {
        try {
            pageTitle.current = window.parent.document.title;
        } catch {
            noPermission.current = true;
        }
    }, []);

    useEffect(() => {
        if (noPermission.current) {
            return undefined;
        }
        if (titleChangeInterval.current) {
            clearInterval(titleChangeInterval.current);
            titleChangeInterval.current = null;
        }
        try {
            if (!isPageVisible && unreadMessages) {
                titleChangeInterval.current = setInterval(() => {
                    if (
                        pageTitle.current !== window.parent.document.title &&
                        !newTitleMessageRegex.test(window.parent.document.title)
                    ) {
                        pageTitle.current = window.parent.document.title;
                    }
                    if (window.parent.document.title === pageTitle.current) {
                        window.parent.document.title = `(${unreadMessages}) ${trans(
                            'newMessageTitle',
                            null,
                            'New message',
                        )}`;
                    } else {
                        window.parent.document.title = pageTitle.current;
                    }
                }, 1000);
            } else if (newTitleMessageRegex.test(window.parent.document.title)) {
                window.parent.document.title = pageTitle.current;
            }
        } catch {
            //
        }
        return (): void => {
            if (noPermission.current) {
                return undefined;
            }
            if (titleChangeInterval.current) {
                clearInterval(titleChangeInterval.current);
                titleChangeInterval.current = null;
            }
            try {
                if (newTitleMessageRegex.test(window.parent.document.title)) {
                    window.parent.document.title = pageTitle.current;
                }
            } catch {
                //
            }
            return undefined;
        };
    }, [isPageVisible, unreadMessages, newTitleMessageRegex]);

    return null;
};

export default PageTitleManager;
