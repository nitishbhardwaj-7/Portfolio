import { css } from '@emotion/react';

const ICON_SIZE = 24;
const THUMBNAIL_HEIGHT = 52;

const baseWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    height: '100%',
    padding: '8px 12px',
    backgroundColor: '#fff',
    borderRadius: 'var(--radius-component, 12px)',
    border: '1px solid var(--border-color, #D3DBE5)',
    '> svg': {
        width: ICON_SIZE,
        height: ICON_SIZE,
        flexShrink: 0,
    },
};

export const containerStyles = css({
    display: 'flex',
    gap: 8,
    paddingTop: 16,
    overflowX: 'auto',
    scrollbarColor: '#acb8cb transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
        width: 12,
    },
    '&::-webkit-scrollbar-thumb': {
        border: '3px solid #eff2f6',
        borderRadius: 6,
        backgroundColor: '#acb8cb',
    },
});

export const thumbnailStyles = css({
    position: 'relative',
    flexShrink: 0,
    width: THUMBNAIL_HEIGHT,
    height: THUMBNAIL_HEIGHT,
});

export const imageWrapperStyles = css({
    width: '100%',
    height: '100%',
    borderRadius: 'var(--radius-component, 12px)',
    border: '1px solid var(--border-color, #D3DBE5)',
    overflow: 'hidden',
    '.loader-icon.circular': {
        width: ICON_SIZE,
        height: ICON_SIZE,
        position: 'relative',
        left: 0,
        top: 0,
    },
});

export const imageStyles = css({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const loadingOverlayStyles = css({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const removeButtonStyles = css({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -6,
    right: -6,
    height: 28,
    width: 28,
    borderRadius: '50%',
    boxShadow: '0px 2px 6px 0px #001b471f',
    background: '#fff',
    svg: {
        width: 20,
        height: 20,
        fill: '#8894ab',
    },

    '&:hover': {
        backgroundColor: 'var(--custom-action-color-background, #dce9ff)',
        svg: {
            fill: 'var(--custom-action-color, #0566ff)',
        },
    },
});

export const removeIconStyles = css({
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 1,
    marginBottom: 2,
});

export const fileIconWrapperStyles = css({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 'var(--radius-component, 12px)',
    border: '1px solid #e4e6eb',
    svg: {
        width: 32,
        height: 32,
    },
});

export const fileThumbnailStyles = css(baseWrapperStyles, {
    position: 'relative',
    flexShrink: 0,
    width: 192,
    height: THUMBNAIL_HEIGHT,
    boxSizing: 'border-box',
    '.loader-icon.circular': {
        width: ICON_SIZE,
        height: ICON_SIZE,
        position: 'relative',
        left: 0,
    },
});

export const errorThumbnailStyles = css(baseWrapperStyles, {
    position: 'relative',
    flexShrink: 0,
    width: 220,
    height: THUMBNAIL_HEIGHT,
    '.alert-icon': {
        width: 20,
        height: 20,
        fill: '#f6303a',
    },
});

export const fileNameStyles = css({
    fontSize: 12,
    lineHeight: '14px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    wordBreak: 'break-word',
    color: 'var(--text-color, #06132B)',
});

export const loadingFileNameStyles = css({
    color: '#ACB8CB',
});

export const errorMessageContainerStyles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flex: 1,
    minWidth: 0,
});

export const errorMessageTextStyles = css({
    color: '#f6303a',
    fontSize: 12,
    lineHeight: '14px',
});
