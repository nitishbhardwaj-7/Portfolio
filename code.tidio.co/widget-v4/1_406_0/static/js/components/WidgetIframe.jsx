// /* eslint-disable max-classes-per-file */
// import React, { useEffect, useState } from 'react';
// import Iframe, { useFrame } from 'react-frame-component';
// import { connect, useSelector } from 'react-redux';

// import createCache from '@emotion/cache';
// import { CacheProvider, Global } from '@emotion/react';
// import { Globals } from '@react-spring/web';
// import PropTypes from 'prop-types';
// import stylisRTL from 'stylis-plugin-rtl';

// import useNewSkin from '../hooks/useNewSkin';

// import {
//     browserNameLowerCase,
//     firefoxIframeProps,
//     isInPreviewMode,
//     isInTestingMode,
//     isInTour,
// } from '../helpers';
// import { isColorDark } from '../helpers/colors';
// import { setDocumentAndWindowForFocusManager } from '../helpers/focusManager';
// import {
//     awesomeIframeRadius,
//     awesomeIframeStyles,
//     getIframeSizes,
//     iframeViews,
// } from '../helpers/iframe';
// import { getMetricsCollectorInstance } from '../helpers/metricsCollector/MetricsCollector';
// import { ravenCaptureException } from '../helpers/raven';
// import { tryToPlayNotificationSound } from '../helpers/sounds';
// import { isRTL } from '../helpers/translations';
// import { views } from '../helpers/views';

// import { setVisitorWidgetPosition } from '../store/actions';
// import { getKeyFromStorage, saveKeyToStorage } from '../store/savedState';
// import {
//     getAwesomeIframe,
//     getIframeViewDimensions,
//     getIsChatOnSite,
//     getIsMobile,
//     getView,
//     getWidgetColors,
//     getWidgetLabelStatus,
// } from '../store/selectors';
// import { interFontFace, mulishFontFace } from '../styles/fontFace';
// import App from './App';
// import IframeModal from './IframeModal/IframeModal';
// import ShadowRootIframeModal from './IframeModal/ShadowRootIframeModal';
// import ImagePopup from './ImagePopup/ImagePopup';
// import ShadowRootImagePopup from './ImagePopup/ShadowRootImagePopup';
// import UrlObservers from './UrlObservers/UrlObservers';
// import contentStyles from './content.styles';

// const cssPropsToOverrideWithImportant = {
//     zIndex: 'z-index',
//     transition: 'transition',
//     background: 'background',
// };

// getMetricsCollectorInstance().markDuration('widget_total_load_in_ms', 'end');

// export const addImportantToDefaultStyles = (selector) => {
//     try {
//         if (selector) {
//             Object.keys(cssPropsToOverrideWithImportant).forEach((cssProp) => {
//                 selector.style.setProperty(
//                     cssPropsToOverrideWithImportant[cssProp],
//                     selector.style[cssProp],
//                     'important',
//                 );
//             });
//         }
//     } catch {
//         //
//     }
// };

// function adjustBottomIframeStyle(iframe, iframeView, offset) {
//     if (iframe) {
//         if (iframeView === 'mobile') {
//             setTimeout(() => {
//                 iframe.style.setProperty('bottom', offset, 'important');
//             }, 0);
//         } else if (iframeView === 'onlySidebar') {
//             setTimeout(() => {
//                 iframe.style.setProperty('bottom', offset, 'important');
//                 iframe.style.setProperty('transform', 'translateY(50%)', 'important');
//             }, 0);
//         } else {
//             iframe.style.setProperty('bottom', offset);
//         }
//     }
// }

// const isInTest = isInTestingMode();

// const visibilitychangeCallback = () => {
//     Globals.assign({ skipAnimation: document?.visibilityState !== 'visible' });
// };

// /**
//  * This is a workaround to fix the target of touch events in the shadow DOM
//  * external scripts which are not aware of the shadow DOM can't access the real target and get shadow root as target instead
//  * because of that scripts like one below will not work correctly in new skin
//  *
//  * t.prototype.onTouchStart = function(t) {
//  *     var e = this.getTargetElementFromEventTarget(t.target);
//  *     // without this fix: t.target is #shadow-root, so e becomes shadow-root
//  *     // script calls t.preventDefault() on shadow-root instead of the real element
//  *     // this prevents touch interactions from working inside the widget
//  *     this.targetElement = e;
//  *     t.preventDefault(); // this is called on wrong target!
//  *     // ... rest of the logic
//  * };
//  */
// const fixTouchEvent = (event) => {
//     try {
//         let realTarget = event.target;
//         const originalTarget = event.target;

