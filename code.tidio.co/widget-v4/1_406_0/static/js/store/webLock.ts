import { extractPublickeyFromScriptTag, isInDesignMode } from '../helpers';

/**
 * Readers-writer lock implementation using Web Locks API with fallback
 *
 * Web Locks API provides exclusive and shared lock modes which map perfectly to writer and reader locks:
 * - 'exclusive' mode: for write operations (only one writer at a time)
 * - 'shared' mode: for read operations (multiple readers can read simultaneously)
 *
 * For browsers without Web Locks API support, we provide a no-op fallback that executes
 * the callback immediately without locking.
 */

let lockNameCache: string | null = null;

const getLockName = (): string => {
    if (!lockNameCache) {
        const publicKey = extractPublickeyFromScriptTag() || 'preview';
        lockNameCache = `tidio_state_lock_${publicKey}`;

        if (isInDesignMode()) {
            lockNameCache += '_designmode';
        }
    }
    return lockNameCache;
};

const isWebLocksAPIAvailable = (): boolean =>
    typeof navigator !== 'undefined' && 'locks' in navigator;

/**
 * Acquire a reader (shared) lock and execute the callback
 * Multiple readers can hold the lock simultaneously
 */
export const withReadLock = async <T>(callback: () => T | Promise<T>): Promise<T> => {
    if (isWebLocksAPIAvailable()) {
        return navigator.locks.request(getLockName(), { mode: 'shared' }, () => callback());
    }

    return callback();
};

/**
 * Acquire a writer (exclusive) lock and execute the callback
 * Only one writer can hold the lock at a time, and no readers can access during write
 */
export const withWriteLock = async <T>(callback: () => T | Promise<T>): Promise<T> => {
    if (isWebLocksAPIAvailable()) {
        return navigator.locks.request(getLockName(), { mode: 'exclusive' }, () => callback());
    }

    return callback();
};
