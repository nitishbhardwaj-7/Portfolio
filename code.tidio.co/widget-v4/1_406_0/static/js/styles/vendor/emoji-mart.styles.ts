import { css } from '@emotion/react';

const emojiStyles = css`
    .emoji-mart,
    .emoji-mart * {
        box-sizing: border-box;
        line-height: 1.15;
    }

    .emoji-mart {
        font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
        font-size: 16px;
        display: inline-block;
        color: #222427;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        background: #fff;
    }

    .emoji-mart .emoji-mart-emoji {
        padding: 6px;
    }

    .emoji-mart-bar {
        border: 0 solid #d9d9d9;
    }
    .emoji-mart-bar:first-child {
        border-bottom-width: 1px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .emoji-mart-bar:last-child {
        border-top-width: 1px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .emoji-mart-anchors {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 6px;
        color: #858585;
        line-height: 0;
    }

    .emoji-mart-anchor {
        position: relative;
        display: block;
        flex: 1 1 auto;
        color: #858585;
        text-align: center;
        padding: 12px 4px;
        overflow: hidden;
        transition: color 0.1s ease-out;
        margin: 0;
        box-shadow: none;
        background: none;
        border: none;
    }
    .emoji-mart-anchor:focus {
        outline: 0;
    }
    .emoji-mart-anchor:hover,
    .emoji-mart-anchor:focus,
    .emoji-mart-anchor-selected {
        color: #464646;
    }

    .emoji-mart-anchor-selected .emoji-mart-anchor-bar {
        bottom: 0;
    }

    .emoji-mart-anchor-bar {
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #464646;
    }

    .emoji-mart-anchors i {
        display: inline-block;
        width: 100%;
        max-width: 22px;
    }

    .emoji-mart-anchors svg,
    .emoji-mart-anchors img {
        fill: currentColor;
        max-height: 18px;
    }

    .emoji-mart-scroll {
        overflow-y: scroll;
        overflow-x: hidden;
        height: 270px;
        padding: 0 6px 6px 6px;
        will-change: transform; /* avoids "repaints on scroll" in mobile Chrome */
    }

    .emoji-mart-search {
        margin-top: 6px;
        padding: 0 6px;
        position: relative;
    }

    .emoji-mart-search input {
        font-size: 16px;
        display: block;
        width: 100%;
        padding: 0.2em 0.6em;
        border-radius: 25px;
        border: 1px solid #d9d9d9;
        outline: 0;
    }

    .emoji-mart-search input,
    .emoji-mart-search input::-webkit-search-decoration,
    .emoji-mart-search input::-webkit-search-cancel-button,
    .emoji-mart-search input::-webkit-search-results-button,
    .emoji-mart-search input::-webkit-search-results-decoration {
        /* remove webkit/blink styles for <input type="search">
     * via https://stackoverflow.com/a/9422689 */
        -webkit-appearance: none;
    }

    .emoji-mart-search-icon {
        position: absolute;
        top: 7px;
        right: 11px;
        z-index: 2;
        padding: 2px 5px 1px;
        border: none;
        background: none;
    }

    .emoji-mart-category .emoji-mart-emoji span {
        z-index: 1;
        position: relative;
        text-align: center;
        cursor: default;
    }

    .emoji-mart-category .emoji-mart-emoji:hover:before {
        z-index: 0;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f4f4f4;
        border-radius: 100%;
    }

    .emoji-mart-category-label {
        z-index: 2;
        position: relative;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
    }

    .emoji-mart-category-label span {
        display: block;
        width: 100%;
        font-weight: 500;
        padding: 5px 6px;
        background-color: #fff;
        background-color: rgba(255, 255, 255, 0.95);
    }

    .emoji-mart-category-list {
        margin: 0;
        padding: 0;
    }

    .emoji-mart-category-list li {
        list-style: none;
        margin: 0;
        padding: 0;
        display: inline-block;
    }

    .emoji-mart-emoji {
        position: relative;
        display: inline-block;
        font-size: 0;
        margin: 0;
        padding: 0;
        border: none;
        background: none;
        box-shadow: none;
    }

    .emoji-mart-emoji-native {
        font-family:
            'Segoe UI Emoji', 'Segoe UI Symbol', 'Segoe UI', 'Apple Color Emoji', 'Twemoji Mozilla',
            'Noto Color Emoji', 'Android Emoji';
    }

    .emoji-mart-no-results {
        font-size: 14px;
        text-align: center;
        padding-top: 70px;
        color: #858585;
    }
    .emoji-mart-no-results-img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
    .emoji-mart-no-results .emoji-mart-category-label {
        display: none;
    }
    .emoji-mart-no-results .emoji-mart-no-results-label {
        margin-top: 0.2em;
    }
    .emoji-mart-no-results .emoji-mart-emoji:hover:before {
        content: none;
    }

    /* For screenreaders only, via https://stackoverflow.com/a/19758620 */
    .emoji-mart-sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
`;
export default emojiStyles;
