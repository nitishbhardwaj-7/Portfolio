// this helper should only be used from components (dynamic splitchunking)
import DOMPurify from 'dompurify';
import twemoji from 'twemoji';

const purifyConfigForEmoji = {
    ALLOWED_TAGS: ['img'],
    ALLOWED_ATTR: ['class', 'src', 'alt'],
};

const purifyConfigForMarkdown = {
    ALLOWED_TAGS: ['img', 'a', 'strong', 'br', 'ol', 'ul', 'li'],
    ALLOWED_ATTR: ['class', 'href', 'target', 'src', 'alt', 'rel'],
};

const purifyConfig = {
    ALLOWED_TAGS: ['img', 'a'],
    ALLOWED_ATTR: ['class', 'href', 'target', 'src', 'alt'],
};

const escapeHtml = (string: string): string => string.replace(/</g, '&lt;').replace(/>/g, '&gt;');

const normalizeHtml = (string: string): string => string.replace(/\t/g, '');

const TWEMOJI_OPTIONS = {
    base: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.1.1/',
};

export const linkify = (inputText: string): string => {
    // URLs starting with http://, https://, or ftp://
    const urlProtocolPattern =
        /((?:href|src)=['"])?(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;()$'[\]*]*[-A-Z0-9+&@#/%=~_|])/gim;
    // Change email addresses to mailto links (require empty space before or selected tags).
    const mailPattern = /(^|\s|strong>|li>)(([a-zA-Z0-9-_.+])+@[a-zA-Z0-9_]+?(\.[a-zA-Z]{2,})+)/gim;
    // URLs starting with "www." (require empty space before or selected tags).
    const urlWwwPattern = /(^|\s|strong>|li>)(www\.[-\w.,@?^=%&:/]+(\b|$))/gim;

    let replacedText = inputText.replace(urlProtocolPattern, (match, attr) => {
        if (typeof attr !== 'undefined') {
            return match;
        }
        return `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });

    replacedText = replacedText.replace(
        mailPattern,
        '$1<a href="mailto:$2" target="_blank" rel="noopener noreferrer">$2</a>',
    );

    replacedText = replacedText.replace(
        urlWwwPattern,
        '$1<a href="http://$2" target="_blank" rel="noopener noreferrer">$2</a>',
    );

    return replacedText;
};

const sanitizeHTML = (content: string): string => DOMPurify.sanitize(content, purifyConfig);
export const sanitizeLinkifyAndEmojifyString = (string: string): string => {
    if (typeof string !== 'string') {
        return '';
    }
    let parsed = escapeHtml(string);
    parsed = linkify(parsed);
    // @ts-expect-error wrong return type
    parsed = twemoji.parse(parsed, TWEMOJI_OPTIONS);
    parsed = sanitizeHTML(parsed);
    return parsed;
};

export const parseMarkdown = (md: string): string => {
    if (typeof md !== 'string') {
        return '';
    }

    let parsed = escapeHtml(md);

    parsed = normalizeHtml(parsed);

    // handle markdown images: ![alt text](image-url)
    const markdownImagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
    parsed = parsed.replace(
        markdownImagePattern,
        '<img src="$2" alt="$1" class="markdown-image" />',
    );

    // handle markdown link: [link](https://example.com)
    const markdownLinkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;
    parsed = parsed.replace(
        markdownLinkPattern,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    );

    // handle markdown bold: **bold**
    parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // @ts-expect-error wrong return type
    parsed = twemoji.parse(parsed, TWEMOJI_OPTIONS);
    parsed = linkify(parsed);
    parsed = DOMPurify.sanitize(parsed, purifyConfigForMarkdown);
    return parsed;
};

export const sanitizeAndEmojifyString = (string: string): string => {
    if (typeof string !== 'string') {
        return '';
    }
    let parsed = escapeHtml(string);
    // @ts-expect-error wrong return type
    parsed = twemoji.parse(parsed, TWEMOJI_OPTIONS);
    parsed = DOMPurify.sanitize(parsed, purifyConfigForEmoji);
    return parsed;
};
