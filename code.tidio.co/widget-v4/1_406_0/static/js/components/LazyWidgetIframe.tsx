import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { getIsChatOnSite } from '../store/selectors';
import { DefaultRootState } from '../store/typings';

const WidgetIframe = React.lazy(
    () => import(/* webpackChunkName: "WidgetIframe" */ './WidgetIframe'),
);

const LazyWidgetIframe = (): null | React.ReactElement => {
    const isMounted = useSelector((store: DefaultRootState) => store.isMounted);
    const hideWhenOffline = useSelector((store: DefaultRootState) => store.hideWhenOffline);
    const isProjectOnline = useSelector((store: DefaultRootState) => store.isProjectOnline);
    const isChatOnSite = useSelector(getIsChatOnSite);

    const shouldHideWhenOffline = hideWhenOffline && !isProjectOnline && !isChatOnSite;

    if (!isMounted || shouldHideWhenOffline) {
        return null;
    }

    return (
        <Suspense fallback={null}>
            <WidgetIframe />
        </Suspense>
    );
};

export default LazyWidgetIframe;
