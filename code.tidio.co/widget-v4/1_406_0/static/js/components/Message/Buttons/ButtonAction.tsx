import React from 'react';

import useNewSkin from '../../../hooks/useNewSkin';

import { sanitizeAndEmojifyString } from '../../../helpers/ui';

import { getTextStyles } from '../../../styles/text.styles';

type ButtonActionProps = {
    title: string;
    payload: string;
    onClick: (title: string, payload: string) => void;
    cardClicked?: string;
};

const ButtonAction = (props: ButtonActionProps): React.ReactElement => {
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    const handleClick = (): void => {
        let label = props.title;
        if (props.cardClicked) {
            label = `${props.cardClicked} &rarr; ${props.title}`;
        }

        props.onClick(props.payload, label);
    };

    return (
        <button type="button" title={props.title} onClick={handleClick}>
            <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: sanitizeAndEmojifyString(props.title),
                }}
                css={textStyles.text14}
            />
        </button>
    );
};

export default ButtonAction;
