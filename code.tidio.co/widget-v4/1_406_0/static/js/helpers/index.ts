import lodashCloneDeep from 'lodash.clonedeep';
import uuid from 'uuid/v4';

import {
    ApiFeatures,
    Browser,
    BrowserNames,
    CustomDocument,
    CustomWindow,
    DefaultRootState,
    GetOsReturnData,
    Os,
    ParentWindow,
    ParsedUrl,
    TidioIdentify,
    Truthy,
    VisitorCurrencyData,
} from '../store/typings';
import { ravenCaptureException } from './raven';

declare let window: CustomWindow;

function extractPublicKeyFromDocumentVariable(
    selector: Document & { tidioChatCode?: string },
): string | false {
    try {
        if (selector.tidioChatCode) {
            return selector.tidioChatCode;
        }
    } catch {
        return false;
    }
    return false;
}

export function extractPublickeyFromScriptTag(selector = window.parent.document): string | false {
    const ppk = (function extract(): false | string {
        try {
            let scriptTag: HTMLScriptElement | null = selector.querySelector(
                'script[src*="code.tidio.co"]',
            );
            if (!scriptTag) {
                scriptTag = selector.querySelector(
                    'script[src*="code.tidio"],script[src*="code"][src*="tidio"],script[src*="uploads/redirect"][src*="tidio"]',
                );
            }
            if (scriptTag === null) {
                const projectKeyFromDocumentVar = extractPublicKeyFromDocumentVariable(selector);
                if (projectKeyFromDocumentVar) {
                    return projectKeyFromDocumentVar;
                }
                return false;
            }
            const regex = /([a-z0-9]+)(\.js|$)/g;
            const matches = regex.exec(scriptTag.src);
            if (!matches || matches.length === 0 || matches[1].length !== 32) {
                return false;
            }
            return matches[1];
        } catch (e) {
            ravenCaptureException(e);
            return false;
        }
    })();

    return ppk;
}

let isPreviewMode: boolean | null = null;
export function isInPreviewMode(): boolean {
    if (isPreviewMode === null) {
        try {
            isPreviewMode = window.parent.document.tidioChatPreviewMode === true;
        } catch (e) {
            ravenCaptureException(e);
            isPreviewMode = false;
        }
    }
    return isPreviewMode;
}

let isTestingMode: boolean | null = null;
export function isInTestingMode(): boolean {
    if (isTestingMode === null) {
        try {
            isTestingMode = window.parent.document.tidioChatTestingMode === true;
        } catch (e) {
            ravenCaptureException(e);
            isTestingMode = false;
        }
    }
    return isTestingMode;
}

const sandboxOrigins = [
    'tidio.com',
    'tidio.dev',
    'localhost',
    'dev.tidio.in',
    'widget.tidio.localhost',
];
let isSandboxMode: boolean | null = null;
export function isInSandboxMode(): boolean {
    try {
        if (isSandboxMode === null) {
            const userDocument = window.parent.document;
            const parentOrigin = window.parent.origin;
            const hasSandboxOrigin = sandboxOrigins.some((origin) => parentOrigin.includes(origin));
            isSandboxMode = Boolean(
                userDocument.tidioSandbox &&
                Object.keys(userDocument.tidioSandbox).length > 0 &&
                hasSandboxOrigin,
            );
        }
    } catch {
        isSandboxMode = false;
    }
    return isSandboxMode;
}

/**
 * Currently we only support Shopify design mode, but the solution is generic enough that can be applicable to other platforms
 */
let isDesignMode: boolean | null = null;
export function isInDesignMode(): boolean {
    try {
        if (isDesignMode === null) {
            isDesignMode = Boolean(window.parent.Shopify?.designMode === true);
        }
    } catch {
        //
    }
    return isDesignMode || false;
}

let isTour: boolean | null = null;
export function isInTour(): boolean {
    try {
        if (isTour === null) {
            isTour = Boolean(window.parent.document.tidioChatPreviewModeData?.isInTour);
        }
    } catch (e) {
        ravenCaptureException(e);
        isTour = false;
    }
    return isTour;
}

export function getSandboxParams(): CustomDocument['tidioSandbox'] | Record<string, never> {
    return window.parent.document.tidioSandbox || {};
}