//         if (!realTarget?.shadowRoot) {
//             return undefined;
//         }

//         if (event.composedPath && event.composedPath().length > 0) {
//             const composedPath = event.composedPath();
//             const firstElement = composedPath[0];

//             if (firstElement && firstElement !== realTarget) {
//                 realTarget = firstElement;
//             }
//         }

//         if (realTarget !== originalTarget) {
//             Object.defineProperty(event, 'target', {
//                 value: realTarget,
//                 writable: false,
//                 configurable: true,
//             });

//             if (event.srcElement) {
//                 Object.defineProperty(event, 'srcElement', {
//                     value: realTarget,
//                     writable: false,
//                     configurable: true,
//                 });
//             }
//         }
//     } catch {
//         //
//     }
//     return undefined;
// };

// const touchEventOptions = { capture: true, passive: false };

// const applyListenersForTouchEventFix = () => {
//     try {
//         window.parent.addEventListener('touchstart', fixTouchEvent, touchEventOptions);
//         window.parent.addEventListener('touchend', fixTouchEvent, touchEventOptions);
//         window.parent.addEventListener('touchmove', fixTouchEvent, touchEventOptions);
//     } catch {
//         //
//     }
// };

// const removeListenersForTouchEventFix = () => {
//     try {
//         window.parent.removeEventListener('touchstart', fixTouchEvent, touchEventOptions);
//         window.parent.removeEventListener('touchend', fixTouchEvent, touchEventOptions);
//         window.parent.removeEventListener('touchmove', fixTouchEvent, touchEventOptions);
//     } catch {
//         //
//     }
// };
// // we do not want to export this, no separate file
// class FrameContent extends React.Component {
//     styleCache = createCache({
//         key: 'tidio',
//         stylisPlugins: isRTL() ? [stylisRTL] : [],
//         container: this.props.styleCacheContainer || this.props.iframeDocument.head,
//     });

//     state = {
//         isRendered: false,
//     };

//     constructor(props) {
//         super(props);
//         setDocumentAndWindowForFocusManager(this.props.iframeDocument, this.props.iframeWindow);
//     }

//     componentDidMount() {
//         addImportantToDefaultStyles(this.props.iframeWindow.frameElement);
//         adjustBottomIframeStyle(
//             this.props.iframeWindow.frameElement,
//             this.props.iframeView,
//             this.getBottomOffset(),
//         );
//         if (this.props.isSoundEnabled) {
//             this.registerClickForAutoPlayPermissions();
//         }
//         this.setImportantPositioningForMobileAndSidebar();
//         document?.addEventListener('visibilitychange', visibilitychangeCallback);
//         Globals.assign({
//             requestAnimationFrame: this.props.iframeWindow.requestAnimationFrame,
//             cancelAnimationFrame: this.props.iframeWindow.cancelAnimationFrame,
//         });

//         try {
//             this.props.iframeDocument.addEventListener(
//                 'error',
//                 (event) => {
//                     if (event?.target?.matches('img.emoji') && event.target.parentNode) {
//                         const messageWrapperElement = event.target.closest('.message');
//                         const messageContentElement =
//                             messageWrapperElement?.querySelector('.message-content');
//                         const ownerDoc = this.props.isNewSkin
//                             ? this.props.iframeDocument.ownerDocument
//                             : this.props.iframeDocument;
//                         event.target.parentNode.replaceChild(
//                             ownerDoc.createTextNode(event.target.alt),
//                             event.target,
//                         );
//                         if (
//                             messageWrapperElement &&
//                             messageContentElement &&
//                             this.props.iframeWindow
//                         ) {
//                             const messagePadding = 35;
//                             this.props.iframeWindow.requestAnimationFrame(() => {
//                                 messageWrapperElement.style.width = `${
//                                     messageContentElement.offsetWidth + messagePadding
//                                 }px`;
//                             });
//                         }
//                     }
//                 },
//                 true,
//             );
//         } catch (e) {
//             ravenCaptureException(e);
//         }
//         setTimeout(() => {
//             this.setState({
//                 isRendered: true,
//             });
//         }, 0);
//         if (this.props.isNewSkin) {
//             applyListenersForTouchEventFix();
//         }
//     }

