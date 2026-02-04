import React, { MouseEvent, ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { getFullParsedUrl, openLink } from '../../../helpers';

import { widgetActivityTracking } from '../../../store/actions';
import { trackingEvents } from '../../../store/activityTrackingHelpers';
import { Download } from '../../svgIcons/SvgIcons';

interface Props {
    buttons: { payload: string; url?: string }[];
}

const ButtonsShopifyCard = ({ buttons }: Props): ReactElement => {
    const dispatch = useDispatch();
    const detailsButton = buttons[0];
    const parsedUrl = getFullParsedUrl(detailsButton.url || detailsButton.payload);

    const handleDetailsButtonClick = (event: MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        dispatch(widgetActivityTracking(trackingEvents.buttonClicked));
        openLink(parsedUrl);
    };

    return (
        <a href={parsedUrl} className="button-icon" onClick={handleDetailsButtonClick}>
            <Download />
        </a>
    );
};

export default ButtonsShopifyCard;
