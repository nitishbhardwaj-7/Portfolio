export const parseKnownCause = (cause: unknown): { limitInMB: number } | null => {
    if (
        cause &&
        typeof cause === 'object' &&
        'limitInMB' in cause &&
        cause.limitInMB !== null &&
        typeof cause.limitInMB === 'number'
    ) {
        return { limitInMB: cause.limitInMB };
    }
    return null;
};
