import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import useNewSkin from '../../hooks/useNewSkin';

import { adjustOldGradientsColors, browserNameLowerCase, hexToRgba } from '../../helpers';
import { trans } from '../../helpers/translations';
import { viewProptypeOneOf, views } from '../../helpers/views';

import {
    setChatOpenedState,
    setOpenTab,
    setView,
    toggleEmojiPanel,
    visitorClicksOnChatIcon,
    widgetActivityTracking,
} from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import {
    getAllowClose,
    getAwesomeIframe,
    getIsChatOnSite,
    getMobileButtonSize,
    getView,
} from '../../store/selectors';
import CSSAnimation from '../Animations/CSSAnimation';
import Translation from '../Translation';
import UnreadMessages from '../UnreadMessages';
import { Bubble, Close, NotificationsOff } from '../svgIcons/SvgIcons';

const BASE_SHADOW_STYLES = {
    active: '0px 4px 24px',
    hover: '0px 8px 32px',
};

const AWESOME_SHADOW_STYLES = {
    active: '0px 2px 16px',
    hover: '0px 2px 12px',
};

function getShadowStyles(isAwesomeIframe, status) {
    if (isAwesomeIframe) {
        return AWESOME_SHADOW_STYLES[status];
    }

    return BASE_SHADOW_STYLES[status];
}

class WidgetBubble extends React.Component {
    state = {
        elementHovered: false,
        buttonShadow:
            this.props.widgetColor[3] === '#020610'
                ? `${getShadowStyles(this.props.isAwesomeIframe, 'active')} ${hexToRgba(
                      this.props.widgetColor[3],
                      '.20',
                  )}`
                : `${getShadowStyles(this.props.isAwesomeIframe, 'active')} ${hexToRgba(
                      this.props.widgetColor[3],
                      '.50',
                  )}`,
        isGradientActive: this.props.widgetColor[3] !== '#020610',
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.elementHovered) {
            return {
                buttonShadow: `${getShadowStyles(nextProps.isAwesomeIframe, 'active')} ${hexToRgba(
                    nextProps.widgetColor[3],
                    prevState.isGradientActive ? '.50' : '.20',
                )}`,
            };
        }
        if (prevState.elementHovered) {
            return {
                buttonShadow: `${getShadowStyles(nextProps.isAwesomeIframe, 'hover')} ${hexToRgba(
                    nextProps.widgetColor[3],
                    prevState.isGradientActive ? '.24' : '.20',
                )}`,
            };
        }
        return null;
    }

    onBubbleClick = (ev) => {
        const { dispatch, view } = this.props;
        const { chat, closed, fly } = views;
        const isTriggeredFromKeybord = ev.nativeEvent.pageX === 0 && ev.nativeEvent.pageY === 0;
        if (!isTriggeredFromKeybord) {
            ev.currentTarget.blur();
        }

        if (view === closed) {
            dispatch(widgetActivityTracking(trackingEvents.widgetIconClicked));
            dispatch(visitorClicksOnChatIcon());
            dispatch(setChatOpenedState(true));
            return undefined;
        }
        if (view === fly) {
            dispatch(setView(chat));
            dispatch(setOpenTab('conversations'));
            return undefined;
        }
        if (!this.props.allowClose) {
            return undefined;
        }
        dispatch(widgetActivityTracking(trackingEvents.chatClosed));
        dispatch(toggleEmojiPanel(false));
        dispatch(setChatOpenedState(false));
        return undefined;
    };

    setHoverShadow = () => {
        this.setState({
            elementHovered: true,
        });
    };

    setDefaultShadow = () => {
        this.setState({
            elementHovered: false,
        });
    };

    render() {
        const { isChatOnSite, view, isNewSkin, isMobile, allowClose } = this.props;
        const isNotClosed = view !== views.closed && allowClose;
        const isIconMessage = view === views.closed || view === views.fly || !allowClose;
        const sidebarFontColor = this.props.sidebar.fontColor || '#fff';
        if (view === 'chat' && (!isNewSkin || isMobile || (isChatOnSite && !isMobile))) {
            return null;
        }

        return (
            <div
                id="button"
                data-testid="widgetButton"
                className={`${this.props.isSidebarComponent ? 'sidebar' : ''} ${
                    isNotClosed ? 'chat-open' : 'chat-closed'
                } mobile-size__${this.props.mobileButtonSize}`}
                aria-label={isNewSkin && isNotClosed ? trans('minimize', null, 'Minimize') : ''}
            >
                {this.props.isSidebarComponent && (
                    <div // eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
                        className="sidebar-content"
                        style={{
                            background: this.props.sidebar.color,
                            color: sidebarFontColor,
                        }}
                        onClick={this.onBubbleClick}
                    >
                        <span>
                            <Translation value="sidebarLabel" />
                        </span>
                    </div>
                )}
                <button
                    type="button"
                    id="button-body"
                    data-testid="widgetButtonBody"
                    onClick={this.onBubbleClick}
                    style={{
                        boxShadow: isNewSkin
                            ? '0px 2px 8px 0px #080F1A14, 0px 2px 2px 0px #080F1A1F'
                            : this.state.buttonShadow,
                    }}
                    onMouseEnter={this.setHoverShadow}
                    onMouseLeave={this.setDefaultShadow}
                    className={browserNameLowerCase}
                    tabIndex="0"
                    aria-label={
                        isNotClosed
                            ? trans('closeWidget', null, 'Close chat widget')
                            : trans('openWidget', null, 'Open chat widget')
                    }
                >
                    <i
                        className={`material-icons type1 for-closed ${
                            isIconMessage ? 'active' : ''
                        }`}
                        style={{
                            color: 'var(--custom-text-color, #fff)',
                        }}
                    >
                        <Bubble />
                    </i>
                    <i
                        className={`material-icons type1 for-opened ${
                            isIconMessage ? '' : 'active'
                        }`}
                        style={{
                            color: 'var(--custom-text-color, #fff)',
                        }}
                    >
                        <Close />
                    </i>
                </button>
                {!this.props.isSidebarComponent && (
                    <>
                        {view !== 'chat' && <UnreadMessages />}
                        <CSSAnimation
                            classNames="scale"
                            in={this.props.isSoundEnabled && this.props.areNotificationSnoozed}
                        >
                            <div id="dnd-indicator">
                                <NotificationsOff />
                            </div>
                        </CSSAnimation>
                    </>
                )}
            </div>
        );
    }
}

