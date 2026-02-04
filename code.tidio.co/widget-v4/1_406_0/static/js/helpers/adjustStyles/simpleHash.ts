export const simpleHash = (str: string): string => {
    let hash = 0;
    if (str.length === 0) {
        return 'a0';
    }

    for (let i = 0; i < str.length; i += 1) {
        const char = str.charCodeAt(i);
        hash = (hash * 31 + char) % 2147483647;
    }

    // Convert to base-36 and ensure it starts with a letter
    // CSS identifiers can't start with a number
    const base36Hash = Math.abs(hash).toString(36);
    return `a${base36Hash}`;
};