export function isChatOnSite(): boolean {
    try {
        return window.parent.document.tidioChatOnSite === true;
    } catch (e) {
        ravenCaptureException(e);
        return false;
    }
}

export function generateHash(): string {
    return uuid().replace(/-/g, '');
}

/**
 * Simple obfuscation function that shifts characters by 13 positions (ROT13-like)
 * This makes the visitorId less obvious in query strings while keeping it easily reversible
 */
export function obfuscateVisitorId(visitorId: string): string {
    return visitorId
        .split('')
        .map((char) => {
            const code = char.charCodeAt(0);
            // Handle alphanumeric characters only
            if (code >= 48 && code <= 57) {
                // 0-9
                return String.fromCharCode(((code - 48 + 5) % 10) + 48);
            }
            if (code >= 65 && code <= 90) {
                // A-Z
                return String.fromCharCode(((code - 65 + 13) % 26) + 65);
            }
            if (code >= 97 && code <= 122) {
                // a-z
                return String.fromCharCode(((code - 97 + 13) % 26) + 97);
            }
            return char; // Keep other characters unchanged
        })
        .join('');
}

/**
 * Reverse the obfuscation to get the original visitorId
 * Useful for debugging purposes
 */
export function deobfuscateVisitorId(obfuscatedId: string): string {
    return obfuscatedId
        .split('')
        .map((char) => {
            const code = char.charCodeAt(0);
            // Handle alphanumeric characters only
            if (code >= 48 && code <= 57) {
                // 0-9
                return String.fromCharCode(((code - 48 - 5 + 10) % 10) + 48);
            }
            if (code >= 65 && code <= 90) {
                // A-Z
                return String.fromCharCode(((code - 65 - 13 + 26) % 26) + 65);
            }
            if (code >= 97 && code <= 122) {
                // a-z
                return String.fromCharCode(((code - 97 - 13 + 26) % 26) + 97);
            }
            return char; // Keep other characters unchanged
        })
        .join('');
}

export function getCurrentTime(): number {
    return Math.floor(new Date().getTime() / 1000);
}

export function getIsMobileByUserAgent(): boolean {
    // forcing desktop view in tour
    if (isInPreviewMode() && isInTour()) {
        return false;
    }
    try {
        return Boolean(
            navigator.userAgent &&
            /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        );
    } catch (e) {
        // eslint-disable-next-line no-console
        console.debug('isMobile error', e);
        return false;
    }
}

export function isiPad(): boolean {
    try {
        return navigator.appVersion.indexOf('iPad') !== -1;
    } catch {
        return false;
    }
}

export function getOs(): GetOsReturnData {
    let osCode = Os.UNKNOWN;
    if (navigator.appVersion.indexOf('Win') !== -1) {
        osCode = Os.WINDOWS;
    } else if (navigator.appVersion.indexOf('Android') !== -1) {
        osCode = Os.ANDROID;
    } else if (
        navigator.appVersion.indexOf('iPad') !== -1 ||
        navigator.appVersion.indexOf('iPhone') !== -1
    ) {
        osCode = Os.IOS;
    } else if (navigator.appVersion.indexOf('Mac') !== -1) {
        osCode = Os.OSX;
    } else if (navigator.appVersion.indexOf('X11') !== -1) {
        osCode = Os.UNIX;
    } else if (navigator.appVersion.indexOf('Linux') !== -1) {
        osCode = Os.LINUX;
    }
    return {
        name: osCode,
        version: '',
    };
}

export function cloneDeep<T>(toClone: T): T {
    return lodashCloneDeep(toClone);
}

export function shallowIsObjectEqual(
    a: Record<string, unknown>,
    b: Record<string, unknown>,
): boolean {
    if (typeof a !== typeof b) {
        return false;
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in a) {
        if (Object.prototype.hasOwnProperty.call(a, prop)) {
            if (a[prop] !== b[prop]) {
                return false;
            }
        }
    }
    return true;
}

export function getTidioIdentifyData(): Record<string, string> | null {
    try {
        let currentWindow: CustomWindow | ParentWindow = window;
        let identifyData = null;
        const maxChecks = 3;
        let i = 0;
        while (!identifyData && i < maxChecks) {
            identifyData = currentWindow.document.tidioIdentify;
            if (currentWindow === window.top) {
                break;
            }
            if (!identifyData) {
                currentWindow = window.parent;
            }
            i += 1;
        }

        if (!(identifyData && typeof identifyData === 'object')) {
            return null;
        }

        return identifyData || null;
    } catch (e) {
        ravenCaptureException(e);
        return null;
    }
}

