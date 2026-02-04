import React, { Suspense } from 'react';

import ReviewSources, { ReviewSourcesProps } from './ReviewSources';

const LazyReviewSources = (props: ReviewSourcesProps): null | React.ReactElement => (
    <Suspense fallback={null}>
        <ReviewSources
            questionMessageId={props.questionMessageId}
            messageId={props.messageId}
            aiAssistantActionLogId={props.aiAssistantActionLogId}
        />
    </Suspense>
);

export default LazyReviewSources;