//     componentDidUpdate(prevProps) {
//         if (prevProps.iframeMode !== this.props.iframeMode) {
//             addImportantToDefaultStyles(this.props.iframeWindow.frameElement);
//             this.setImportantPositioningForMobileAndSidebar();
//             adjustBottomIframeStyle(
//                 this.props.iframeWindow.frameElement,
//                 this.props.iframeView,
//                 this.getBottomOffset(),
//             );
//         }
//     }

//     componentWillUnmount() {
//         document.removeEventListener('visibilitychange', visibilitychangeCallback);
//         if (this.props.isNewSkin) {
//             removeListenersForTouchEventFix();
//         }
//     }

//     getBottomOffset() {
//         const { isAwesomeIframe, iframeMode, iframeView } = this.props;

//         if (iframeView === 'onlySidebar') {
//             return '50%';
//         }

//         if (isAwesomeIframe && awesomeIframeStyles?.[iframeMode]) {
//             return awesomeIframeStyles[iframeMode].bottom || 0;
//         }

//         return 0;
//     }

//     setImportantPositioningForMobileAndSidebar = () => {
//         if (this.props.iframeWindow.frameElement) {
//             if (this.props.iframeView === 'mobile') {
//                 setTimeout(() => {
//                     this.props.iframeWindow.frameElement.style.setProperty(
//                         'bottom',
//                         this.getBottomOffset(),
//                         'important',
//                     );
//                 }, 0);
//             } else if (this.props.iframeView === 'onlySidebar') {
//                 setTimeout(() => {
//                     this.props.iframeWindow.frameElement.style.setProperty(
//                         'bottom',
//                         '50%',
//                         'important',
//                     );
//                     this.props.iframeWindow.frameElement.style.setProperty(
//                         'transform',
//                         'translateY(50%)',
//                         'important',
//                     );
//                     return true;
//                 }, 0);
//             } else {
//                 this.props.iframeWindow.frameElement.style.setProperty(
//                     'bottom',
//                     this.getBottomOffset(),
//                 );
//             }
//         }
//     };

//     registerClickForAutoPlayPermissions = () => {
//         try {
//             const tryToPlaySound = () => {
//                 tryToPlayNotificationSound(this.props.isNewSkin);
//                 window.parent.document.removeEventListener('click', tryToPlaySound, true);
//                 window.parent.document.removeEventListener('touchend', tryToPlaySound, true);
//                 this.props.iframeDocument.removeEventListener('click', tryToPlaySound, true);
//                 this.props.iframeDocument.removeEventListener('touchend', tryToPlaySound, true);
//             };
//             if (
//                 this.props.isMobile ||
//                 browserNameLowerCase === 'safari' ||
//                 browserNameLowerCase === 'mobile safari'
//             ) {
//                 window.parent.document.addEventListener('click', tryToPlaySound, true);
//                 window.parent.document.addEventListener('touchend', tryToPlaySound, true);
//                 this.props.iframeDocument.addEventListener('click', tryToPlaySound, true);
//                 this.props.iframeDocument.addEventListener('touchend', tryToPlaySound, true);
//             }
//         } catch (e) {
//             ravenCaptureException(e);
//         }
//     };

//     render() {
//         return (
//             <CacheProvider value={this.styleCache}>
//                 <Global
//                     styles={
//                         this.props.isNewSkin
//                             ? contentStyles.newSkinContentStyles
//                             : contentStyles.oldSkinContentStyles
//                     }
//                 />
//                 <UrlObservers />
//                 {this.state.isRendered && <App setWidgetPosition={this.props.setWidgetPosition} />}
//             </CacheProvider>
//         );
//     }
// }

// FrameContent.propTypes = {
//     setWidgetPosition: PropTypes.func.isRequired,
//     iframeView: PropTypes.string.isRequired,
//     iframeMode: PropTypes.string.isRequired,
//     isAwesomeIframe: PropTypes.bool.isRequired,
//     /* eslint-disable react/forbid-prop-types */
//     iframeDocument: PropTypes.object.isRequired,
//     iframeWindow: PropTypes.object.isRequired,
//     styleCacheContainer: PropTypes.object,
//     /* eslint-enable react/forbid-prop-types */
//     isSoundEnabled: PropTypes.bool.isRequired,
//     isNewSkin: PropTypes.bool.isRequired,
//     isMobile: PropTypes.bool.isRequired,
// };