WidgetBubble.propTypes = {
    dispatch: PropTypes.func.isRequired,
    view: PropTypes.oneOf(viewProptypeOneOf).isRequired,
    areNotificationSnoozed: PropTypes.bool.isRequired,
    widgetColor: PropTypes.arrayOf(PropTypes.string).isRequired,
    sidebar: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            position: PropTypes.string,
            color: PropTypes.string,
        }),
    ]).isRequired,
    isSidebarComponent: PropTypes.bool,
    mobileButtonSize: PropTypes.string.isRequired,
    isSoundEnabled: PropTypes.bool.isRequired,
    isAwesomeIframe: PropTypes.bool.isRequired,
    isChatOnSite: PropTypes.bool.isRequired,
    isNewSkin: PropTypes.bool,
    isMobile: PropTypes.bool.isRequired,
    allowClose: PropTypes.bool.isRequired,
};

WidgetBubble.defaultProps = {
    isSidebarComponent: false,
    isNewSkin: false,
};

const ConnectedWidgetBubble = connect((store) => ({
    view: getView(store),
    widgetColor: adjustOldGradientsColors(store.widgetColor),
    areNotificationSnoozed: store.notificationSnoozed,
    sidebar: store.sidebarIframeStyles,
    mobileButtonSize: getMobileButtonSize(store),
    isSoundEnabled: store.isSoundEnabled,
    isAwesomeIframe: getAwesomeIframe(store),
    isChatOnSite: getIsChatOnSite(store),
    isMobile: store.isMobile,
    allowClose: getAllowClose(store),
}))(WidgetBubble);

const WidgetBubbleWrapper = ({ isSidebarComponent }) => {
    const { isNewSkin } = useNewSkin();

    return <ConnectedWidgetBubble isNewSkin={isNewSkin} isSidebarComponent={isSidebarComponent} />;
};

WidgetBubbleWrapper.propTypes = {
    isSidebarComponent: PropTypes.bool,
};

WidgetBubbleWrapper.defaultProps = {
    isSidebarComponent: false,
};

export default WidgetBubbleWrapper;
