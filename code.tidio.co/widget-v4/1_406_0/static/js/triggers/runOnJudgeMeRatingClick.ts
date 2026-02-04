import debounce from 'lodash.debounce';
import { Dispatch } from 'redux';

import { ravenCaptureException } from '../helpers/raven';

import { judgeMeRatingClick } from '../store/actions';
import { CustomWindow } from '../store/typings';

declare let window: CustomWindow;

let ratingClickListener: ((event: MouseEvent) => void) | undefined;

function hasMessageProperty(object: unknown): object is { message: string } {
    return Boolean(
        object &&
        typeof object === 'object' &&
        Object.prototype.hasOwnProperty.call(object, 'message') &&
        typeof (object as { message: unknown }).message === 'string',
    );
}

function runOnJudgeMeRatingClick(dispatch: Dispatch): void {
    try {
        if (ratingClickListener) {
            window.parent.document.removeEventListener('click', ratingClickListener);
        }

        const onStarClick = debounce((rating: number) => {
            dispatch(judgeMeRatingClick(rating));
        }, 2000);

        ratingClickListener = ({ target }): void => {
            if (
                target instanceof window.parent.HTMLElement &&
                target.classList.contains('jdgm-star')
            ) {
                const rating = target.dataset.alt && parseInt(target.dataset.alt, 10);

                if (typeof rating === 'number' && [1, 2, 3, 4, 5].includes(rating)) {
                    onStarClick(rating);
                }
            }
        };

        window.parent.document.addEventListener('click', ratingClickListener);
    } catch (error) {
        const message = hasMessageProperty(error) ? error.message : undefined;

        ravenCaptureException('runOnJudgeMeRatingClick error', { message });
    }
}

export default runOnJudgeMeRatingClick;
