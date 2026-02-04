import React, { ReactNode } from 'react';

import CSSAnimation from './CSSAnimation';

const Fade = (
    props: Record<string, unknown> & { in: boolean; children: ReactNode },
): React.ReactElement => (
    <CSSAnimation {...props} in={props.in} classNames="fade">
        {props.children}
    </CSSAnimation>
);

export default Fade;
