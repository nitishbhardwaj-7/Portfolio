export const extractYouTubeVideoId = (url?: string): string | null => {
    if (!url) {
        return null;
    }

    // Pattern for youtube.com/watch?v=
    const watchPattern = /(?:youtube\.com\/watch\?.*v=|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/;
    // Pattern for youtu.be/
    const shortPattern = /youtu\.be\/([a-zA-Z0-9_-]{11})/;
    // Pattern for youtube.com/embed/
    const embedPattern = /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/;
    // Pattern for youtube.com/v/
    const vPattern = /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/;

    const patterns = [watchPattern, shortPattern, embedPattern, vPattern];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match?.[1]) {
            return match[1];
        }
    }

    return null;
};

export const getYouTubeThumbnailUrl = (videoId: string): string =>
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

export const extractYouTubeUrl = (text?: string): string | null => {
    if (!text) {
        return null;
    }

    // [^\s)]+ to handle both plain URLs and URLs inside markdown parentheses
    const urlPattern =
        /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?[^\s)]+|youtube\.com\/embed\/[^\s)]+|youtube\.com\/v\/[^\s)]+|youtu\.be\/[^\s)]+)/;
    const match = urlPattern.exec(text);
    const url = match?.[0];
    if (url && extractYouTubeVideoId(url)) {
        return url;
    }

    return null;
};
