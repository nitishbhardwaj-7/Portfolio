import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SerializedStyles, css } from '@emotion/react';

import { rateChatBot } from '../../store/actions';
import { getIsMobile } from '../../store/selectors';
import { Message } from '../../store/typings';
import Translation from '../Translation';
import { ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '../svgIcons/SvgIcons';

const containerStyle = (isMobile: boolean): SerializedStyles =>
    css({
        position: 'absolute',
        bottom: isMobile ? -37 : -31,
        left: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 260,
    });

const labelStyle = (isMobile: boolean): SerializedStyles =>
    css({
        fontSize: 12,
        marginTop: isMobile ? 6 : 11,
        marginRight: 8,
    });

const actionsStyle = (isMobile: boolean): SerializedStyles => {
    if (isMobile) {
        return css({
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 100,
            height: 48,
        });
    }

    return css({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 7px',
        width: 77,
        height: 40,
        backgroundColor: '#F0F2F7',
        border: '3px solid white',
        borderRadius: 20,
        boxShadow: '0px 3px 8px rgba(0, 18, 46, 0.12)',
        '::before': {
            content: "''",
            position: 'absolute',
            left: 35,
            width: 1,
            height: 20,
            backgroundColor: '#C9D1DD',
        },
    });
};

const buttonStyles = (
    isSelected: boolean,
    isSaved: boolean,
    isMobile: boolean,
): SerializedStyles => {
    if (isMobile) {
        return css({
            outline: 'none',
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: '#F0F2F7',
            boxShadow: '0px 3px 8px 0px rgba(0, 27, 71, 0.08)',
            border: '3px solid white',
            svg: {
                fill: isSelected ? '#ACB8CB' : '#0566ff',
                height: 22,
                width: 22,
            },
        });
    }

    return css({
        position: 'relative',
        cursor: isSaved ? 'initial' : 'pointer',
        outline: 'none',
        '::before': {
            content: "''",
            position: 'absolute',
            backgroundColor: 'rgba(0,125,252,0.12)',
            width: 34,
            height: 34,
            borderRadius: '50%',
            transition: 'all 0.16s ease-in-out',
            transform: 'scale(0)',
            top: 'calc(50% - 17px)',
            left: 'calc(50% - 17px)',
        },
        '&:hover::before': {
            transform: isSaved ? 'scale(0)' : 'scale(1)',
        },
        svg: {
            fill: isSelected ? '#ACB8CB' : '#0566ff',
            height: 20,
            width: 20,
        },
    });
};

type MessageRatingProps = {
    messageId: Message['id'];
    ratingId: Message['ratingId'];
    rating?: Message['rating'];
};

const MessageRating = (props: MessageRatingProps): ReactElement => {
    const dispatch = useDispatch();
    const isMobile = useSelector(getIsMobile);

    const handleClick = (rating: Message['rating']): void => {
        if (!props.rating && props.ratingId) {
            dispatch(rateChatBot(props.messageId, props.ratingId, rating));
        }
    };

    return (
        <div css={containerStyle(isMobile)}>
            <span css={labelStyle(isMobile)}>
                <Translation value="ratingLabel" fallback="Was this helpful?" />
            </span>

            <div css={actionsStyle(isMobile)}>
                <button
                    type="button"
                    aria-label="yes"
                    onClick={(): void => handleClick('yes')}
                    css={buttonStyles(props.rating === 'no', Boolean(props.rating), isMobile)}
                >
                    {props.rating === 'yes' ? <ThumbUp /> : <ThumbUpOutlined />}
                </button>
                <button
                    type="button"
                    aria-label="no"
                    onClick={(): void => handleClick('no')}
                    css={buttonStyles(props.rating === 'yes', Boolean(props.rating), isMobile)}
                >
                    {props.rating === 'no' ? <ThumbDown /> : <ThumbDownOutlined />}
                </button>
            </div>
        </div>
    );
};

export default MessageRating;