export const defaultTidioIdentifyKeys = {
    distinct_id: null,
    email: '',
    name: '',
    phone: '',
    tags: null,
};

const tidioIdentifyCustomKeys = {
    clientPublicKey: null,
};

const allowedVisitorUpdateDataKeys = {
    properties: {},
    emailConsent: true,
};

function getFilteredObject(
    toFilter: Record<string, unknown>,
    filteredKeys: string[],
): Record<string, unknown> | false {
    const filtered = filteredKeys.reduce(
        (obj, key) => ({
            ...obj,
            [key]: toFilter[key],
        }),
        {},
    );
    if (Object.keys(filtered).length === 0) {
        return false;
    }
    return filtered;
}

export function filterTidioIdentifyData(
    toFilter: Record<string, unknown> | null = {},
): TidioIdentify | false {
    if (!toFilter) {
        return false;
    }
    return getFilteredObject(
        toFilter,
        Object.keys(toFilter).filter(
            (updateDataKey) =>
                (Object.keys(defaultTidioIdentifyKeys).includes(updateDataKey) ||
                    Object.keys(tidioIdentifyCustomKeys).includes(updateDataKey)) &&
                Boolean(toFilter[updateDataKey]),
        ),
    );
}

export function filterVisitorUpdateData(
    toFilter = {},
): false | ReturnType<typeof getFilteredObject> {
    if (!toFilter) {
        return false;
    }
    return getFilteredObject(
        toFilter,
        Object.keys(toFilter).filter((updateDataKey) =>
            [
                ...Object.keys(defaultTidioIdentifyKeys),
                ...Object.keys(allowedVisitorUpdateDataKeys),
            ].includes(updateDataKey),
        ),
    );
}

export function filterApiFeatures(toFilter = {}): false | ReturnType<typeof getFilteredObject> {
    if (!toFilter) {
        return false;
    }
    const allowedKeys: Record<keyof ApiFeatures, false> = {
        widgetLabelStatus: false,
        mobileHash: false,
        allowAttachments: false,
        customBranding: false,
        prechatSubscriptionCheckboxDefaultValue: false,
        allowClose: false,
        allowEmojis: false,
    };
    return getFilteredObject(
        toFilter,
        Object.keys(toFilter).filter((updateDataKey) =>
            [...Object.keys(allowedKeys)].includes(updateDataKey),
        ),
    );
}

export function filterVisitorCurrencyData(
    toFilter: Record<string, unknown> = {},
): false | Required<VisitorCurrencyData> {
    if (!toFilter) {
        return false;
    }

    // code is required and must be a string
    if (typeof toFilter.code !== 'string') {
        return false;
    }
    // exchangeRate is required and must be a number
    if (typeof toFilter.exchangeRate !== 'number') {
        return false;
    }
    return { currencyCode: toFilter.code, currencyRate: toFilter.exchangeRate };
}

export function isValidEmail(testString: string): boolean {
    // First step (quicker)
    if (testString.indexOf('@') === -1 || testString.indexOf('.') === -1) {
        return false;
    }
    // Second step (slowest)
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(testString);
}

export const isValidMobilePhone = (number: string): boolean =>
    /^(\+?\d+[ -]?)?(\(\d+\))?( ?\/ ?)?([\s-.]?\d{1,5}){5,}.*\d$/.test(number || '');

export const getUserLanguage = (): string => {
    try {
        const userDocument = window.parent.document;
        if (userDocument.tidioChatLang) {
            const lang = userDocument.tidioChatLang;
            if (typeof lang === 'string') {
                return lang.toLowerCase();
            }
        }
        if (navigator.language && typeof navigator.language === 'string') {
            return navigator.language.toLowerCase();
        }
        if (
            navigator.languages &&
            Array.isArray(navigator.languages) &&
            navigator.languages.length > 0
        ) {
            return navigator.languages[0].toLowerCase();
        }
        return 'en';
    } catch (e) {
        // TODO think how to send to sentry but without sideeffects - this function is called from reducer
        ravenCaptureException(e);
        return 'en';
    }
};

