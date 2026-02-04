import { DefaultRootState } from '../typings';

export function mergeAssignedOperatorsData(
    oldData: DefaultRootState['assignedOperatorsData'],
    newData: DefaultRootState['assignedOperatorsData'],
): DefaultRootState['assignedOperatorsData'] {
    return [
        ...newData,
        ...oldData.filter(
            (oldOperators) => !newData.some((newOperator) => newOperator.id === oldOperators.id),
        ),
    ];
}
