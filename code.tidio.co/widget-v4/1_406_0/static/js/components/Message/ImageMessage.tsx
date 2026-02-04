import React, { ReactElement, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { parseUrl } from '../../helpers';

import { openImagePopup, updateAttachmentLoadedState } from '../../store/actions';
import { DefaultRootState, Message } from '../../store/typings';

export const IMAGE_PLACEHOLDER = 'https://assets.tidiochat.com/img/not_found.jpg';

export async function getImageOrFallback(
    url: string,
    fallback = IMAGE_PLACEHOLDER,
): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = (): void => resolve(url);
        img.onerror = (err): void => {
            reject(err);
        };
    }).catch(() => fallback);
}

const ImageMessage = (props: {
    content: Message['content'];
    extension: Message['extension'];
    thumb: Message['thumb'];
    name: Message['name'];
    id: Message['content'];
    onClick: () => void;
}): ReactElement | null => {
    const { content, extension, thumb, name, id } = props;
    const dispatch = useDispatch();
    const ppk = useSelector((store: DefaultRootState) => store.publicKey);
    const visitorId = useSelector((store: DefaultRootState) => store.visitor.id);
    const [imgSrc, setImgSrc] = useState(content);
    const [thumbSrc, setThumbSrc] = useState(thumb || '');
    const [showImage, setShowImage] = useState(true);

    const src = extension !== 'gif' ? thumbSrc : imgSrc;

    const setPlaceholders = (): void => {
        setThumbSrc(IMAGE_PLACEHOLDER);
        setImgSrc(IMAGE_PLACEHOLDER);
    };

    const updateImagePath = useCallback(
        async (path: string, isThumb = false): Promise<string> => {
            if (path === IMAGE_PLACEHOLDER) {
                setShowImage(false);
                return '';
            }
            if (path.indexOf('/conversation/') === -1) {
                const parsedUrl = parseUrl(path);
                const newPathnameAddress = `/${ppk}/conversation/${visitorId}`;
                const newUrl = parsedUrl
                    ? `${parsedUrl.protocol}//${parsedUrl.host}${newPathnameAddress}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`
                    : path;
                const temp = await getImageOrFallback(newUrl);
                if (isThumb) {
                    setThumbSrc(temp);
                } else {
                    setImgSrc(temp);
                }
            } else {
                setPlaceholders();
            }
            return '';
        },
        [ppk, visitorId],
    );

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            dispatch(openImagePopup(imgSrc));

            props.onClick();
        },
        [dispatch, imgSrc, props],
    );

    const handleImageLoad = useCallback(
        (event: React.SyntheticEvent<HTMLImageElement>) => {
            event.currentTarget.setAttribute('alt', `${name}`);
            dispatch(updateAttachmentLoadedState(id, true));
        },
        [dispatch, id, name],
    );

    const handleImageError = useCallback((): void => {
        updateImagePath(imgSrc);
        updateImagePath(thumbSrc, true);
    }, [imgSrc, thumbSrc, updateImagePath]);

    if (!showImage) {
        return null;
    }

    return (
        <span>
            <a href={content} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                <img
                    className="attachment-img"
                    src={src}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    alt={name || ''}
                />
            </a>
        </span>
    );
};

export default ImageMessage;