export function inferWidgetColor(colorArray: string[]): DefaultRootState['widgetColor'] {
    if (colorArray.length === 5) {
        return colorArray as DefaultRootState['widgetColor'];
    }
    if (colorArray[0] === colorArray[1] || colorArray.length !== 4) {
        return [colorArray[0], colorArray[0], colorArray[2] || '#fff', '#020610'];
    }

    const widgetColorPresets: DefaultRootState['widgetColor'][] = [
        ['#0a0e88', '#00b1ce', '#fff', '#020610'],
        ['#19025c', '#6e28bf', '#fff', '#020610'],
        ['#31003e', '#c3286e', '#fff', '#020610'],
        ['#98033a', '#f74f28', '#fff', '#020610'],
        ['#047c8d', '#2ff289', '#fff', '#020610'],
    ];

    switch (colorArray[0]) {
        case '#0048ea': {
            return widgetColorPresets[0];
        }
        case '#7d2dff': {
            return widgetColorPresets[1];
        }
        case '#b22cd4': {
            return widgetColorPresets[2];
        }
        case '#f72749': {
            return widgetColorPresets[3];
        }
        case '#00b6bf': {
            return widgetColorPresets[4];
        }
        default: {
            return colorArray as DefaultRootState['widgetColor'];
        }
    }
}

export function adjustOldGradientsColors(
    colors: DefaultRootState['widgetColor'],
): DefaultRootState['widgetColor'] {
    if (colors[0] === colors[1]) {
        return colors;
    }
    const oldGradients = [
        ['#0048ea', '#1ce2ff'],
        ['#7d2dff', '#1f6eff'],
        ['#b22cd4', '#f0397a'],
        ['#f72749', '#f78320'],
        ['#00b6bf', '#9be68d'],
    ];
    const newGradients = ['#0a0e88', '#19025c', '#31003e', '#98033a', '#047c8d'];
    let adjusted;
    /* eslint-disable prefer-destructuring */
    switch (colors[0]) {
        case newGradients[0]:
            adjusted = oldGradients[0];
            break;
        case newGradients[1]:
            adjusted = oldGradients[1];
            break;
        case newGradients[2]:
            adjusted = oldGradients[2];
            break;
        case newGradients[3]:
            adjusted = oldGradients[3];
            break;
        case newGradients[4]:
            adjusted = oldGradients[4];
            break;

        default:
            adjusted = [colors[0], colors[1]];
            break;
        /* eslint-enable prefer-destructuring */
    }
    return [adjusted[0], adjusted[1], colors[2], colors[3]];
}

export function hexToRgba(hexParam: string, opacity: number): string {
    let hex = hexParam;
    try {
        const result = `rgba(${(hex = hex.replace('#', ''))
            .match(new RegExp(`(.{${hex.length / 3}})`, 'g'))
            ?.map((color) => parseInt(hex.length % 2 ? color + color : color, 16))
            .concat(opacity || 1)
            .join(',')})`;
        return result || hexParam;
    } catch (e) {
        ravenCaptureException(e);
        return hex;
    }
}
export function colorLuminance(hex: string, lum: number): string {
    try {
        // validate hex string
        let hexString = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hexString.length < 6) {
            hexString =
                hexString[0] +
                hexString[0] +
                hexString[1] +
                hexString[1] +
                hexString[2] +
                hexString[2];
        }
        const lumNumber = lum || 0;

        // convert to decimal and change luminosity
        let rgb = '#';
        let c;
        let i = 0;
        for (i = 0; i < 3; i += 1) {
            c = parseInt(hexString.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + c * lumNumber), 255)).toString(16);
            rgb += `00${c}`.substr(c.length);
        }

        return rgb;
    } catch (e) {
        ravenCaptureException(e);
        return hex;
    }
}
export const addSPAAction = (callback: () => void): void => {
    try {
        if (window.parent) {
            if (typeof window.parent.onpopstate === 'function') {
                // onpopstate runs when hash changes
                const onPopState = window.parent.onpopstate;
                window.parent.onpopstate = (...args: Array<unknown>): void => {
                    callback();
                    if (typeof onPopState === 'function') {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        onPopState(args);
                    }
                };
            } else {
                const onHashChange = window.parent.onhashchange;
                window.parent.onhashchange = (...args: Array<unknown>): void => {
                    callback();
                    if (typeof onHashChange === 'function') {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        onHashChange(args);
                    }
                };
            }
        }
        // lets add it to widget window
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const onPushState = window.onpushstate;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.onpushstate = (...args): void => {
            callback();
            if (typeof onPushState === 'function') {
                onPushState(args);
            }
        };
    } catch (e) {
        // in case we dont have permissions to access parent history
        ravenCaptureException("Can't access window.parent when trying to add SPA actions", {
            e,
        });
    }
};

