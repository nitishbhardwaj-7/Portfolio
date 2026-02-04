/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable no-param-reassign */
import React, { ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';

interface ConversationScrollProps {
    conversationRef: HTMLDivElement | null;
    documentRef: Document | ShadowRoot;
    messagesLength: number;
    showOldMessages: boolean;
}

const conversationPadding = 0;

const ConversationScroll = ({
    messagesLength,
    showOldMessages,
    conversationRef,
    documentRef,
}: ConversationScrollProps): ReactElement => {
    const scrollElem = useRef<HTMLDivElement | null>(null);
    const messageWasAdded = useRef(false);
    const animationFrame = useRef<number | null>(null);
    const scrollStartPosition = useRef(0);
    const resizeObserver = useRef<ResizeObserver | null>(null);

    const ownerDocument = useMemo((): Document => {
        if (documentRef && 'host' in documentRef) {
            return documentRef.host.ownerDocument;
        }
        return documentRef;
    }, [documentRef]);

    const bindScroll = (node: HTMLDivElement): boolean => {
        if (!node) {
            return false;
        }
        scrollElem.current = node;

        const { scrollHeight = 0, clientHeight = 0, scrollTop = 0 } = conversationRef || {};
        scrollElem.current.style.top = `${
            ((clientHeight + conversationPadding) * scrollTop) / scrollHeight
        }px`;

        return true;
    };

    const calculateScrollDivHeight = useCallback((): void => {
        const { scrollHeight = 0, clientHeight = 0 } = conversationRef || {};
        const conversationInnerHeight = clientHeight - conversationPadding;

        if (!scrollElem.current) {
            return undefined;
        }

        if (scrollHeight === clientHeight) {
            scrollElem.current.style.height = '0px';
        } else {
            scrollElem.current.style.height = `${
                (conversationInnerHeight * conversationInnerHeight) / +scrollHeight
            }px`;
        }

        return undefined;
    }, [conversationRef]);

    const moveScrollFromMessages = (): void => {
        if (conversationRef) {
            // https://github.com/facebook/react/issues/29106
            // eslint-disable-next-line react-compiler/react-compiler
            conversationRef.onscroll = (): void => {
                let lastMessageOffsetHeight = 0;

                if (!scrollElem.current) {
                    return undefined;
                }

                if (messageWasAdded.current) {
                    const lastMessage = Array.from(
                        ownerDocument.querySelectorAll<HTMLDivElement>('.message'),
                    ).slice(-1)[0];

                    lastMessageOffsetHeight = lastMessage ? lastMessage.offsetHeight : 0;

                    messageWasAdded.current = false;
                }

                scrollElem.current.style.top = `${
                    ((conversationRef.clientHeight - conversationPadding) *
                        conversationRef.scrollTop) /
                    (conversationRef.scrollHeight - lastMessageOffsetHeight)
                }px`;

                return undefined;
            };
        }
    };

    const moveMessagesFromScroll = (scrollValue: number): void => {
        const { scrollHeight = 0, clientHeight = 0 } = conversationRef || {};
        if (conversationRef) {
            conversationRef.scrollTop =
                (scrollHeight * scrollValue) / (clientHeight - conversationPadding);
        }
    };

    const scrollStop = (): void => {
        ownerDocument.onmouseup = null;
        ownerDocument.onmousemove = null;

        if (animationFrame.current) {
            window.cancelAnimationFrame(animationFrame.current);
        }

        moveScrollFromMessages();

        if (scrollElem.current) {
            scrollElem.current.style.width = '';
            scrollElem.current.style.margin = '';
            scrollElem.current.style.opacity = '';
        }
    };

    const scrollMove = (event: MouseEvent): void => {
        animationFrame.current = window.requestAnimationFrame((): void => {
            if (!scrollElem.current) {
                return undefined;
            }

            let { clientHeight = 0 } = conversationRef || {};

            clientHeight -= conversationPadding;
            const scrollMovement = event.clientY - scrollStartPosition.current;
            const scrollNewPosition = parseInt(scrollElem.current.style.top, 10) + scrollMovement;

            if (
                scrollNewPosition >= 0 &&
                scrollNewPosition <= clientHeight - parseInt(scrollElem.current.style.height, 10)
            ) {
                scrollElem.current.style.top = `${scrollNewPosition}px`;
                moveMessagesFromScroll(scrollNewPosition);
            } else if (scrollNewPosition < 0) {
                scrollElem.current.style.top = '0px';
                moveMessagesFromScroll(0);
            } else {
                scrollElem.current.style.top = `${
                    clientHeight - parseInt(scrollElem.current.style.height, 10)
                }px`;
                moveMessagesFromScroll(
                    clientHeight - parseInt(scrollElem.current.style.height, 10),
                );
            }

            ownerDocument.onmouseup = scrollStop;

            scrollStartPosition.current = event.clientY;

            return undefined;
        });
    };

    const handleScrollMove = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (conversationRef) {
            conversationRef.onscroll = null;
        }

        scrollStartPosition.current = event.clientY;

        if (scrollElem.current) {
            scrollElem.current.style.width = '8px';
            scrollElem.current.style.margin = '0px';
            scrollElem.current.style.opacity = '0.32';
        }

        ownerDocument.onmousemove = scrollMove;
        ownerDocument.onmouseup = scrollStop;
    };

    useEffect(() => {
        if (messagesLength) {
            messageWasAdded.current = true;
        }

        calculateScrollDivHeight();
    }, [messagesLength, calculateScrollDivHeight]);

    useEffect(() => {
        calculateScrollDivHeight();
    }, [showOldMessages, calculateScrollDivHeight]);

    useEffect(() => {
        moveScrollFromMessages();
    });

    useEffect(() => {
        if (conversationRef) {
            resizeObserver.current = new ResizeObserver(calculateScrollDivHeight);
            resizeObserver.current.observe(conversationRef);
        }

        return (): void => {
            if (resizeObserver.current) {
                resizeObserver.current.disconnect();
            }
        };
    }, [conversationRef, calculateScrollDivHeight]);

    return (
        <div id="conversation-scroll">
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div onMouseDown={handleScrollMove} ref={bindScroll} />
        </div>
    );
};

export default ConversationScroll;