// FrameContent.defaultProps = {
//     styleCacheContainer: null,
// };

// const FrameContentWithIframeWindowAndDocument = (props) => {
//     const { document: iframeDocument, window: iframeWindow } = useFrame();
//     return <FrameContent {...props} iframeDocument={iframeDocument} iframeWindow={iframeWindow} />;
// };

// class WidgetIframe extends React.Component {
//     // Do not reorder this with state, as we need getIframeSize declared in state

//     getIframeSize = () => {
//         const styles = getIframeSizes(this.props.iframeView);
//         const sidebarPosition =
//             this.props.iframeView === 'onlySidebar'
//                 ? {
//                       left: this.props.sidebarPosition === 'left' ? '0' : undefined,
//                       right: this.props.sidebarPosition === 'right' ? '0' : undefined,
//                   }
//                 : {};

//         return {
//             ...styles,
//             ...sidebarPosition,
//         };
//     };

//     state = {
//         style: {
//             display: 'block',
//             border: 'none',
//             position:
//                 this.props.isChatOnSite && !this.props.isMobile && !isInPreviewMode()
//                     ? 'inherit'
//                     : 'fixed',
//             top: 'auto',
//             bottom: 0,
//             left: 'auto',
//             right: 'auto',
//             ...this.getIframeSize(),
//             opacity: 0,
//             [this.props.widgetPosition]: 0, // left or right
//             colorScheme: 'none',
//             background: 'none transparent',
//             margin: 0,
//             maxHeight: '100vh', // fallback for very old browsers
//             // eslint-disable-next-line no-dupe-keys
//             maxHeight: '100dvh',
//             maxWidth: '100vw',
//             transform: 'translateY(0)',
//             transition: 'none',
//             visibility: 'visible',
//             zIndex: 999999999,
//         },
//     };

//     ref = null;

//     // eslint-disable-next-line class-methods-use-this
//     getAwesomeIframeOffset = (iframeMode, position) => {
//         let offset = 0;

//         if (awesomeIframeStyles?.[iframeMode]?.[position]) {
//             offset = awesomeIframeStyles[iframeMode][position];
//         }

//         return offset;
//     };

//     setIframeStyle = (style, callback = () => {}) => {
//         this.setState(
//             {
//                 style,
//             },
//             callback,
//         );
//     };

//     getCurrentIframeStyle = () => ({ ...this.state.style });

//     mergeWithCurrentStyles = (styles, callback = () => {}) => {
//         this.setIframeStyle({
//             ...this.getCurrentIframeStyle(),
//             ...styles,
//         });
//         callback();
//     };

//     setWidgetPosition = (position, callback) => {
//         const clonedStyles = this.getCurrentIframeStyle();
//         const iframeMode = this.getIframeMode();
//         let offset = 0;

//         if (this.props.isAwesomeIframe) {
//             offset = this.getAwesomeIframeOffset(iframeMode, position);
//         }

//         this.setIframeStyle(
//             {
//                 ...clonedStyles,
//                 right: 'auto',
//                 left: 'auto',
//                 ...{ [position]: offset },
//             },
//             callback,
//         );
//     };

//     getIframeAwesomeStyle = () => {
//         const { widgetPosition, isAwesomeIframe } = this.props;
//         const style = {};
//         if (isAwesomeIframe) {
//             const iframeMode = this.getIframeMode();
//             const { width, height } = awesomeIframeStyles?.[iframeMode] || {};

//             if (width) {
//                 style.width = width;
//             }

//             if (height) {
//                 style.height = height;
//             }

//             style[widgetPosition] = this.getAwesomeIframeOffset(iframeMode, widgetPosition);

//             style.borderRadius = this.props.isMobile ? 0 : awesomeIframeRadius;

//             if (isInTest) {
//                 const { bottom, right } = awesomeIframeStyles?.[iframeMode] || {};
//                 style.bottom = bottom;
//                 style.right = right;
//             }
//         }

//         return style;
//     };

//     onIframeMount = () => {
//         this.setWidgetPosition(this.props.widgetPosition, this.animateOpacity);
//     };

//     animateOpacity = () => {
//         this.mergeWithCurrentStyles(
//             {
//                 display: 'block',
//             },
//             () => {
//                 setTimeout(() => {
//                     this.mergeWithCurrentStyles({
//                         opacity: 1,
//                     });
//                 }, 0);
//             },
//         );
//     };

