import React, { ReactElement } from 'react';

import Translation from '../Translation';

const TicketCreatedMessage = (): ReactElement => (
    <div className="message message-operator">
        <Translation value="ticketSubmittedMessage" emojify linkify />
    </div>
);

export default TicketCreatedMessage;
