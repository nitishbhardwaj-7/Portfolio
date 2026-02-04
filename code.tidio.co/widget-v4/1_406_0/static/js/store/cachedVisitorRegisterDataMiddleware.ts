import { Dispatch, Middleware } from 'redux';

import { cloneDeep } from '../helpers';

import { ActionTypes, VISITOR_REGISTER_IMPORT_DATA } from './actions';
import { saveKeyToStorage } from './savedState';
import { VisitorRegisterImportData } from './typings';

export default function cachedVisitorRegisterDataMiddleware(
    lsCache: undefined | null | VisitorRegisterImportData['widget_data'],
): Middleware {
    return () =>
        (next) =>
        (action: ActionTypes): ReturnType<Dispatch> => {
            switch (action.type) {
                case VISITOR_REGISTER_IMPORT_DATA: {
                    if (lsCache) {
                        const serverCacheHash = action?.data?.widget_data?.cache_hash;
                        const isLocalCacheValid =
                            lsCache.cache_hash === serverCacheHash ||
                            typeof serverCacheHash === 'undefined';
                        if (isLocalCacheValid) {
                            // If the cache is valid, we need to spread the server cache over the local cache
                            const newAction = cloneDeep(action);
                            newAction.data.widget_data = { ...lsCache, ...action.data.widget_data };
                            saveKeyToStorage('cache', newAction.data.widget_data);
                            return next(newAction);
                        }
                        // If the cache is invalid, we need to save the new cache
                        saveKeyToStorage('cache', action?.data?.widget_data);
                        return next(action);
                    }
                    // If there is no local cache, we need to save the new cache
                    saveKeyToStorage('cache', action?.data?.widget_data);
                    return next(action);
                }
                default: {
                    return next(action);
                }
            }
        };
}