//     onIframeRef = (ref) => {
//         this.ref = ref;
//         const { widgetPosition, isAwesomeIframe, dispatch } = this.props;
//         const isPositionSaved = getKeyFromStorage('widget_position');

//         try {
//             if (ref?.node) {
//                 const { left, right, bottom } = ref.node.getBoundingClientRect();
//                 const { innerWidth, innerHeight } = window.parent;
//                 const initialX = widgetPosition === 'left' ? left : innerWidth - right;
//                 const initialY = innerHeight - bottom;

//                 if ((initialX !== 0 || initialY !== 0) && !isPositionSaved && !isAwesomeIframe) {
//                     dispatch(
//                         setVisitorWidgetPosition({
//                             initialX,
//                             initialY,
//                         }),
//                     );

//                     saveKeyToStorage('widget_position', true);
//                 }
//             }
//         } catch (e) {
//             ravenCaptureException('Error onIframeRef', { message: e?.message });
//         }
//         if (isAwesomeIframe) {
//             this.mergeWithCurrentStyles({
//                 ...awesomeIframeStyles[this.getIframeMode()],
//             });
//         }
//     };

//     getIframeMode = () => {
//         const { iframeView, isWidgetLabelEnabled, view, dimensions } = this.props;
//         const isDynamic = iframeView.includes(iframeViews.dynamic);

//         if (isDynamic && dimensions?.height) {
//             const bubbleWithLabelHeight = 94;
//             const iframeHeight = Number(dimensions.height);

//             if (
//                 iframeHeight === bubbleWithLabelHeight &&
//                 isWidgetLabelEnabled &&
//                 view !== views.fly
//             ) {
//                 return iframeViews.bubbleWithLabel;
//             }

//             return iframeViews.dynamic;
//         }

//         if (iframeView === iframeViews.onlyBubble && this.props.isMobile) {
//             return iframeViews.onlyBubbleLarge;
//         }

//         return iframeView;
//     };

//     componentDidUpdate(prevProps) {
//         try {
//             if (
//                 isInTest &&
//                 this.props.isAwesomeIframe &&
//                 prevProps.isAwesomeIframe !== this.props.isAwesomeIframe &&
//                 this.ref?.node
//             ) {
//                 this.ref.node.contentWindow?.document
//                     ?.querySelector('body')
//                     ?.classList?.add('awesome-iframe');
//             }
//         } catch {
//             //
//         }
//     }

