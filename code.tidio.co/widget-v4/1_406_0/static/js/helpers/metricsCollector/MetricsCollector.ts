import { getIsMobileByUserAgent } from '..';
import { Event, EventMark, REQUIRED_EVENTS_FOR_INITIAL } from './events';

const getUrlWithSlash = (url: string): string => {
    if (url === '' || url.endsWith('/')) {
        return url;
    }
    return `${url}/`;
};

type Metric = { metric: string; value: number };
type Metrics = Metric[];

export class MetricsCollector {
    private metricsCollectorUrl: string | undefined;

    private events: Partial<Record<Event, Record<EventMark, null | number>>> = {};

    private static readonly sendMetricsPercent = 1;

    public static readonly maxDurationTimeoutTime = 60_000; // 1min

    private hasSentInitialMetrics = false;

    private timer: null | ReturnType<typeof setTimeout> = null;

    private timeoutFinished = false;

    private shouldSendMetrics = true;

    constructor() {
        const shouldSendMetrics = Math.random() * 100 < MetricsCollector.sendMetricsPercent;
        if (!shouldSendMetrics) {
            this.shouldSendMetrics = false;
        }
        const url = process.env.METRICS_COLLECTOR_URL;
        if (url) {
            try {
                this.metricsCollectorUrl = getUrlWithSlash(new URL(url).toString());
            } catch {
                // ignore, on some environments we don't have metrics collector service
            }
        }
    }

    private isReadyForSendingMetrics(): boolean {
        const hasAnyMetricsWithoutBothMarks =
            Object.values(this.events).find(
                (value) => value.start === null || value.end === null,
            ) !== undefined;
        const wasAllKnownMetricsProvided = REQUIRED_EVENTS_FOR_INITIAL.filter(
            (event) => !this.events[event],
        );
        return !hasAnyMetricsWithoutBothMarks && wasAllKnownMetricsProvided.length === 0;
    }

    public markDuration(
        eventName: Event,
        markType: EventMark,
        overwriteTime?: number,
        sendSingleMetric?: boolean,
        overrideThreashold?: boolean,
    ): void {
        {
            const event = this.events[eventName];
            if (!event) {
                this.events[eventName] = {
                    start: null,
                    end: null,
                };
            }
        }
        const event = this.events[eventName];
        if (event) {
            event[markType] = overwriteTime || Date.now();
        }
        const hasAllMetricsBothMarks = Object.values(this.events).every(
            (metric) => metric.start !== null && metric.end !== null,
        );
        if (hasAllMetricsBothMarks) {
            this.sendInitialMetrics();
        }
        if (sendSingleMetric) {
            this.sendMetrics([eventName], Boolean(overrideThreashold));
        }
    }

    public setNumericValue(eventName: Event, value: number, sendSingleMetric?: boolean): void {
        {
            const event = this.events[eventName];
            if (!event) {
                this.events[eventName] = {
                    start: 0,
                    end: null,
                };
            }
        }
        const event = this.events[eventName];
        if (event) {
            event.start = 0;
            event.end = value;
        }

        if (sendSingleMetric) {
            this.sendMetrics([eventName]);
        }
    }

    private async sendData(metrics: Metrics): Promise<void> {
        if (!this.metricsCollectorUrl) {
            return undefined;
        }
        try {
            await fetch(`${this.metricsCollectorUrl}metrics/WidgetRegistry/observe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    metrics,
                    deviceType: getIsMobileByUserAgent() ? 'mobile' : 'desktop',
                }),
            });
        } catch {
            // There is error here when someone has some kind of adblock here or mobile safari and fails to fetch.
            // We know it exists but we are not interested in it
        }
        return undefined;
    }

    public async sendInitialMetrics(): Promise<void> {
        if (!this.shouldSendMetrics) {
            return undefined;
        }
        if (this.hasSentInitialMetrics) {
            return undefined;
        }
        if (!this.metricsCollectorUrl) {
            return undefined;
        }

        const metrics = this.collectInitialMetrics();
        if (!metrics) {
            return undefined;
        }
        await this.sendData(metrics);
        this.hasSentInitialMetrics = true;
        return undefined;
    }

    public async sendMetrics(metrics: Event[], overrideThreashold?: boolean): Promise<void> {
        if (!overrideThreashold && !this.shouldSendMetrics) {
            return undefined;
        }
        if (!this.metricsCollectorUrl) {
            return undefined;
        }
        const metricsData = metrics
            .filter((metric) => {
                const end = this.events[metric]?.end;
                const start = this.events[metric]?.start;
                if (typeof end === 'number' && typeof start === 'number') {
                    return true;
                }
                return false;
            })
            .map((metric) => {
                const end = this.events[metric]?.end || 0;
                const start = this.events[metric]?.start || 0;
                return {
                    metric,
                    value: end - start,
                };
            });

        this.sendData(metricsData);
        for (let i = 0; i < metrics.length; i += 1) {
            this.events[metrics[i]] = {
                start: null,
                end: null,
            };
        }
        this.hasSentInitialMetrics = true;
        return undefined;
    }

    private collectInitialMetrics(): null | Metrics {
        if (!this.timer && !this.isReadyForSendingMetrics()) {
            this.timer = setTimeout(() => {
                this.timeoutFinished = true;
                this.sendInitialMetrics();
            }, MetricsCollector.maxDurationTimeoutTime);
            return null;
        }
        if (!this.timeoutFinished && !this.isReadyForSendingMetrics()) {
            return null;
        }
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        const metrics: Metrics = [];
        Object.entries(this.events).forEach(([eventName, event]) => {
            if (event.start && event.end) {
                metrics.push({
                    metric: eventName,
                    value: event.end - event.start,
                });
            } else if (event.start && !event.end) {
                metrics.push({
                    metric: eventName,
                    value: MetricsCollector.maxDurationTimeoutTime,
                });
            }
        });
        if (metrics.length === 0) {
            return null;
        }
        return metrics;
    }
}

let instance: MetricsCollector | null = null;
export function getMetricsCollectorInstance(): MetricsCollector {
    if (!instance) {
        instance = new MetricsCollector();
    }
    return instance;
}
