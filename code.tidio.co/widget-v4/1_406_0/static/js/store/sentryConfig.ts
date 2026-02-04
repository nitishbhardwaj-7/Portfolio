import * as Sentry from '@sentry/react';

import { getCurrentUrl } from '../helpers';

export const sentryInit = (appVersion: string | undefined): void => {
    Sentry.init({
        dsn: process.env.NEW_WIDGET_RAVEN_WIDGET_DSN_PUBLIC,
        release: appVersion,
        ignoreErrors: [
            'TypeError: Load failed',
            'TypeError: Failed to fetch',
            'TypeError: NetworkError when attempting to fetch resource.',
            'Object Not Found Matching Id', // MS Outlook SafeLink error
            'AbortError: Fetch is aborted',
        ],
        autoSessionTracking: false,
        maxBreadcrumbs: 30,
        allowUrls: [/tidio/],
        normalizeMaxBreadth: 500,
        integrations: [
            Sentry.thirdPartyErrorFilterIntegration({
                filterKeys: ['tidio-sentry-widget-app-key'],
                behaviour: 'apply-tag-if-exclusively-contains-third-party-frames',
            }),
            Sentry.breadcrumbsIntegration({
                console: false,
                dom: true,
                fetch: true,
                history: true,
                xhr: true,
            }),
        ],
    });
};

export const sentryReduxEnhancer = Sentry.createReduxEnhancer({
    attachReduxState: false,
});

export const setSentryTags = ({
    publicKey,
    originalVisitorId,
    visitorId,
    designVersion,
}: {
    publicKey: string | false;
    visitorId?: string;
    originalVisitorId?: string;
    designVersion?: 4 | 5;
}): void => {
    Sentry.setTags({
        publicKey,
        visitorId,
        originalVisitorId,
        url: getCurrentUrl(),
        designVersion,
    });
};

export const setSentryUserData = (user: Sentry.User): void => {
    Sentry.setUser(user);
};
