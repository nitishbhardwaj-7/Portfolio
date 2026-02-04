// import React, { ReactElement, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { css } from '@emotion/react';

// import useNewSkin from '../../hooks/useNewSkin';
// import useChatTabs from './useChatTabs';

// import { trans } from '../../helpers/translations';

// import { setIframeView, widgetActivityTracking } from '../../store/actions';
// import { trackingEvents } from '../../store/activityTrackingHelpers';
// import { getConversationStarters, getCustomBranding, getShowBranding } from '../../store/selectors';
// import { DefaultRootState, IframeViews } from '../../store/typings';
// import { getTextStyles } from '../../styles/text.styles';
// import PoweredByTidio from '../PoweredByTidio';
// import Text from '../Text/Text';
// import Translation from '../Translation';
// import { SendIcon } from '../svgIcons/SvgIcons';
// import ChatStarter from './ChatStarter';

// const borderColor = '#E2E8EF';

// const home = css({
//     flex: 1,
//     width: '100%',
//     overflowY: 'auto',
//     background: 'transparent',
//     display: 'flex',
//     flexDirection: 'column',
//     zIndex: 9,
//     paddingInline: 'var(--chat-padding, 24px)',
// });

// const listOuter = css({
//     display: 'flex',
//     width: '100%',
//     borderRadius: 'var(--radius-component, 12px)',
//     border: `1px solid ${borderColor}`,
//     overflowY: 'hidden',
//     marginBottom: 'var(--starters-gap, 16px)',
// });

// const list = css({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '100%',
//     background: '#fff',
//     overflowY: 'auto',
// });

// const chatWithUsContainer = css({
//     borderRadius: 'var(--radius-component, 12px)',
//     background: '#fff',
// });

// const chatWithUs = css({
//     minHeight: 60,
//     display: 'flex',
//     paddingInline: '16px',
//     paddingBlock: 'var(--starter-chat-padding-block, 12px)',
//     alignItems: 'center',
//     gap: '8px',
//     width: '100%',
//     borderRadius: 'var(--radius-component, 12px)',
//     border: `1px solid ${borderColor}`,
//     background: '#fff',
//     ':hover': {
//         background: 'var(--custom-action-color-hover, #EFF2F6)',
//     },
//     ':focus': {
//         outline: 'none',
//     },
//     svg: {
//         width: 20,
//         height: 20,
//         flexShrink: 0,
//         fill: 'var(--custom-action-color, #0566FF)',
//     },
// });

// const textColumn = css({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     gap: '2px',
//     flexGrow: 1,
// });

// const headerText = css({
//     fontWeight: 600,
//     fontSize: 15,
//     lineHeight: '19px',
// });

// const brandingContainer = css({
//     display: 'flex',
//     flex: '0 0 48px',
//     justifyContent: 'center',
//     alignItems: 'center',
// });

// const brandingSpacer = css({
//     flex: '1 100 16px',
// });

// const brandingSpacerMobile = css({
//     flex: '0 100 16px',
// });

// const solidBrandingSpacer = css({
//     flex: '0 0 16px',
// });

// const Branding = (): ReactElement | null => {
//     const customBranding = useSelector(getCustomBranding);
//     const showBranding = useSelector(getShowBranding);
//     const isMobile = useSelector((store: DefaultRootState) => store.isMobile);

//     const { isNewSkin } = useNewSkin();

//     if (isNewSkin) {
//         return null;
//     }

//     return (
//         <>
//             {!showBranding && !customBranding && <div css={solidBrandingSpacer} />}
//             {(showBranding || Boolean(customBranding)) && (
//                 <>
//                     <div css={isMobile ? brandingSpacerMobile : brandingSpacer} />
//                     <div css={brandingContainer}>
//                         <PoweredByTidio />
//                     </div>
//                 </>
//             )}
//         </>
//     );
// };

// const ChatStarters = (): ReactElement => {
//     const dispatch = useDispatch();
//     const conversationStarters = useSelector(getConversationStarters);
//     const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
//     const isProjectOnline = useSelector((store: DefaultRootState) => store.isProjectOnline);

//     const { isFlowsLauncherActive, handleTabChange } = useChatTabs();
//     const { isNewSkin } = useNewSkin();
//     const textStyles = getTextStyles(isNewSkin);

//     useEffect(() => {
//         dispatch(setIframeView(isMobile ? IframeViews.MOBILE : IframeViews.CHAT_SIZE_1));
//     }, [dispatch, isMobile]);

//     useEffect(() => {
//         dispatch(widgetActivityTracking(trackingEvents.homeTabVisible));
//     }, [dispatch]);

//     const statusText = trans(isProjectOnline ? 'weAreOnline' : 'alwaysOnlineTopBar');

//     let marginTop = isNewSkin ? -30 : -40;

//     if (isMobile) {
//         marginTop = 12;
//     }

//     return (
//         <div
//             css={home}
//             style={{
//                 marginTop,
//                 maxHeight: isMobile ? 'none' : 434,
//             }}
//         >
//             {isMobile && <div style={{ flex: 1 }} />}
//             {conversationStarters && conversationStarters?.length > 0 && (
//                 <div css={listOuter}>
//                     <div css={list}>
//                         {conversationStarters.map((starter, index) => (
//                             <ChatStarter
//                                 key={starter.id}
//                                 starter={starter}
//                                 shouldDisplayDivider={index !== conversationStarters.length - 1}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             )}
//             <div css={chatWithUsContainer}>
//                 <button
//                     type="button"
//                     css={chatWithUs}
//                     onClick={(): void => {
//                         if (!isFlowsLauncherActive) {
//                             dispatch(
//                                 widgetActivityTracking(trackingEvents.chatWithUsHomeTabClicked),
//                             );
//                         }
//                         handleTabChange('conversations');
//                     }}
//                 >
//                     <div css={textColumn}>
//                         <span css={[headerText, textStyles.text14Medium]}>
//                             {isFlowsLauncherActive ? (
//                                 <Translation value="getStarted" fallback="Get started" />
//                             ) : (
//                                 <Translation value="headerText" fallback="Chat with us" />
//                             )}
//                         </span>
//                         {!isFlowsLauncherActive && Boolean(statusText) && (
//                             <Text color="subdued" numberOfLines={2} css={textStyles.text12}>
//                                 {isProjectOnline ? (
//                                     <Translation value="weAreOnline" emojify />
//                                 ) : (
//                                     <Translation value="alwaysOnlineTopBar" emojify />
//                                 )}
//                             </Text>
//                         )}
//                     </div>
//                     <SendIcon />
//                 </button>
//             </div>
//             <Branding />
//         </div>
//     );
// };

// export default ChatStarters;
