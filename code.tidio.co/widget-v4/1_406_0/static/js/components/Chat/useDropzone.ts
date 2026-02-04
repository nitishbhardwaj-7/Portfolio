import { useDropzone as useReactDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import uuid from 'uuid';

import { MAX_PENDING_ATTACHMENTS, getOs, isInPreviewMode } from '../../helpers';

import {
    addPendingAttachment,
    setDragAndDropStatus,
    setOptionDropdownVisibility,
} from '../../store/actions';
import {
    getIsDragAndDropActive,
    getIsNewMessageDisabled,
    getNonHiddenMessages,
    isPreChatEnabledButNotFilled,
} from '../../store/selectors';
import { DefaultRootState, FormFieldType } from '../../store/typings';

const osName = getOs().name.toLowerCase();
const isInPreview = isInPreviewMode();

type UseDropzone = {
    dropzoneProps: {
        onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    };
};

const useDropzone = (): UseDropzone => {
    const dispatch = useDispatch();
    const allowAttachments = useSelector((store: DefaultRootState) => store.allowAttachments);
    const pendingAttachments = useSelector((store: DefaultRootState) => store.pendingAttachments);
    const isDragAndDropActive = useSelector(getIsDragAndDropActive);
    const isDropdownVisible = useSelector((store: DefaultRootState) => store.showOptionsDropdown);
    const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
    const newMessageDisabled = useSelector(getIsNewMessageDisabled);
    const messages = useSelector(getNonHiddenMessages);
    const preChatEnabledButNotFilled = useSelector(isPreChatEnabledButNotFilled);
    const isFileInCurrentForm = messages[messages.length - 1]?.form?.some(
        (field) => field.type === FormFieldType.FILE,
    );
    const isAttachmentLimitReached = pendingAttachments.length >= MAX_PENDING_ATTACHMENTS;

    const iOSBlur = (): void => {
        if (isDropdownVisible && isMobile && osName === 'ios') {
            dispatch(setOptionDropdownVisibility(false));
        }
    };

    const { getRootProps } = useReactDropzone({
        onDrop: (files) => {
            if (allowAttachments) {
                const file = files[0];
                dispatch(setDragAndDropStatus(false));
                dispatch(addPendingAttachment(uuid(), file));
            }
        },
        onDragEnter: (): void => {
            if (!isDragAndDropActive) {
                dispatch(setDragAndDropStatus(true));
            }
        },
        onDragLeave: () => {
            dispatch(setDragAndDropStatus(false));
        },
        noClick: true,
        noKeyboard: true,
        disabled:
            !messages.find((el) => el.sender === 'visitor') ||
            isInPreview ||
            newMessageDisabled ||
            preChatEnabledButNotFilled ||
            isFileInCurrentForm ||
            isAttachmentLimitReached ||
            !allowAttachments,
    });

    return {
        // Note: useDropzone manages its own ref. Using a custom ref (e.g., {...dropzoneProps} ref={chatViewRef})
        // on the same element as getRootProps may cause issues like repeated onDragEnter/onDragLeave.
        dropzoneProps: getRootProps({
            onClick: (event) => {
                event.stopPropagation();
                iOSBlur();
            },
        }),
    };
};

export default useDropzone;
