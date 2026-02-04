import { css } from '@emotion/react';

export const userDataModalBackgroundStyles = css`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgb(0, 0, 0, 0.5);
    z-index: 10;
`;

export const userDataModalStyle = css`
    position: absolute;
    bottom: 0;
    left: 8px;
    right: 8px;
    width: calc(100% - 16px);
    max-height: calc(100% - 8px);
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 20px;
    .mobile & {
        padding: 20px 16px;
    }
    background: #fff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;

    .pre-chat,
    .always-online {
        max-width: 100%;
        width: 100%;
    }

    form {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        max-height: 465px;
    }

    .user-data-modal-fields {
        margin-inline: -20px;
        padding-inline: 20px;
        .mobile & {
            margin-inline: -16px;
            padding-inline: 16px;
        }
        & > * + * {
            margin-top: 12px;
        }
        flex-shrink: 1;
        overflow-y: auto;
        #ic_arrow {
            fill: var(--custom-action-color, #0566ff);
        }
        svg {
            width: 24px;
            height: 24px;
        }
        input,
        textarea {
            border: solid 1px rgba(108, 125, 159, 0.24);
            font-size: 15px;
            padding: 12px 16px;
            line-height: normal;
            margin: 0;
            &[type='checkbox'] {
                border-radius: 4px;
                padding: 8px;
            }
        }

        label {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            padding: 0 0 0 2px;
            margin: 0;
            input {
                min-width: 16px;
                min-height: 18px;
            }
            &.small-text {
                padding-top: 0;
                span {
                    font-size: 12px;
                    line-height: 16px;
                }
            }
            span {
                font-size: 14px;
                line-height: 18px;
                text-align: justify;
                color: #00122e;
                display: block;
                a {
                    color: #00122e;
                }
            }
        }
    }

    .emoji {
        margin: 0;
    }
`;

export const userDataModalClose = css`
    position: absolute;
    right: 20px;
    top: 20px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    svg {
        fill: #6d7e9e;
        width: 20px;
        height: 20px;
    }
`;

export const userDataModalText = css`
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    color: #00122e;
`;
