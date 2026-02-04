import React, { ReactNode } from 'react';

import MobileUrlObserver from './MobileUrlObserver';
import UrlStateObserver from './UrlStateObserver';

const UrlObservers = (): ReactNode => (
    <>
        <MobileUrlObserver />
        <UrlStateObserver />
    </>
);

export default UrlObservers;
