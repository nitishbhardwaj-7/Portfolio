import React, { ReactElement } from 'react';

import useNewSkin from '../../../hooks/useNewSkin';

import { MessageType, QuickReply } from '../../../store/typings';
import { Options, OptionsLight } from '../../svgIcons/SvgIcons';
import ButtonAction from '../Buttons/ButtonAction';
import ButtonUrl from '../Buttons/ButtonUrl';

type QuickRepliesFlyMessagePresentationalProps = {
    onButtonClick: (title: string, payload: string) => void;
    quickReplies: QuickReply[];
    onMoreButtonClick: () => void;
    maxButtons: number;
    showMoreRepliesButton?: boolean;
    messageType: MessageType;
};

const QuickRepliesFlyMessagePresentational = (
    props: QuickRepliesFlyMessagePresentationalProps,
): ReactElement => {
    const { isNewSkin } = useNewSkin();

    const shouldShowMoreRepliesButtons =
        props.showMoreRepliesButton || props.quickReplies.length > props.maxButtons;
    const quickReplies = shouldShowMoreRepliesButtons
        ? props.quickReplies.slice(0, props.maxButtons - 1)
        : props.quickReplies;
    return (
        <div className="button-wrapper">
            {quickReplies.map((quickReply) => (
                <React.Fragment key={`${quickReply.title}${quickReply.payload}`}>
                    {quickReply.type === 'url' && (
                        <ButtonUrl
                            title={quickReply.title}
                            payload={quickReply.payload}
                            url={quickReply.url}
                            onClick={props.onButtonClick}
                            messageType={props.messageType}
                        />
                    )}

                    {(quickReply.type === 'action' ||
                        quickReply.type === 'bot' ||
                        quickReply.type === 'text') && (
                        <ButtonAction
                            title={quickReply.title}
                            payload={quickReply.payload}
                            onClick={props.onButtonClick}
                        />
                    )}
                </React.Fragment>
            ))}
            {shouldShowMoreRepliesButtons && (
                <button type="button" className="more-replies" onClick={props.onMoreButtonClick}>
                    {isNewSkin ? <OptionsLight /> : <Options />}
                </button>
            )}
        </div>
    );
};

export default QuickRepliesFlyMessagePresentational;