//     render() {
//         const shouldHideWhenOffline =
//             this.props.hideWhenOffline && !this.props.isProjectOnline && !this.props.isChatOnSite;
//         const isLangRTL = isRTL();
//         if (!this.props.isMounted || shouldHideWhenOffline) {
//             return null;
//         }
//         const classList = `${this.props.isMobile ? 'mobile' : ''} ${
//             this.props.isChatOnSite ? 'chat-on-site' : ''
//         } ${isLangRTL ? 'lang-rtl' : ''} ${isInPreviewMode() ? 'chat-in-preview' : ''} ${
//             isInTour() ? 'chat-in-preview--tour' : ''
//         } ${this.props.isAwesomeIframe ? 'awesome-iframe' : ''}`;
//         // these are properties applied directly to html element, instead of rendering as react component
//         // because of that use html attributes not react props (eg. class instead of className)
//         const bodyProps = {
//             dir: isLangRTL ? 'rtl' : 'ltr',
//             class: classList.trim(),
//         };
//         const headTags = '<meta name="viewport" content="width=device-width, user-scalable=no">';
//         const iframeMode = this.getIframeMode();
//         return (
//             <>
//                 <Iframe
//                     ref={this.onIframeRef}
//                     title="Tidio Chat"
//                     head={<style>{mulishFontFace}</style>}
//                     style={{
//                         ...this.state.style,
//                         ...this.getIframeSize(),
//                         ...this.getIframeAwesomeStyle(),
//                     }}
//                     initialContent={`
//                   <html lang="en">
//                   <head>
//                   ${headTags}
//                     </head>
//                   <body ${Object.entries(bodyProps)
//                       .map(([key, value]) => `${key}="${value}"`)
//                       .join(' ')}>
//                     <div></div>
//                   </body>
//                   `}
//                     noSrcDocBodyProps={bodyProps}
//                     noSrcDocHeadTags={headTags}
//                     id="tidio-chat-iframe"
//                     contentDidMount={this.onIframeMount}
//                     {...firefoxIframeProps}
//                 >
//                     <div
//                         className={`${
//                             this.props.widgetPosition === 'left'
//                                 ? 'widget-position-left'
//                                 : 'widget-position-right'
//                         } ${
//                             this.props.sidebarPosition === 'left'
//                                 ? 'sidebar-position-left'
//                                 : 'sidebar-position-right'
//                         } ${this.props.isSidebarEnabled ? 'sidebar-enabled' : ''}
//                         ${iframeMode}`}
//                         style={{
//                             '--custom-background':
//                                 this.props.widgetColor[0] === this.props.widgetColor[1]
//                                     ? this.props.widgetColor[0]
//                                     : `linear-gradient(135deg, ${this.props.widgetColor[0]} 0%, ${this.props.widgetColor[1]} 100%)`,
//                             '--custom-text-color': this.props.widgetColor[2],
//                             '--custom-action-color': this.props.widgetColor[4] || '#0566ff',
//                             '--custom-action-color-contrast': isColorDark(
//                                 this.props.widgetColor[4] || '#0566ff',
//                             )
//                                 ? '#fff'
//                                 : '#000',
//                             '--custom-action-color-hover':
//                                 'color-mix(in srgb, var(--custom-action-color) 12%, transparent)',
//                             '--chat-padding': this.props.isMobile ? '16px' : '24px',
//                             '--label-shadow': '0 2px 20px 0 rgba(0, 18, 46, 0.18)',
//                             '--fly-shadow': '0 8px 26px 0 rgba(0, 18, 46, 0.16)',
//                         }}
//                     >
//                         <FrameContentWithIframeWindowAndDocument
//                             setWidgetPosition={this.setWidgetPosition}
//                             iframeView={this.props.iframeView}
//                             iframeMode={iframeMode}
//                             isSoundEnabled={this.props.isSoundEnabled}
//                             isAwesomeIframe={this.props.isAwesomeIframe}
//                             isNewSkin={false}
//                             isMobile={this.props.isMobile}
//                         />
//                     </div>
//                 </Iframe>
//                 <ImagePopup />
//                 <IframeModal />
//             </>
//         );
//     }
// }

// WidgetIframe.propTypes = {
//     isMounted: PropTypes.bool.isRequired,
//     isMobile: PropTypes.bool.isRequired,
//     iframeView: PropTypes.string.isRequired,
//     dimensions: PropTypes.shape({
//         width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//         height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     }),
//     widgetPosition: PropTypes.oneOf(['left', 'right']).isRequired,
//     isProjectOnline: PropTypes.bool.isRequired,
//     isAwesomeIframe: PropTypes.bool.isRequired,
//     isSidebarEnabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
//     hideWhenOffline: PropTypes.bool.isRequired,
//     sidebarPosition: PropTypes.oneOf(['left', 'right']),
//     isChatOnSite: PropTypes.bool.isRequired,
//     isSoundEnabled: PropTypes.bool.isRequired,
//     isWidgetLabelEnabled: PropTypes.bool.isRequired,
//     view: PropTypes.string.isRequired,
//     widgetColor: PropTypes.arrayOf(PropTypes.string).isRequired,
//     dispatch: PropTypes.func.isRequired,
// };

// WidgetIframe.defaultProps = {
//     sidebarPosition: 'right',
//     dimensions: null,
// };

// const ConnectedWidgetIframe = connect((store) => ({
//     isMounted: store.isMounted,
//     iframeView: store.chatIframeStyles.iframeView,
//     dimensions: getIframeViewDimensions(store),
//     isMobile: store.isMobile,
//     widgetPosition: store.chatIframeStyles.widgetPosition,
//     hideWhenOffline: store.hideWhenOffline,
//     isProjectOnline: store.isProjectOnline,
//     isSidebarEnabled: store.sidebarIframeStyles,
//     isAwesomeIframe: getAwesomeIframe(store),
//     sidebarPosition: store.sidebarIframeStyles.position,
//     isChatOnSite: getIsChatOnSite(store),
//     isSoundEnabled: store.isSoundEnabled,
//     isWidgetLabelEnabled: getWidgetLabelStatus(store),
//     view: getView(store),
//     widgetColor: getWidgetColors(store),
// }))(WidgetIframe);
// /* eslint-enable max-classes-per-file */

