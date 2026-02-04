import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { ravenCaptureException } from '../helpers/raven';

import { setPageVisiblityStatus } from '../store/actions';
import { getIsChatOnSite } from '../store/selectors';
import AppOnLeft from './AppVariations/AppOnLeft';
import AppOnRight from './AppVariations/AppOnRight';
import AppWithSidebar from './AppVariations/AppWithSidebar';
import ChatOnSiteApp from './AppVariations/ChatOnSiteApp';
import PageTitleManager from './PageTitleManager';
import VideoCallProvider from './VideoCall/VideoCallContext';

class App extends Component {
    componentDidMount() {
        try {
            window.document.addEventListener('visibilitychange', this.onWindowVisibilityChange);
            this.setVisibilityState();
        } catch (e) {
            ravenCaptureException(e);
        }

        window.tidioChatApi?.trigger(
            'setStatus',
            this.props.isProjectOnline ? 'online' : 'offline',
        );
    }

    componentDidUpdate(prevProps) {
        // we need to manually set iframe's inline styles here
        const widgetPositionHasChanged = prevProps.widgetPosition !== this.props.widgetPosition;
        if (widgetPositionHasChanged) {
            this.props.setWidgetPosition(this.props.widgetPosition);
        }
    }

    componentWillUnmount() {
        window.document.removeEventListener('visibilitychange', this.onWindowVisibilityChange);
    }

    setVisibilityState() {
        const { visibilityState } = document;
        if (visibilityState !== 'visible') {
            this.props.dispatch(setPageVisiblityStatus(false));
            return false;
        }
        this.props.dispatch(setPageVisiblityStatus(true));
        return true;
    }

    onWindowVisibilityChange = () => {
        this.setVisibilityState();
    };

    appAvariant = () => {
        if (this.props.isChatOnSite) {
            return <ChatOnSiteApp widgetPosition={this.props.widgetPosition} />;
        }
        if (this.props.isSidebarEnabled) {
            return <AppWithSidebar />;
        }

        if (this.props.widgetPosition === 'left') {
            return <AppOnLeft />;
        }
        return <AppOnRight />;
    };

    render() {
        return (
            <>
                {!this.props.isSoundEnabled && <PageTitleManager />}
                <VideoCallProvider>{this.appAvariant()}</VideoCallProvider>
            </>
        );
    }
}
App.propTypes = {
    widgetPosition: PropTypes.oneOf(['left', 'right']).isRequired,
    setWidgetPosition: PropTypes.func.isRequired,
    isSidebarEnabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    isChatOnSite: PropTypes.bool.isRequired,
    isProjectOnline: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    isSoundEnabled: PropTypes.bool.isRequired,
};

export default connect((store) => ({
    widgetPosition: store.chatIframeStyles.widgetPosition,
    isSidebarEnabled: store.sidebarIframeStyles,
    isChatOnSite: getIsChatOnSite(store),
    isProjectOnline: store.isProjectOnline,
    isSoundEnabled: store.isSoundEnabled,
}))(App);
