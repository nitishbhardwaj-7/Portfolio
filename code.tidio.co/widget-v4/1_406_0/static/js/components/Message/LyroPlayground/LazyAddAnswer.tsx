import React, { Suspense } from 'react';

import { AddAnswerProps } from './AddAnswer';

const AddAnswer = React.lazy(() => import(/* webpackChunkName: "AddAnswer" */ './AddAnswer'));

const LazyAddAnswer = (props: AddAnswerProps): null | React.ReactElement => (
    <Suspense fallback={null}>
        <AddAnswer questionMessageId={props.questionMessageId} />
    </Suspense>
);

export default LazyAddAnswer;
