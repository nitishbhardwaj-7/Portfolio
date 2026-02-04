const events = [
    'widget_ws_initial_connection_in_ms',
    'widget_js_total_load_in_ms',
    'widget_total_load_in_ms',
    'widget_ws_reconnect_time_in_ms',
    'widget_ws_reconnect_attempts',
] as const;

export const NON_INITIAL_EVENTS: string[] = [
    'widget_ws_reconnect_time_in_ms',
    'widget_ws_reconnect_attempts',
];

export const REQUIRED_EVENTS_FOR_INITIAL = events.filter(
    (event) => !NON_INITIAL_EVENTS.includes(event),
);

export const knownRequiredEventsLength = REQUIRED_EVENTS_FOR_INITIAL.length;

export type Event = (typeof events)[number];

export type EventMark = 'start' | 'end';
