import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { format, isToday, isYesterday } from 'date-fns';

import { trans } from '../../../helpers/translations';

import { getOperatorAvatarSrc, getOperatorName } from '../../../store/selectors';
import { DefaultRootState } from '../../../store/typings';

const dateStringFormat = (timestamp: number): string => {
    const parsedDate = new Date(timestamp * 1000);
    if (isToday(parsedDate)) {
        return trans('timeToday', null, 'Today');
    }
    if (isYesterday(parsedDate)) {
        return trans('timeYesterday', null, 'Yesterday');
    }
    return format(parsedDate, 'd/M/yyyy');
};

const renderOperatorName = (name: string): ReactElement => (
    <span className="timestamp-operator">{`${name} - `}</span>
);

const OperatorInfo = (props: { operatorId: number }): ReactElement => {
    const operatorAvatarSrc = useSelector((store: DefaultRootState) =>
        getOperatorAvatarSrc(store, props.operatorId),
    );
    const operatorName = useSelector((store: DefaultRootState) =>
        getOperatorName(store, props.operatorId),
    );
    const style = operatorAvatarSrc
        ? {
              backgroundImage: `url('${operatorAvatarSrc}')`,
          }
        : null;
    return (
        <>
            {style && <span className="timestamp-avatar" style={style} />}
            {renderOperatorName(operatorName)}
        </>
    );
};

interface MessageTimestampProps {
    time: number;
    isAIAssistant?: boolean;
    aiAssistantName?: string;
    operatorId?: number;
}

const MessageTimestamp = ({
    operatorId,
    isAIAssistant,
    aiAssistantName,
    time,
}: MessageTimestampProps): ReactElement => (
    <div className="messageTimestamp">
        {operatorId && <OperatorInfo operatorId={operatorId} />}
        {isAIAssistant && aiAssistantName && renderOperatorName(`${aiAssistantName} AI Agent`)}
        {`${dateStringFormat(time)}, ${format(new Date(time * 1000), 'H:mm')}`}
    </div>
);

export default MessageTimestamp;
