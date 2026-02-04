import React, { ReactNode } from 'react';

import { getSandboxParams, isInSandboxMode } from '../../helpers';
import { parseMarkdown } from '../../helpers/ui';
import { extractYouTubeUrl } from './YouTubePreview/helpers';

import { MessageSender, MessageType } from '../../store/typings';
import AlwaysOnlineMessage from './AlwaysOnlineMessage';
import BotTextMessage from './BotTextMessage';
import ButtonsMessage from './Buttons/ButtonsMessage';
import CardGallery from './CardGallery/CardGallery';
import ConversationMarkedAsSolvedMessage from './ConversationMarkedAsSolvedMessage';
import CouponCodeMessage from './CouponCodeMessage';
import Form from './Form/Form';
import IframeMessage from './IframeMessage/IframeMessage';
import LazyAddAnswer from './LyroPlayground/LazyAddAnswer';
import LazyReviewSources from './LyroPlayground/LazyReviewSources';
import OperatorMessage from './OperatorMessage/OperatorMessage';
import PreChatMessage from './PrechatMessage/PreChatMessage';
import QuickRepliesButtons from './QuickReplies/QuickRepliesButtons';
import RateConversationCommentMessage from './RateConversationCommentMessage';
import RateConversationMessage from './RateConversationMessage';
import RecommendProducts from './RecommendProducts/RecommendProducts';
import SatisfactionSurvey from './SatisfactionSurvey/SatisfactionSurvey';
import SystemMessage from './SystemMessage';
import TicketCreatedMessage from './TicketCreatedMessage';
import UploadedFileMessage from './UploadedFileMessage';
import UploadingFileMessageUploadService from './UploadingFileMessageUploadService';
import VisitorMessage from './VisitorMessage/VisitorMessage';
import { MessageTypes as MessageProps } from './types';

const MessageComponent = (props: MessageProps): ReactNode => {
    switch (props.type) {
        case MessageType.PRECHAT:
            return <PreChatMessage {...props} />;
        case MessageType.RATE_CONVERSATION:
            return <RateConversationMessage {...props} />;
        case MessageType.RATE_COMMENT_GOOD:
        case MessageType.RATE_COMMENT_BAD:
            return <RateConversationCommentMessage {...props} />;
        case MessageType.ALWAYS_ONLINE:
            return <AlwaysOnlineMessage />;
        case MessageType.UPLOADING_FILE:
            return <UploadingFileMessageUploadService {...props} />;
        case MessageType.UPLOADED_FILE:
            return (
                <>
                    <UploadedFileMessage {...props} />
                    {props.quickReplies && props.quickReplies.length > 0 && !props.disabled && (
                        <div className="message message-operator bots-quick-replies">
                            <QuickRepliesButtons
                                quickReplies={props.quickReplies}
                                messageId={props.id}
                                disabled={props.disabled}
                            />
                        </div>
                    )}
                </>
            );
        case MessageType.SYSTEM:
            return <SystemMessage {...props} />;
        case MessageType.CARD_GALLERY:
            return <CardGallery {...props} />;
        case MessageType.BUTTONS:
            return <ButtonsMessage {...props} />;
        case MessageType.COUPON_CODE:
            return <CouponCodeMessage {...props} />;
        case MessageType.CONVERSATION_MARKED_AS_SOLVED:
            return <ConversationMarkedAsSolvedMessage {...props} />;
        case MessageType.AUTOMATIC_SURVEY:
        case MessageType.AUTOMATIC_SURVEY_RATED:
        case MessageType.AUTOMATIC_SURVEY_COMMENTED:
            return <SatisfactionSurvey {...props} />;
        case MessageType.CREATE_TICKET_SUCCESS:
            return <TicketCreatedMessage />;
        case MessageType.FORM:
            return <Form {...props} />;
        case MessageType.FORM_RESPONSE:
            return null;
        case MessageType.IFRAME:
            return <IframeMessage {...props.iframe} />;
        case MessageType.RECOMMENDED_PRODUCTS:
            return (
                <RecommendProducts
                    {...props.recommendedProducts}
                    chatBotId={props.chatBotId}
                    messageId={props.id}
                />
            );
        case MessageType.TEXT: {
            switch (props.sender) {
                case MessageSender.OPERATOR:
                    return <OperatorMessage {...props} />;
                case MessageSender.BOT: {
                    const {
                        aiAssistantResponseType,
                        hasAiAssistantAnswerSources,
                        questionMessageId,
                        aiAssistantActionLogId,
                    } = props;
                    const isLyroPlayground =
                        isInSandboxMode() && getSandboxParams()?.isLyroPlayground;
                    const showAddAnswerButton =
                        isLyroPlayground && aiAssistantResponseType === 'knowledge_missing';
                    const showReviewSourcesButton =
                        (hasAiAssistantAnswerSources || aiAssistantActionLogId) &&
                        isLyroPlayground &&
                        questionMessageId &&
                        !showAddAnswerButton;
                    const youtubeUrl = extractYouTubeUrl(props.content);
                    return (
                        <>
                            <BotTextMessage
                                {...props}
                                content={parseMarkdown(props.content)}
                                youtubeUrl={youtubeUrl}
                            />
                            {props.quickReplies &&
                                props.quickReplies.length > 0 &&
                                !props.disabled && (
                                    <div className="message message-operator bots-quick-replies">
                                        <QuickRepliesButtons
                                            quickReplies={props.quickReplies}
                                            messageId={props.id}
                                            disabled={props.disabled}
                                            metadata={{
                                                is_ai_assistant_task: props.aiAssistantTask,
                                            }}
                                        />
                                    </div>
                                )}
                            {showAddAnswerButton && (
                                <LazyAddAnswer questionMessageId={questionMessageId} />
                            )}
                            {showReviewSourcesButton && (
                                <LazyReviewSources
                                    questionMessageId={questionMessageId}
                                    messageId={props.idFromServer}
                                    aiAssistantActionLogId={aiAssistantActionLogId}
                                />
                            )}
                        </>
                    );
                }
                case MessageSender.VISITOR:
                    return <VisitorMessage {...props} />;
                default:
                    return null;
            }
        }
        default:
            return null;
    }
};

export default MessageComponent;
