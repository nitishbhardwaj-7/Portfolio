// import React, { ReactElement } from 'react';
// import { useSelector } from 'react-redux';

// import { SerializedStyles, css } from '@emotion/react';

// import useNewSkin from '../../../hooks/useNewSkin';

// import { DefaultRootState } from '../../../store/typings';
// import { getTextStyles } from '../../../styles/text.styles';
// import Translation from '../../Translation';

// const copy = css({
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '12px',
//     fontSize: 16,
//     lineHeight: '20px',
// });

// const headerTitle = css({
//     color: 'currentColor',
//     margin: '4px 0 0 0',
//     padding: 0,
//     display: 'inline-block',
//     position: 'relative',
//     fontSize: 32,
//     lineHeight: '40px',
//     fontWeight: 500,
//     maxWidth: '100%',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     verticalAlign: 'bottom',
//     '.emoji': {
//         width: 31,
//         height: 31,
//     },
// });

// const getWelcomeMessageStyles = (isMobile: boolean): SerializedStyles =>
//     css({
//         display: '-webkit-box',
//         WebkitLineClamp: isMobile ? 4 : 6,
//         WebkitBoxOrient: 'vertical',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         paddingBottom: 2,
//     });

// const HomeHeaderCopy = (): ReactElement => {
//     const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
//     const { isNewSkin } = useNewSkin();
//     const textStyles = getTextStyles(isNewSkin);

//     if (isNewSkin) {
//         return (
//             <>
//                 <div style={{ height: isMobile ? 12 : 0 }} />
//                 <div css={copy}>
//                     <h2 css={[headerTitle, textStyles.text24Bold]}>
//                         <Translation value="newWidgetHeaderText" fallback="Chat with us" emojify />
//                     </h2>
//                     <div css={getWelcomeMessageStyles(isMobile)}>
//                         <Translation value="welcomeMessage" emojify />
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     return (
//         <>
//             <div style={{ height: isMobile ? 12 : 28 }} />
//             <div css={copy}>
//                 <h2 css={[headerTitle, textStyles.text24Bold]}>
//                     <Translation value="newWidgetHeaderText" fallback="Chat with us" emojify />
//                 </h2>
//                 <Translation value="welcomeMessage" emojify />
//             </div>
//         </>
//     );
// };

// export default HomeHeaderCopy;
