import React, {
    MouseEventHandler,
    ReactElement,
    ReactNode,
    useCallback,
    useRef,
    useState,
} from 'react';

import { SerializedStyles, css } from '@emotion/react';

const colors = {
    default: '#06132B',
    subdued: '#4C596B',
};

const textStyle = ({
    align,
    color,
    size,
    weight,
    numberOfLines,
}: Omit<TextProps, 'children'>): SerializedStyles =>
    css({
        fontSize: size,
        fontWeight: weight,
        ...(align && {
            textAlign: align,
        }),
        ...(color && {
            color: colors[color],
        }),
        ...(numberOfLines && {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: numberOfLines,
            WebkitBoxOrient: 'vertical',
        }),
        '@media (hover: hover)': {
            '&:hover .tooltip': {
                visibility: 'visible',
                opacity: 1,
                transform: 'translateY(0)',
            },
        },
    });

const tooltipStyle = css({
    position: 'fixed',
    color: colors.default,
    backgroundColor: '#fff',
    padding: '5px 8px',
    marginLeft: '16px',
    borderRadius: '4px',
    fontSize: '14px',
    textAlign: 'center',
    lineHeight: '18px',
    visibility: 'hidden',
    opacity: 0,
    transform: 'translateY(5px)',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    boxShadow: '0px 8px 20px 0px rgba(0, 27, 71, 0.24)',
    zIndex: 1000,
    pointerEvents: 'none',
    width: 256,
});

type Weights = 400 | 500 | 600 | 900;

type TextAlignment = 'center' | 'end' | 'justify' | 'left' | 'match-parent' | 'right' | 'start';

type TextProps = {
    align?: TextAlignment;
    color?: keyof typeof colors;
    size?: number;
    weight?: Weights;
    numberOfLines?: number;
    children: ReactNode;
    className?: string;
};

const Text = ({
    align = 'left',
    color = 'default',
    numberOfLines,
    size = 14,
    weight = 400,
    children,
    className,
}: TextProps): ReactElement => {
    const textRef = useRef<HTMLDivElement>(null);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState(0);

    const handleMouseEnter = useCallback<MouseEventHandler<HTMLDivElement>>((): void => {
        const textElement = textRef.current;

        if (textElement) {
            const isOverflowing =
                textElement.scrollHeight > textElement.clientHeight ||
                textElement.scrollWidth > textElement.clientWidth;

            setIsTooltipVisible(isOverflowing);

            if (isOverflowing) {
                const rect = textElement.getBoundingClientRect();
                setTooltipPosition(rect.top + rect.height / 2);
            }
        }
    }, []);

    if (!numberOfLines) {
        return (
            <span
                css={textStyle({ align, color, numberOfLines, size, weight })}
                className={className}
            >
                {children}
            </span>
        );
    }

    return (
        <span
            css={textStyle({ align, color, numberOfLines, size, weight })}
            ref={textRef}
            onMouseEnter={handleMouseEnter}
            className={className}
        >
            {children}
            {isTooltipVisible && (
                <div css={[tooltipStyle, { top: `${tooltipPosition}px` }]} className="tooltip">
                    {children}
                </div>
            )}
        </span>
    );
};

export default Text;
