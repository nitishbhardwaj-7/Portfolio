import React from 'react';

import { transformOperatorAvatarUrl } from '../helpers';

const getOperatorStyles = (
    avatarSrc?: string | null,
    size?: 32 | 36,
    withBackgroundColor?: boolean,
): React.CSSProperties => {
    const styles: React.CSSProperties = size ? { width: size, height: size } : {};

    if (avatarSrc) {
        styles.backgroundImage = `url(${transformOperatorAvatarUrl(avatarSrc)})`;

        if (withBackgroundColor) {
            styles.borderRadius = '4px';
            styles.backgroundColor = 'var(--custom-background)';
        }
    }

    return styles;
};

type OperatorProps = {
    avatarSrc?: string | null;
    className?: string;
    size?: 32 | 36;
    withBackgroundColor?: boolean;
};

const Operator = ({
    avatarSrc,
    className,
    size,
    withBackgroundColor,
}: OperatorProps): React.ReactElement => (
    <div
        data-testid="operator"
        className={className || undefined}
        style={getOperatorStyles(avatarSrc, size, withBackgroundColor)}
    />
);

export default React.memo(Operator);
