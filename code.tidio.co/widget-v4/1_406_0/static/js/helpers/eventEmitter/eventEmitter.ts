import mitt from 'mitt';

import { EmitterEvents } from './EmitterEvents';

const emitter = mitt<EmitterEvents>();

function publish<E extends keyof EmitterEvents, D extends EmitterEvents[E]>(
    event: E,
    data: D,
): void {
    emitter.emit(event, data);
}

function subscribe<E extends keyof EmitterEvents, D extends EmitterEvents[E]>(
    event: E,
    callback: (data: D) => void,
): () => void {
    emitter.on(event, callback);
    return (): void => {
        emitter.off(event, callback);
    };
}

export default {
    publish,
    subscribe,
};
