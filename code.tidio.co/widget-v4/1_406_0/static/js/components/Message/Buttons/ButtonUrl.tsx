import React, { MouseEvent, ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import useNewSkin from '../../../hooks/useNewSkin';

import { getFullParsedUrl, openLink } from '../../../helpers';
import { sanitizeAndEmojifyString } from '../../../helpers/ui';

import { setIframeModal } from '../../../store/actions';
import { MessageType } from '../../../store/typings';
import { getTextStyles } from '../../../styles/text.styles';

type ButtonUrlProps = {
    title: string;
    payload: string;
    url?: string;
    onClick: (title: string, payload: string) => void;
    cardClicked?: string;
    messageType?: MessageType;
};

const ButtonUrl = (props: ButtonUrlProps): ReactElement => {
    const { title, payload, onClick, cardClicked } = props;
    const dispatch = useDispatch();
    const parsedTitle = sanitizeAndEmojifyString(title);
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    // support for cached conversations without the url parameter
    const url = props.url || payload;
    const parsedUrl = getFullParsedUrl(url);

    const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        let label = props.title;
        if (cardClicked) {
            label = `${cardClicked} &rarr; ${title}`;
        }

        onClick(payload, label);

        if (props.messageType === MessageType.IFRAME && props.url) {
            dispatch(setIframeModal(props.url));
        } else {
            openLink(parsedUrl);
        }
    };

    return (
        <div className="button-url">
            <a
                className="button-url__anchor"
                href={getFullParsedUrl(url)}
                type="button"
                onClick={handleLinkClick}
                data-testid="buttonUrl" // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: parsedTitle,
                }}
                css={textStyles.text14}
            />
        </div>
    );
};

export default ButtonUrl;
