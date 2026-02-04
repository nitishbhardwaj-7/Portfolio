import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ravenCaptureException } from '../../../helpers/raven';
import { trans } from '../../../helpers/translations';

import {
    getAssignedOperators,
    getAssignedOperatorsData,
    getOperators,
} from '../../../store/selectors';
import { type Operator } from '../../../store/typings';

export type UseAssignedOperators = {
    assignedOperatorsData: Operator[];
    assignedOperatorsNames: string;
};

const useAssignedOperators = (): UseAssignedOperators => {
    const assignedOperators = useSelector(getAssignedOperators);
    const allOperators = useSelector(getOperators);
    const operatorsData = useSelector(getAssignedOperatorsData);

    const assignedOperatorsData: Operator[] = useMemo(
        () =>
            assignedOperators
                .map((assignedOperatorId) => {
                    const operator = allOperators.find((op) => op.id === assignedOperatorId);
                    if (!operator) {
                        return undefined;
                    }
                    const operatorData = operatorsData.find((op) => op.id === assignedOperatorId);
                    if (!operatorData) {
                        return {
                            ...operator,
                            name: '',
                        };
                    }
                    return {
                        ...operator,
                        name: operatorData.name,
                    };
                })
                .filter((operator) => operator !== undefined)
                .slice(0, 3),
        [assignedOperators, allOperators, operatorsData],
    );

    const assignedOperatorsNames = useMemo(() => {
        try {
            if (assignedOperatorsData.length === 0) {
                return '\u00A0';
            }
            if (assignedOperatorsData.length === 1) {
                return assignedOperatorsData[0].name;
            }

            const names = assignedOperatorsData.map((operator) => operator.name);
            const lastTwoNames = names
                .splice(-2)
                .join(` ${trans('widgetHeaderAnd', null, 'and')} `);
            return [...names, lastTwoNames].join(', ');
        } catch (e) {
            ravenCaptureException(e);
            return '\u00A0';
        }
    }, [assignedOperatorsData]);

    return { assignedOperatorsData, assignedOperatorsNames };
};

export default useAssignedOperators;
