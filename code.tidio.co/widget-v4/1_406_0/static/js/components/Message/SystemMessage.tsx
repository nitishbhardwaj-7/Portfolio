import React, { ReactElement } from 'react';

import { parseContent } from './helpers';

import { SystemMessage } from './types';

type SystemMessageProps = SystemMessage;

const SystemMessageComponent = (props: SystemMessageProps): ReactElement => {
    const content = parseContent(props.content);

    return (
        <div className="message message-operator">
            {/* eslint-disable-next-line react/no-danger */}
            <span className="message-content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default SystemMessageComponent;