// const WidgetElement = () => {
//     const widgetPosition = useSelector((state) => state.chatIframeStyles.widgetPosition);
//     const sidebarPosition = useSelector((state) =>
//         state.sidebarIframeStyles ? state.sidebarIframeStyles.position : '',
//     );
//     const isSidebarEnabled = useSelector((state) => state.sidebarIframeStyles);
//     const widgetColor = useSelector(getWidgetColors);
//     const isMobile = useSelector(getIsMobile);
//     const isSoundEnabled = useSelector((state) => state.isSoundEnabled);
//     const iframeView = useSelector((state) => state.chatIframeStyles.iframeView);
//     const styles = getIframeSizes(iframeView);
//     const isChatOnSite = useSelector(getIsChatOnSite);
//     const [tidioChat] = useState(() => window.parent.document.getElementById('tidio-chat'));
//     const appContainer = tidioChat?.shadowRoot;
//     const isLangRTL = isRTL();

//     useEffect(() => {
//         const style = document.createElement('style');
//         style.textContent = interFontFace;

//         tidioChat?.appendChild(style);
//         return () => {
//             tidioChat?.removeChild(style);
//         };
//     }, [tidioChat]);

//     useEffect(() => {
//         if (isMobile) {
//             appContainer?.getElementById('body')?.classList.add('mobile');
//         }
//     }, [appContainer, isMobile]);

//     return (
//         <>
//             <div
//                 id="tidio-chat-root"
//                 className={`grid-layout ${
//                     widgetPosition === 'left' ? 'widget-position-left' : 'widget-position-right'
//                 } ${
//                     sidebarPosition === 'left' ? 'sidebar-position-left' : 'sidebar-position-right'
//                 } ${isSidebarEnabled ? 'sidebar-enabled' : ''} ${isMobile ? 'mobile' : ''} ${
//                     isChatOnSite ? 'chat-on-site' : ''
//                 } ${isLangRTL ? 'lang-rtl' : ''}
//     `}
//                 style={{
//                     width: styles.width,
//                     '--custom-background': widgetColor[0],
//                     '--custom-text-color': widgetColor[2],
//                     '--custom-action-color': widgetColor[4] || '#0566ff',
//                     '--custom-action-color-contrast': isColorDark(widgetColor[4] || '#0566ff')
//                         ? '#fff'
//                         : '#000',
//                     '--custom-action-color-hover':
//                         'color-mix(in srgb, var(--custom-action-color) 12%, transparent)',

//                     '--custom-action-color-background':
//                         'color-mix(in srgb, var(--custom-action-color) 10%, white)',
//                     '--radius-surface': '12px',
//                     '--radius-component': '12px',
//                     '--radius-small-component': '8px',
//                     '--chat-padding': isMobile ? '16px' : '20px',
//                     '--message-padding-block': '16px',
//                     '--message-padding-inline': '16px',
//                     '--message-font-size': '14px',
//                     '--message-line-height': '20px',
//                     '--starter-padding-block': '14px',
//                     '--starter-chat-padding-block': '16px',
//                     '--starters-gap': '8px',
//                     '--bubble-size': '56px',
//                     '--label-padding-block': '12px',
//                     '--label-padding-inline': '16px',
//                     '--label-shadow':
//                         '0px 2px 8px 0px rgba(8, 15, 26, 0.08), 0px 2px 2px 0px rgba(8, 15, 26, 0.12)',
//                     '--fly-shadow': '0px 12px 32px 0px rgba(8, 15, 26, 0.12)',
//                     '--operator-message': '#f5f7f9',
//                     '--border-color': '#D3DBE5',
//                 }}
//             >
//                 <FrameContent
//                     setWidgetPosition={() => {}}
//                     iframeView="not-applicable"
//                     iframeMode="not-applicable"
//                     isSoundEnabled={isSoundEnabled}
//                     isAwesomeIframe={false}
//                     iframeDocument={appContainer}
//                     iframeWindow={window.parent}
//                     styleCacheContainer={appContainer}
//                     isMobile={isMobile}
//                     isNewSkin
//                 />
//             </div>
//             <ShadowRootImagePopup shadowRoot={appContainer} />
//             <ShadowRootIframeModal shadowRoot={appContainer} />
//         </>
//     );
// };

// const WidgetSwitcher = () => {
//     const { isNewSkin } = useNewSkin();

//     if (isNewSkin) {
//         return <WidgetElement />;
//     }
//     return <ConnectedWidgetIframe />;
// };
// export default WidgetSwitcher;
