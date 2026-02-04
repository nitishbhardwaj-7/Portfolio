import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import debounce from 'lodash.debounce';

import { isRTL } from '../../helpers/translations';

import { widgetActivityTracking } from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import CSSAnimation from '../Animations/CSSAnimation';
import { Caret } from '../svgIcons/SvgIcons';
import styles from './Slideshow.styles';

const ITEM_WIDTH = 240;
const ITEM_WIDTH_FOR_FLY_MESSAGE = 224;

enum ScrollInRtlType {
    DEFAULT = 'default',
    REVERSE = 'reverse',
}

interface SlideshowProps<T> {
    items: T[];
    renderItem: (item: T, isFocused: boolean) => ReactElement;
    isWithoutImages?: boolean;
    isFlyMessage?: boolean;
}

const Slideshow = <T extends { id: number }>({
    items,
    renderItem,
    isWithoutImages = false,
    isFlyMessage = false,
}: SlideshowProps<T>): ReactElement => {
    const dispatch = useDispatch();
    const isLanguageRTL = isRTL();
    const itemWidth = isFlyMessage ? ITEM_WIDTH_FOR_FLY_MESSAGE : ITEM_WIDTH;
    const numberOfItems = items.length;

    const cardGalleryRef = React.useRef<HTMLDivElement>(null);
    const isMounted = React.useRef<boolean>(false);

    const [scrollInRtlType, setScrollInRtlType] = React.useState<ScrollInRtlType>(
        ScrollInRtlType.REVERSE,
    );
    const [galleryWidth, setGalleryWidth] = React.useState<number>(0);
    const [galleryScrollWidth, setGalleryScrollWidth] = React.useState<number>(0);
    const [galleryScrollLeft, setGalleryScrollLeft] = React.useState<number>(0);

    const trackGalleryScrollClick = useCallback((): void => {
        dispatch(widgetActivityTracking(trackingEvents.cardsScrolled));
    }, [dispatch]);

    const focusedItemIndex = useMemo((): number => {
        if (!cardGalleryRef.current) {
            return 0;
        }

        const offset = isLanguageRTL ? galleryScrollLeft * -1 : galleryScrollLeft;

        if (offset < 10) {
            return 0;
        }
        if (offset > 0 && offset < itemWidth && numberOfItems > 1) {
            // This condition is because the first item's scroll is less than the itemWidth, as part of the item is already visible at the start
            return 1;
        }
        return Math.floor(offset / (itemWidth + 10)) + 1; // +10px of padding
    }, [galleryScrollLeft, itemWidth, isLanguageRTL, numberOfItems]);

    const scrollForward = useCallback((): void => {
        if (cardGalleryRef.current) {
            cardGalleryRef.current.scrollLeft += itemWidth;
            trackGalleryScrollClick();
        }
    }, [trackGalleryScrollClick, itemWidth]);

    const scrollBack = useCallback((): void => {
        if (cardGalleryRef.current) {
            cardGalleryRef.current.scrollLeft -= itemWidth;

            trackGalleryScrollClick();
        }
    }, [trackGalleryScrollClick, itemWidth]);

    useEffect((): (() => void) => {
        if (!cardGalleryRef.current || isMounted.current) {
            return (): void => {};
        }

        isMounted.current = true;

        // Detection of scrollLeft implementation type;
        if (cardGalleryRef.current.scrollLeft > 0) {
            setScrollInRtlType(ScrollInRtlType.DEFAULT);
        } else {
            cardGalleryRef.current.scrollLeft = 0;
        }

        const scrollHandler = debounce(() => {
            if (cardGalleryRef.current) {
                setGalleryScrollLeft(cardGalleryRef.current.scrollLeft);
            }
        }, 80);

        const removeEventListener = (): void => {
            if (cardGalleryRef.current) {
                cardGalleryRef.current.removeEventListener('scroll', scrollHandler);
            }
        };

        cardGalleryRef.current.addEventListener('scroll', scrollHandler);

        setGalleryWidth(cardGalleryRef.current?.offsetWidth || 0);
        setGalleryScrollWidth(cardGalleryRef.current?.scrollWidth || 0);
        setGalleryScrollLeft(
            cardGalleryRef.current && isLanguageRTL && scrollInRtlType === 'default'
                ? cardGalleryRef.current.scrollWidth - cardGalleryRef.current.offsetWidth
                : 0,
        );

        return (): void => {
            removeEventListener();
        };
    }, [isLanguageRTL, scrollInRtlType]);

    return (
        <>
            <div css={styles.container} className="slideshow">
                {isLanguageRTL ? (
                    <>
                        {scrollInRtlType === 'default' && (
                            <>
                                <CSSAnimation
                                    classNames="fade200"
                                    in={galleryScrollWidth - galleryWidth > galleryScrollLeft}
                                >
                                    <button
                                        type="button"
                                        css={styles.getButton('left', isWithoutImages)}
                                        onClick={scrollForward}
                                    >
                                        <Caret />
                                    </button>
                                </CSSAnimation>
                                <CSSAnimation classNames="fade200" in={galleryScrollLeft > 10}>
                                    <button
                                        type="button"
                                        css={styles.getButton('right', isWithoutImages)}
                                        onClick={scrollBack}
                                    >
                                        <Caret />
                                    </button>
                                </CSSAnimation>
                            </>
                        )}
                        {scrollInRtlType === 'reverse' && (
                            <>
                                <CSSAnimation classNames="fade200" in={galleryScrollLeft < -10}>
                                    <button
                                        type="button"
                                        css={styles.getButton('left', isWithoutImages)}
                                        onClick={scrollForward}
                                    >
                                        <Caret />
                                    </button>
                                </CSSAnimation>
                                <CSSAnimation
                                    classNames="fade200"
                                    in={galleryScrollWidth - galleryWidth > galleryScrollLeft * -1}
                                >
                                    <button
                                        type="button"
                                        css={styles.getButton('right', isWithoutImages)}
                                        onClick={scrollBack}
                                    >
                                        <Caret />
                                    </button>
                                </CSSAnimation>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <CSSAnimation classNames="fade200" in={galleryScrollLeft > 10}>
                            <button
                                type="button"
                                css={styles.getButton('left', isWithoutImages)}
                                onClick={scrollBack}
                            >
                                <Caret />
                            </button>
                        </CSSAnimation>
                        <CSSAnimation
                            classNames="fade200"
                            in={galleryScrollWidth - galleryWidth > galleryScrollLeft}
                        >
                            <button
                                type="button"
                                css={styles.getButton('right', isWithoutImages)}
                                onClick={scrollForward}
                            >
                                <Caret />
                            </button>
                        </CSSAnimation>
                    </>
                )}
            </div>
            <div
                className="message message-operator"
                css={styles.getItemsContainer(isFlyMessage)}
                ref={cardGalleryRef}
            >
                {items.map((item, index) => (
                    <div css={styles.getItemWrapper(itemWidth, items.length === 1)} key={item.id}>
                        {renderItem(item, focusedItemIndex === index)}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Slideshow;
