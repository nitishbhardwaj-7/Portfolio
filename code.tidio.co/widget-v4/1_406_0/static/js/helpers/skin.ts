let skin: 'old' | 'new' = 'old';
try {
    // new way of detecting new skin, from the URL of parent
    const url = new URL(window.parent?.location.href);
    const skinParam = url.searchParams.get('tidioWidgetNewSkin');
    if (skinParam === '1') {
        sessionStorage.setItem('tidioWidgetNewSkin', '1');
    }
    if (sessionStorage.getItem('tidioWidgetNewSkin') === '1') {
        skin = 'new';
    }
    // current way of detecting new skin
    if (localStorage.getItem('newSkin') === 'true') {
        skin = 'new';
    }
} catch {
    //
}

export function isNewSkin(): boolean {
    return skin === 'new';
}
