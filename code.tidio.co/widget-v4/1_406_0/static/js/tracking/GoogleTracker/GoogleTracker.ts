import { PushToEmitQueueFunction } from '@tidio/tidio-chat-connection-manager';

import { assertUnreachable } from '../../helpers';
import { ravenCaptureException } from '../../helpers/raven';

import { fetchGoogleAnalyticsTagId } from '../../connection/emitsTS';
import { getKeyFromStorage, saveKeyToStorage } from '../../store/savedState';
import { CustomWindow, DefaultRootState, IntegrationPlatform } from '../../store/typings';
import { GoogleEvent, GoogleTrackerType, ParentWindowWithGA } from './types';

declare let window: CustomWindow & { parent: ParentWindowWithGA };

type QueuedEvent = {
    method: 'trackEvent' | 'trackEventOnce' | 'trackEventOnceInInterval';
    args: [GoogleEvent] | [GoogleEvent, number];
};

class GoogleTracker {
    private type: GoogleTrackerType | undefined;

    private tagId: string | undefined;

    private trackingFunction: ((event: GoogleEvent) => void) | undefined;

    private isInitialized = false;

    private queue: QueuedEvent[] = [];

    private availableTrackingFunctions: Record<GoogleTrackerType, (event: GoogleEvent) => void> = {
        gtag: (googleEvent) => {
            if (typeof window.parent.gtag !== 'undefined') {
                window.parent.gtag('event', googleEvent.eventName, {
                    ...googleEvent.params,
                    ...(this.tagId ? { send_to: this.tagId } : {}),
                });
            } else {
                this.availableTrackingFunctions.dataLayer(googleEvent);
            }
        },
        dataLayer: (googleEvent) => {
            if (typeof window.parent.dataLayer?.push !== 'undefined') {
                window.parent.dataLayer.push({
                    event: googleEvent.eventName,
                    ...googleEvent.params,
                });
            }
        },
    };

    initialize({
        type,
        tagId,
    }:
        | { type: GoogleTrackerType.DATA_LAYER; tagId?: never }
        | { type: GoogleTrackerType.GTAG; tagId: string | undefined }): void {
        // eslint-disable-next-line no-console
        console.debug('GoogleAnalyticsTracker initialized');

        this.type = type;
        this.tagId = tagId;
        this.trackingFunction = this.availableTrackingFunctions[type];
        this.isInitialized = true;
        this.flushAllFromQueue();
    }

    private addToQueue(method: QueuedEvent['method'], args: QueuedEvent['args']): void {
        this.queue.push({ method, args });

        if (this.isInitialized) {
            this.flushAllFromQueue();
        }
    }

    private flushAllFromQueue(): void {
        if (this.isInitialized && this.trackingFunction) {
            while (this.queue.length !== 0) {
                const queuedEvent = this.queue.shift();

                if (queuedEvent) {
                    const { method, args } = queuedEvent;

                    switch (method) {
                        case 'trackEvent':
                            this.executeTrackEvent(args[0]);
                            break;
                        case 'trackEventOnce':
                            this.executeTrackEventOnce(args[0]);
                            break;
                        case 'trackEventOnceInInterval':
                            this.executeTrackEventOnceInInterval(args[0], args[1]);
                            break;
                        default:
                            assertUnreachable('GoogleTracker.flushAllFromQueue', method);
                    }
                }
            }
        }
    }

    trackEventOnce(event: GoogleEvent): boolean {
        this.addToQueue('trackEventOnce', [event]);
        return true;
    }

    private executeTrackEventOnce(event: GoogleEvent): boolean {
        const eventId = `trackEvent_${event.eventName}`;
        if (getKeyFromStorage(eventId)) {
            return false;
        }
        saveKeyToStorage(eventId, 1);
        // eslint-disable-next-line no-console
        console.debug('GoogleAnalyticsTracker - trackEventOnce', event.eventName);

        this.executeTrackEvent(event);
        return true;
    }

    trackEventOnceInInterval(event: GoogleEvent, interval = 24 * 60 * 60): boolean {
        this.addToQueue('trackEventOnceInInterval', [event, interval]);
        return true;
    }

    private executeTrackEventOnceInInterval(event: GoogleEvent, interval = 24 * 60 * 60): boolean {
        const currentTimestamp = Math.round(Date.now() / 1000);
        const eventId = `trackEvent_${event.eventName}`;
        try {
            const eventTimestamp = parseInt(`${getKeyFromStorage(eventId)}`, 10);
            if (eventTimestamp > 1 && currentTimestamp < eventTimestamp) {
                return false;
            }
            saveKeyToStorage(eventId, currentTimestamp + interval);
        } catch {
            return false;
        }
        return this.executeTrackEvent(event);
    }

    trackEvent(event: GoogleEvent): boolean {
        this.addToQueue('trackEvent', [event]);
        return true;
    }

    private executeTrackEvent(event: GoogleEvent): boolean {
        // eslint-disable-next-line no-console
        console.debug('GoogleAnalyticsTracker - trackEvent', event.eventName);
        try {
            this.trackingFunction?.(event);
        } catch (e) {
            ravenCaptureException(e);
        }

        return true;
    }

    getType(): GoogleTrackerType | undefined {
        return this.type;
    }

    getTagId(): string | undefined {
        return this.tagId;
    }
}

let googleTracker: GoogleTracker | undefined;

export function getGoogleTracker(): GoogleTracker {
    if (googleTracker === undefined) {
        googleTracker = new GoogleTracker();
    }
    return googleTracker;
}

const getGoogleAnalyticsTagId = (
    emit: PushToEmitQueueFunction<DefaultRootState>,
): Promise<string | undefined> =>
    new Promise((resolve) => {
        emit?.(fetchGoogleAnalyticsTagId, ({ tagId }: { tagId?: string }) => {
            resolve(tagId);
        });
    });

export const initGoogleTracker = async ({
    integrationsPlatforms,
    emit,
}: {
    integrationsPlatforms: Array<IntegrationPlatform> | undefined;
    emit: PushToEmitQueueFunction<DefaultRootState>;
}): Promise<void> => {
    const tracker = getGoogleTracker();

    if (integrationsPlatforms) {
        if (integrationsPlatforms.includes(IntegrationPlatform.GOOGLE_ANALYTICS_GA4)) {
            const tagId = await getGoogleAnalyticsTagId(emit);

            tracker.initialize({
                type: GoogleTrackerType.GTAG,
                tagId,
            });
        } else if (integrationsPlatforms.includes(IntegrationPlatform.GOOGLE_TAG_MANAGER)) {
            tracker.initialize({ type: GoogleTrackerType.DATA_LAYER });
        }
    }
};
