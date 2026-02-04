import React, { ReactElement, useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';

import { extractYouTubeVideoId, getYouTubeThumbnailUrl } from './helpers';

import { IMAGE_PLACEHOLDER } from '../ImageMessage';

export const YOUTUBE_PREVIEW_LOADED_EVENT = 'youtubePreviewLoaded';

export const YOUTUBE_PREVIEW_MINIMUM_WIDTH = 248;
const ASPECT_RATIO = 16 / 9;
const MIN_HEIGHT = YOUTUBE_PREVIEW_MINIMUM_WIDTH / ASPECT_RATIO;

const containerStyles = css({
    display: 'block',
    width: 'calc(100% + var(--message-padding-inline, 16px) * 2)',
    marginTop: 16,
    marginLeft: 'calc(var(--message-padding-inline, 16px) * -1)',
    marginRight: 'calc(var(--message-padding-inline, 16px) * -1)',
    marginBottom: 'calc(var(--message-padding-block, 10px) * -1)',
    borderRadius: 'var(--radius-component, 12px)',
    overflow: 'hidden',
    background: '#fff',
    cursor: 'pointer',
    textDecoration: 'none',
});

const skeletonStyles = css({
    width: '100%',
    aspectRatio: '16 / 9',
    minHeight: MIN_HEIGHT,
    background: 'linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    '@keyframes shimmer': {
        '0%': { backgroundPosition: '200% 0' },
        '100%': { backgroundPosition: '-200% 0' },
    },
});

const thumbnailStyles = css({
    width: '100%',
    aspectRatio: '16 / 9',
    objectFit: 'cover',
    display: 'block',
    minHeight: MIN_HEIGHT,
    '&&&': {
        cursor: 'pointer',
    },
});

const infoContainerStyles = css({
    padding: 16,
    border: '1px solid #ebeef0',
    borderBottomLeftRadius: 'var(--radius-component, 12px)',
    borderBottomRightRadius: 'var(--radius-component, 12px)',
});

const titleStyles = css({
    fontWeight: 500,
    lineHeight: '20px',
    color: '#080F1A',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

interface YouTubePreviewProps {
    url: string;
}

const YouTubePreview = ({ url }: YouTubePreviewProps): ReactElement | null => {
    const [title, setTitle] = useState<string | null>(null);
    const [titleFetched, setTitleFetched] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const containerRef = useRef<HTMLAnchorElement>(null);

    const videoId = extractYouTubeVideoId(url);

    useEffect(() => {
        const fetchTitle = async (): Promise<void> => {
            try {
                const response = await fetch(
                    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
                );
                const data = await response.json();
                if (data.title) {
                    setTitle(data.title);
                }
            } catch {
                // Silently fail - we'll just not show the title
            } finally {
                setTitleFetched(true);
            }
        };

        if (videoId) {
            fetchTitle();
        }
    }, [videoId]);

    useEffect(() => {
        if ((imgLoaded || imgError) && titleFetched && containerRef.current) {
            containerRef.current.dispatchEvent(
                new CustomEvent(YOUTUBE_PREVIEW_LOADED_EVENT, { bubbles: true }),
            );
        }
    }, [imgLoaded, imgError, titleFetched]);

    if (!videoId) {
        return null;
    }

    const thumbnailUrl = getYouTubeThumbnailUrl(videoId);

    const shouldShowSkeleton = !imgLoaded && !imgError;

    return (
        <a
            ref={containerRef}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            css={containerStyles}
            data-youtube-preview
        >
            {shouldShowSkeleton && <div css={skeletonStyles} />}
            <img
                css={[thumbnailStyles, shouldShowSkeleton && { display: 'none' }]}
                src={imgError ? IMAGE_PLACEHOLDER : thumbnailUrl}
                alt={title || 'YouTube video'}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
            />
            {title && (
                <div css={infoContainerStyles}>
                    <p css={titleStyles}>{title}</p>
                </div>
            )}
        </a>
    );
};

export default YouTubePreview;
