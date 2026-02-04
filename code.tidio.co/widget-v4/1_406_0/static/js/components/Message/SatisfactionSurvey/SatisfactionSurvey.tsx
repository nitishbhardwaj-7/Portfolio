import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ravenCaptureException } from '../../../helpers/raven';
import { trans } from '../../../helpers/translations';
import { getSurveyScale } from './helpers';

import { setSatisfactionSurveyConfig } from '../../../store/actions';
import { getSatisfactionSurveyConfig } from '../../../store/selectors';
import { DefaultRootState, MessageType } from '../../../store/typings';
import { AutomaticSurveyMessage } from '../types';
import SatisfactionRateComment from './SatisfactionRateComment';
import SatisfactionRateOptions from './SatisfactionRateOptions';
import SatisfactionSurveyCommented from './SatisfactionSurveyCommented';

type SatisfactionSurveyProps = AutomaticSurveyMessage;

const SatisfactionSurvey = ({
    threadSource,
    threadId,
    messageId,
    type,
    satisfactionSurvey: configFromMessage,
}: SatisfactionSurveyProps): ReactElement | null => {
    const dispatch = useDispatch();
    const surveyConfigFromStorage = useSelector((state: DefaultRootState) =>
        getSatisfactionSurveyConfig(state, threadId),
    );

    if (!surveyConfigFromStorage) {
        if (configFromMessage) {
            dispatch(
                setSatisfactionSurveyConfig(configFromMessage, threadSource, threadId, messageId),
            );
        }
        // if there is message in history, but no actual config, we cannot display survey
        return null;
    }
    const threadSourceWithDefault = surveyConfigFromStorage.threadSource ?? 'conversation';
    const scale = getSurveyScale(surveyConfigFromStorage.scaleType);
    const selectedRating = scale.find(
        (emote) => emote.rating === surveyConfigFromStorage?.response.rating,
    );

    const renderAutomaticSurveyMessage = (): ReactElement | null => {
        switch (type) {
            case MessageType.AUTOMATIC_SURVEY:
                if (surveyConfigFromStorage.response.comment !== null) {
                    return null;
                }

                return (
                    <SatisfactionRateOptions
                        threadSource={threadSourceWithDefault}
                        threadId={threadId}
                        messageId={messageId}
                        scale={scale}
                        selectedRating={selectedRating?.rating}
                        rateQuestion={
                            surveyConfigFromStorage.rateQuestion ||
                            trans('satisfactionSurveyHeader')
                        }
                    />
                );
            case MessageType.AUTOMATIC_SURVEY_RATED:
                if (surveyConfigFromStorage.response.comment !== null) {
                    return null;
                }

                return (
                    <SatisfactionRateComment
                        threadSource={threadSourceWithDefault}
                        threadId={threadId}
                        messageId={messageId}
                        comment={surveyConfigFromStorage.response.comment}
                        commentQuestion={
                            surveyConfigFromStorage.commentQuestion ||
                            trans('satisfactionSurveyCommentOptional')
                        }
                    />
                );
            case MessageType.AUTOMATIC_SURVEY_COMMENTED:
                return (
                    <SatisfactionSurveyCommented
                        rate={surveyConfigFromStorage.response.rating}
                        comment={
                            surveyConfigFromStorage.response.comment ||
                            surveyConfigFromStorage.endMessage
                        }
                    />
                );
            default:
                ravenCaptureException('Automatic satisfaction survey: unreachable case');
                throw new Error('Automatic satisfaction survey: unreachable case');
        }
    };

    return renderAutomaticSurveyMessage();
};

export default SatisfactionSurvey;
