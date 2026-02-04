import * as Sentry from '@sentry/react';

// copy from ./index.js because i do not think that it is worth creating another helpers file to omit deps cycle
export const IS_LOCAL_PROD_BUILD =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    typeof PRODUCTION_DEVELOPMENT_BUILD === 'boolean' && PRODUCTION_DEVELOPMENT_BUILD === true;

export const ravenCaptureException = (
    message: unknown,
    extra: Record<string, unknown> = {},
): void => {
    let formattedException = message;
    if (typeof message === 'string') {
        const error = new Error(message);
        error.name = message;
        formattedException = error;
    }
    if (process.env.NODE_ENV === 'development' || IS_LOCAL_PROD_BUILD) {
        // eslint-disable-next-line no-console
        console.log('[SENTRY EXCEPTION]', message, extra);
    } else {
        Sentry.withScope((scope) => {
            if (extra) {
                scope.setExtras(extra);
            }
            scope.setLevel('warning');
            Sentry.captureException(formattedException);
        });
    }
};

export const ravenCaptureInfo = (message: string, extra: Record<string, unknown> = {}): void => {
    if (process.env.NODE_ENV === 'development' || IS_LOCAL_PROD_BUILD) {
        // eslint-disable-next-line no-console
        console.log('[SENTRY INFO]', message, extra);
    } else {
        Sentry.withScope((scope) => {
            if (extra) {
                scope.setExtras(extra);
            }
            scope.setLevel('info');

            Sentry.captureMessage(message);
        });
    }
};