export const platforms = {
    wordpress: 'wordpress',
    shopify: 'shopify',
    others: 'others',
};

export const platformProptypeOneOf = Object.values(platforms);

export const IS_LOCAL_PROD_BUILD =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    typeof PRODUCTION_DEVELOPMENT_BUILD === 'boolean' && PRODUCTION_DEVELOPMENT_BUILD === true;

export const WIDGET_URL = IS_LOCAL_PROD_BUILD
    ? `${process.env.NEW_WIDGET_URL_WIDGET}/dist/`
    : process.env.NEW_WIDGET_URL_WIDGET;

export const getCurrentUrl = (): string => {
    try {
        if (window.parent.document.tidioLocationURL) {
            return window.parent.document.tidioLocationURL;
        }
        return window.parent.location.href;
    } catch {
        return '';
    }
};

export const getCurrentHostname = (): string => {
    try {
        if (window.parent.document.tidioLocationURL) {
            const parser = document.createElement('a');
            parser.href = window.parent.document.tidioLocationURL;
            return parser.hostname;
        }
        const topLocation = window.top?.location;
        return topLocation ? `${topLocation.hostname}` : '';
    } catch {
        return '';
    }
};

export const getBrowser = (): Browser => {
    const { appName, userAgent } = navigator;

    let Match = userAgent.match(
        /(crios|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
    );
    let temporary;

    try {
        if (Match && /trident/i.test(userAgent)) {
            temporary = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
            Match[1] = 'IE';
            Match[2] = temporary[1] || '';
        }

        if (Match?.[1] === 'Chrome') {
            temporary = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
            if (temporary !== null) {
                temporary[1] = temporary[1].replace('OPR', 'Opera');
                Match = temporary;
            }
        }

        // For Chrome on iPhone
        if (Match?.[1] === 'CriOS') {
            Match[1] = 'Chrome';
        }

        temporary = userAgent.match(/version\/([.\d]+)/i);
        if (Match && temporary !== null) {
            // eslint-disable-next-line prefer-destructuring
            Match[2] = temporary[1];
        }

        if (Match) {
            Match = [Match[1], Match[2]];
        } else {
            Match = [`${appName}-?`, navigator.appVersion];
        }
        return {
            name: Match[0],
            version: parseFloat(Match[1]),
        };
    } catch {
        return {
            name: '',
            version: 0,
        };
    }
};

export const browserNameLowerCase = getBrowser().name.toLowerCase() as BrowserNames | '';
export const firefoxIframeProps = browserNameLowerCase === 'firefox' ? { srcDoc: '' } : {};

const isScriptOrData = (url: string): boolean => {
    try {
        // eslint-disable-next-line no-control-regex
        const { protocol } = new URL(url.replace(/[\x00-\x20]+/g, ''));
        return /^(?:\w+script|data):/i.test(protocol);
    } catch {
        return false;
    }
};

export const parseUrl = (url: string): ParsedUrl | null => {
    if (!url || isScriptOrData(url)) {
        return null;
    }
    try {
        if (!url.includes('http://') && !url.includes('https://') && !url.startsWith('//')) {
            return parseUrl(`https://${url}`);
        }
        const anchor = document.createElement('a');
        anchor.href = url;
        const { protocol, host, pathname, search, hash } = anchor;
        return { protocol, host, pathname, search, hash };
    } catch {
        return null;
    }
};

export const getFullParsedUrl = (url: string): string => {
    const parsedUrl = parseUrl(url);
    return parsedUrl
        ? `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`
        : '';
};

export const isSameHost = (firstUrl: string, secondUrl: string): boolean => {
    if (!firstUrl || !secondUrl) {
        return false;
    }
    try {
        const firstParsed = parseUrl(firstUrl);
        const secondParsed = parseUrl(secondUrl);
        return firstParsed?.host === secondParsed?.host;
    } catch {
        return false;
    }
};

export function isLaunchedFromWebdriver(): boolean {
    function isTidioDomain(): boolean {
        let domain = '';
        let url = '';
        try {
            domain = getCurrentHostname();
        } catch {
            return false;
        }
        try {
            url = getCurrentUrl();
        } catch {
            return false;
        }
        const tidiochat = domain.match(/tidiochat\.com/);
        if (tidiochat) {
            return true;
        }
        const dev = domain.match(/tidio\.dev/);
        if (dev) {
            return true;
        }
        const k8s = domain.match(/tidio\.in/);
        if (k8s) {
            return true;
        }
        const localhost = url.match(/localhost:\d{4}/);
        if (localhost) {
            return true;
        }
        const tidioworkspace = url.match(/widget-v4:\d{4}/);
        if (tidioworkspace) {
            return true;
        }
        const tidio = domain.match(/tidio\.com/);
        if (tidio) {
            return true;
        }
        const workspaceLocalhost = url.match(/widget\.tidio\.localhost/);
        if (workspaceLocalhost) {
            return true;
        }
        const e2eTestStore = url.match(/dev47-e2e\.myshopify\.com/);
        if (e2eTestStore) {
            return true;
        }
        // this is only temporary workaround for not loading all chunks in lighthouse results, which accidentally skews the results
        // we should load chunks normally but still not allow webdrivers to connect to websockets
        // https://github.com/GoogleChrome/lighthouse/issues/14917 - can't detect via navigatior
        // Remove when https://tidiotidio.atlassian.net/browse/AF-1166 is done
        const lighthouseTesting = domain.match(/lighthouse-test/);
        if (lighthouseTesting) {
            return true;
        }
        return false;
    }
    if (isTidioDomain()) {
        return false;
    }
    let wd = false;
    try {
        wd = Boolean(
            // @ts-expect-error obfuscated window.navigator.webdriver so it's not found via static analysis tools.
            window[String.fromCharCode(110, 97, 118, 105, 103, 97, 116, 111, 114)][
                String.fromCharCode(119, 101, 98, 100, 114, 105, 118, 101, 114)
            ],
        );
    } catch {
        //
    }

    return wd;
}

export const openLink = (url: string): void => {
    const urlOnSameHost = isSameHost(getCurrentUrl(), url);

    try {
        if (urlOnSameHost && window.top) {
            window.top.location.assign(url);
        } else {
            window.open(url);
        }
    } catch {
        window.open(url);
    }
};

export function truthy<T>(value: T): value is Truthy<T> {
    return Boolean(value);
}

export function isSupportProject(publicKey: DefaultRootState['publicKey']): boolean {
    return process.env.NEW_WIDGET_SUPPORT_PUBLIC_KEY === publicKey;
}

export function transformOperatorAvatarUrl(url: string): string {
    return url.replace('s3.eu-west-1.amazonaws.com/avatars.tidiochat.com', 'avatars.tidiochat.com');
}

export const AI_ASSISTANT_TIMEOUT = 41000;
export const AI_ASSISTANT_COLORS = ['#00A9FF', '#01CCFF'];
export const AI_ASSISTANT_NAME = 'Lyro';

export function disableUnnecessaryWarnings(): void {
    if (!['development', 'test'].includes(`${process.env.NODE_ENV}`)) {
        return undefined;
    }
    /* eslint-disable no-console */
    const log = console.error.bind(console);
    console.error = (...args): void => {
        /* eslint-enable no-console */
        if (
            Array.isArray(args) &&
            typeof args[0] === 'string' &&
            args[0].includes('The pseudo class') &&
            args[0].includes(
                'is potentially unsafe when doing server-side rendering. Try changing it to',
            )
        ) {
            return undefined;
        }
        log(...args);
        return undefined;
    };
    return undefined;
}

export const BOT_IS_TYPING_TIMEOUT = 30000 as const;
export const MAX_PENDING_ATTACHMENTS = 4;

export function assertUnreachable(location: string, value: never): void {
    ravenCaptureException(new Error(`Unreachable case in ${location}: ${JSON.stringify(value)}`));
}
