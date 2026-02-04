import { FilledFormField, MessageType } from '../store/typings';

export enum AllowedPreChatFields {
    EMAIL = 'email',
    NAME = 'name',
    PHONE = 'phone',
    GDPR_CONSENT = 'gdprConsent',
    SIGN_UP_NEWSLETTER = 'signUpNewsletter',
    PRECHAT_FIELD_TYPE_EMAIL_CONSENT = 'emailConsent',
}

export type VisitorNewMessageContent = {
    message: string | { type: MessageType; message: string; formResponse?: FilledFormField[] };
    messageId: string;
    url?: string;
    payload?: string;
    metadata?: { is_ai_assistant_task?: boolean };
};
