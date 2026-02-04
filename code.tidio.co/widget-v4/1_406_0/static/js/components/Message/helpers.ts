import { RefObject } from 'react';

import { parseUrl } from '../../helpers';
import { getWindowRef } from '../../helpers/focusManager';
import { sanitizeLinkifyAndEmojifyString } from '../../helpers/ui';

const messagePadding = 35;

export const adjustMessageWidth = ({
    spanRef,
    wrapperRef,
    minWidth,
}: {
    spanRef: RefObject<HTMLSpanElement>;
    wrapperRef: RefObject<HTMLDivElement>;
    minWidth?: number;
}): void => {
    const windowRef = getWindowRef();

    if (spanRef && windowRef) {
        windowRef.requestAnimationFrame(() => {
            const initialWidth = (spanRef.current?.offsetWidth ?? 0) + messagePadding;
            const finalWidth = minWidth ? Math.max(initialWidth, minWidth) : initialWidth;
            wrapperRef.current?.style.setProperty('width', `${finalWidth}px`);
        });
    }
};

export const parseContent = (content: string): string => sanitizeLinkifyAndEmojifyString(content);

export const getUrlWithoutProtocol = (url: string): string => {
    const { host, pathname, search, hash } = parseUrl(url) || {};

    return `${host}${pathname}${search}${hash}`;
};

export const isImageElement = (element: EventTarget): element is HTMLImageElement =>
    Object.prototype.toString.call(element) === '[object HTMLImageElement]';
