import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideAlert } from '../../store/actions';
import { getAlertContent } from '../../store/selectors';
import { Alert } from '../svgIcons/SvgIcons';

const AlertMessage = (): ReactElement => {
    const dispatch = useDispatch();
    const content = useSelector(getAlertContent);
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(hideAlert());
        }, 6000);
        return (): void => {
            if (timer !== null) {
                clearTimeout(timer);
            }
        };
    }, [dispatch]);

    return (
        <div
            className="message message-operator message-alert"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <Alert />
            {content}
        </div>
    );
};

export default AlertMessage;
