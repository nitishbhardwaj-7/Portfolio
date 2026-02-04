import { useEffect } from 'react';

import { getWindowRef } from '../helpers/focusManager';

type ViewportMetaOptions = {
    disableScaling?: boolean;
};

const useViewportMeta = ({ disableScaling = false }: ViewportMetaOptions = {}): void => {
    useEffect(() => {
        if (!disableScaling) {
            return undefined;
        }

        let viewportMeta: HTMLMetaElement | null = null;
        let originalContent = '';

        try {
            const windowRef = getWindowRef();

            if (!windowRef?.parent?.document) {
                return undefined;
            }

            const parentDoc = windowRef.parent.document;
            viewportMeta = parentDoc.querySelector('meta[name="viewport"]');
            originalContent = viewportMeta?.getAttribute('content') || '';
            const hasUserScalable = originalContent.includes('user-scalable=');

            if (!viewportMeta) {
                const newMeta = parentDoc.createElement('meta');
                newMeta.setAttribute('name', 'viewport');
                parentDoc.head.appendChild(newMeta);
                viewportMeta = newMeta;
            }

            if (viewportMeta) {
                const newContent = hasUserScalable
                    ? originalContent.replace(/user-scalable=(yes|no)/, 'user-scalable=no')
                    : `${originalContent}${originalContent ? ', ' : ''}user-scalable=no`;
                viewportMeta.setAttribute('content', newContent);
            }

            return (): void => {
                if (!disableScaling) {
                    return undefined;
                }
                if (!originalContent) {
                    viewportMeta?.remove();
                } else if (hasUserScalable && viewportMeta) {
                    viewportMeta.setAttribute('content', originalContent);
                }
                return undefined;
            };
        } catch {
            return undefined;
        }
    }, [disableScaling]);
};

export default useViewportMeta;
