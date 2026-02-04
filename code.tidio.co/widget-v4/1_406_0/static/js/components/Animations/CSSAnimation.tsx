import React, { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

const CSSAnimation = ({
    children,
    timeout = 200,
    classNames,
    in: inProp,
    ...rest
}: Record<string, unknown> & {
    in: boolean;
    timeout?: number;
    classNames: string;
    children: ReactNode;
}): React.ReactElement => (
    <CSSTransition
        {...rest}
        in={inProp}
        timeout={timeout}
        classNames={classNames}
        mountOnEnter
        unmountOnExit
        appear
    >
        {children}
    </CSSTransition>
);

export default CSSAnimation;
