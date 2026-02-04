import { Dispatch } from 'redux';

import { ravenCaptureException } from '../helpers/raven';

import { judgeMeReviewSent } from '../store/actions';
import { CustomWindow, ParentWindow } from '../store/typings';

type JudgeMeWidgetJqueryObject = {
    jquery: string;
};

type WindowWithJudgeMe = ParentWindow & {
    jdgm?: {
        getFormData: (judgeMeWidget: JudgeMeWidgetJqueryObject) => { rating: string };
    };
    jdgmSettings?: {
        cbRevSubmitSuccess: undefined | ((judgeMeWidget: JudgeMeWidgetJqueryObject) => void);
    };
};

declare let window: CustomWindow & { parent: WindowWithJudgeMe };

function runOnJudgeMeReviewSent(dispatch: Dispatch): void {
    try {
        const { jdgm, jdgmSettings } = window.parent;

        if (jdgmSettings) {
            const originalJudgeMeCallback = jdgmSettings.cbRevSubmitSuccess;

            const modifiedJudgeMeCallback = (judgeMeWidget: JudgeMeWidgetJqueryObject): void => {
                const ratingFormData = jdgm?.getFormData(judgeMeWidget).rating;

                if (ratingFormData) {
                    const rating = parseInt(ratingFormData, 10);

                    if ([1, 2, 3, 4, 5].includes(rating)) {
                        dispatch(judgeMeReviewSent(rating));
                    }
                }

                originalJudgeMeCallback?.(judgeMeWidget);
            };

            jdgmSettings.cbRevSubmitSuccess = modifiedJudgeMeCallback;
        }
    } catch (error) {
        ravenCaptureException('runOnJudgeMeReviewSent error', {
            message: error instanceof Error ? error.message : undefined,
        });
    }
}

export default runOnJudgeMeReviewSent;
