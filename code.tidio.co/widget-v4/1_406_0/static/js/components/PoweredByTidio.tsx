import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { css } from '@emotion/react';

import { getCurrentHostname, isSupportProject } from '../helpers';
import { trans } from '../helpers/translations';

import { setFeaturesFromApi } from '../store/actions';
import { getCustomBranding, getIsChatOnSite, hasAiAssistant } from '../store/selectors';
import { DefaultRootState } from '../store/typings';
import { PoweredByLyroLogo, PoweredByTidioLogo } from './svgIcons/SvgIcons';

const brandingStyles = css`
    margin-right: 0px;
    float: right;
    display: flex;
    text-decoration: none;
    color: #8894ab;
    font-weight: 400;
    font-size: 10px;

    /* @noflip */
    direction: ltr;

    span {
        align-self: center;

        /* @noflip */
        margin-right: 8px;
    }
`;

const lyroSvgStyles = css`
    svg {
        width: 171px;
    }
`;

const tidioSvgStyles = css`
    svg {
        width: 119px;
    }
`;

const customBrandingStyles = css`
    margin-right: 0px;
    float: right;
    /* @noflip */
    direction: ltr;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        object-fit: contain;
        max-width: 125px;
        max-height: 30px;
    }
`;

const PoweredByTidio = (): React.ReactElement => {
    const dispatch = useDispatch();
    const publicKey = useSelector((store: DefaultRootState) => store.publicKey);
    const platform = useSelector((store: DefaultRootState) => store.platform);
    const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
    const isChatOnSite = useSelector(getIsChatOnSite);
    const customBranding = useSelector(getCustomBranding);
    const aiAssistant = useSelector(hasAiAssistant);

    const url = getCurrentHostname();
    const shouldAddUtmParams = !isSupportProject(publicKey);

    if (customBranding) {
        return (
            <div>
                <span css={customBrandingStyles}>
                    <img
                        src={customBranding}
                        alt="Company logo"
                        onError={(): void => {
                            dispatch(setFeaturesFromApi({ customBranding: '' }));
                        }}
                    />
                </span>
            </div>
        );
    }

    const PoweredBy = aiAssistant ? PoweredByLyroLogo : PoweredByTidioLogo;
    const styles = [brandingStyles, aiAssistant ? lyroSvgStyles : tidioSvgStyles];
    const link = aiAssistant ? 'powered-by-lyro' : 'powered-by-tidio';
    const href = `https://www.tidio.com/${link}/?platform=${platform}&project=${publicKey}&device=${
        isMobile ? 'mobile' : 'desktop'
    }${
        shouldAddUtmParams
            ? `&utm_source=plugin_ref&utm_medium=widget_v4&utm_campaign=plugin_ref&utm_referrer=${url}`
            : ''
    }`;

    if (isChatOnSite) {
        return (
            <div>
                <span css={styles}>
                    <PoweredBy />
                </span>
            </div>
        );
    }

    return (
        <div>
            <a
                css={styles}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={trans('poweredBy', null, 'Powered by Tidio.')}
            >
                <PoweredBy />
            </a>
        </div>
    );
};

export default PoweredByTidio;
