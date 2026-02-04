import { getOperatorStatus } from '../../store/selectors';
import { MessageSender, MessageType, ParentWindow } from '../../store/typings';

export type ParentWindowWithGA = ParentWindow & {
    gtag?: (...params: unknown[]) => void;
    ga?: (...params: unknown[]) => void;
    _gaq?: {
        push: (...params: unknown[]) => void;
    };
    __gaTracker?: (...params: unknown[]) => void;
    dataLayer?: {
        push: (...params: unknown[]) => void;
    };
};

export enum GoogleTrackerType {
    GTAG = 'gtag',
    DATA_LAYER = 'dataLayer',
}

type OperatorStatus = ReturnType<typeof getOperatorStatus>;

type CustomGoogleEvent = {
    type: 'custom';
    eventName: string;
    params?: Record<string, unknown>;
};

type PredefinedGoogleEvent = {
    type?: never;
    params?: Record<string, unknown>;
} & (
    | {
          eventName: 'tidio_conversation_started';
          params: {
              visitor_id: string | undefined;
              source: MessageSender;
              operator_status: OperatorStatus;
          };
      }
    | {
          eventName: 'tidio_conversation_started';
          params: {
              visitor_id: string | undefined;
              source: 'chatbot';
              chatbot_name: string | undefined;
              message_type: MessageType;
              operator_status: OperatorStatus;
          };
      }
    | {
          eventName: 'tidio_prechat_started';
          params: {
              email: boolean;
              phone: boolean;
              name: boolean;
              consent_given: boolean;
          };
      }
    | {
          eventName: 'tidio_prechat_finished';
          params: {
              email: boolean;
              phone: boolean;
              name: boolean;
              consent_given: boolean;
          };
      }
    | {
          eventName: 'tidio_widget_open';
          params: {
              visitor_id: string | undefined;
          };
      }
    | {
          eventName: 'tidio_widget_close';
          params: {
              visitor_id: string | undefined;
          };
      }
    | {
          eventName: 'tidio_conversation_reply';
          params: {
              visitor_id: string | undefined;
              source: 'offline_message';
              message_type: MessageType;
              operator_status: OperatorStatus;
          };
      }
    | {
          eventName: 'tidio_widget_visitor_started_bot';
          params: {
              visitor_id: string | undefined;
          };
      }
    | {
          eventName: 'tidio_widget_mute_notifications';
          params: {
              visitor_id: string | undefined;
          };
      }
    | {
          eventName: 'tidio_conversation_rated';
          params: {
              thread_id: number;
              visitor_id: string | undefined;
              rating: number | null;
          };
      }
);

export type GoogleEvent = PredefinedGoogleEvent | CustomGoogleEvent;
