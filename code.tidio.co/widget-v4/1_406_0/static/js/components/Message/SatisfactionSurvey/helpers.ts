import { SurveyScales, SurveyValues } from '../../../store/typings';

export const emotesScale: SurveyValues = [
    { value: '😡', rating: 1 },
    { value: '🙁', rating: 2 },
    { value: '😐', rating: 3 },
    { value: '😀', rating: 4 },
    { value: '😍', rating: 5 },
];

export const getSurveyScale = (scale: SurveyScales): SurveyValues => {
    switch (scale) {
        case 'emotes':
            return emotesScale;
        default:
            throw new Error('Unreachable case error');
    }
};
