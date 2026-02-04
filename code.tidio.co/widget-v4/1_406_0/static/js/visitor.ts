import jstz from 'jstz';

import {
    extractPublickeyFromScriptTag,
    generateHash,
    getBrowser,
    getCurrentTime,
    getCurrentUrl,
    getIsMobileByUserAgent,
    getOs,
    getUserLanguage,
    isChatOnSite,
} from './helpers';

import { Visitor, VisitorMetadata } from './store/typings';

function getVisitorId(): string {
    return generateHash();
}

export function generateVisitorMetadata(): VisitorMetadata {
    const browser = getBrowser();
    const os = getOs();
    let timezone = '';
    try {
        timezone = jstz.determine().name();
    } catch {
        //
    }
    let wd: VisitorMetadata['wd'] = 'u';
    try {
        const localWd =
            // @ts-expect-error obfuscated window.navigator.webdriver so it's not found via static analysis tools.
            window[String.fromCharCode(110, 97, 118, 105, 103, 97, 116, 111, 114)][
                String.fromCharCode(119, 101, 98, 100, 114, 105, 118, 101, 114)
            ];
        if (typeof localWd === 'undefined') {
            wd = 'u';
        } else if (typeof localWd === 'boolean') {
            wd = localWd ? 'f' : 't';
        } else {
            wd = 'm';
        }
    } catch {
        wd = 'e';
    }
    return {
        ip: null,
        lang: getUserLanguage(),
        browser: browser.name,
        browser_version: browser.version,
        url: getCurrentUrl(),
        refer: window.parent.document.referrer,
        os_name: os.name,
        os_version: os.version,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        user_agent: window.navigator.userAgent,
        timezone,
        mobile: getIsMobileByUserAgent(),
        is_chat_on_site: isChatOnSite(),
        wd,
    };
}

export function initializeVisitor(): Visitor & VisitorMetadata {
    const originalVisitorId = getVisitorId();
    return {
        id: originalVisitorId,
        originalVisitorId,
        distinct_id: null,
        country: null,
        name: '',
        city: null,
        browser_session_id: '', // Visitor.getBrowserSessionId(),
        created: getCurrentTime(),
        email: '',
        project_public_key: extractPublickeyFromScriptTag(), // TODO link to store.publicKey
        phone: '',
        // tags: null, ??
        ...generateVisitorMetadata(),
    };
}
