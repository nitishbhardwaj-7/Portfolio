import { adjustStylesEmitter, getDocumentRef } from '../focusManager';
import { simpleHash } from './simpleHash';

const getStyleId = (styleHash: string): string => `tidio-shadow-styles-${styleHash}`;

export const adjustShadowRootStyles = (styles: unknown): string | undefined => {
    if (typeof styles !== 'string') {
        return undefined;
    }

    const processedStyles = `
        :host {
            all: initial;
            ${styles.replace(/(^|\s)#tidio(\s|{|$)/g, '$1#tidio-chat-root$2')}
        }
    `;
    const styleHash = simpleHash(processedStyles);

    const ref = getDocumentRef();
    if (!ref) {
        const listener = (): void => {
            adjustShadowRootStyles(styles);
            adjustStylesEmitter.off('documentAndWindowRefSet', listener);
        };
        adjustStylesEmitter.on('documentAndWindowRefSet', listener);
        return styleHash;
    }

    const styleId = getStyleId(styleHash);

    const existingStyle = ref.querySelector(`#${styleId}`);
    if (existingStyle) {
        return styleHash;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = processedStyles;
    ref.appendChild(style);

    return styleHash;
};

export const removeShadowRootStyles = (styleHash: unknown): boolean => {
    if (typeof styleHash !== 'string') {
        return false;
    }
    const ref = getDocumentRef();

    if (!ref) {
        const listener = (): void => {
            removeShadowRootStyles(styleHash);
            adjustStylesEmitter.off('documentAndWindowRefSet', listener);
        };
        adjustStylesEmitter.on('documentAndWindowRefSet', listener);
        return true;
    }

    if ('CSS' in window && 'escape' in CSS) {
        const decodedStyle = CSS.escape(styleHash);
        if (decodedStyle !== styleHash) {
            return false;
        }
    }

    try {
        const styleId = getStyleId(styleHash);
        const styleElement = ref.querySelector(`#${styleId}`);
        if (styleElement) {
            styleElement.remove();
            return true;
        }
    } catch {
        return false;
    }

    return false;
};
