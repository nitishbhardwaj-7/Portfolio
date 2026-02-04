import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { trans, translationsEmitter } from '../helpers/translations';
import { parseMarkdown, sanitizeLinkifyAndEmojifyString } from '../helpers/ui';

const TranslationAsFunction = (props) => {
    const translations = props.values.reduce(
        (acc, translationKey) => ({
            ...acc,
            [translationKey]: trans(translationKey),
        }),
        {},
    );
    return props.render(translations);
};

TranslationAsFunction.propTypes = {
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    render: PropTypes.func.isRequired,
};

const Translation = (props) => {
    const { value, children, replacements, fallback, linkify, emojify, markdownify } = props;
    const [, forceUpdate] = useState(0);

    const handleTranslationsChanged = () => {
        forceUpdate((temp) => !temp);
    };

    useEffect(() => {
        translationsEmitter.on('translationsChanged', handleTranslationsChanged);

        return () => {
            translationsEmitter.off('translationsChanged', handleTranslationsChanged);
        };
    }, []);

    if (children) {
        return <TranslationAsFunction values={value} render={children} />;
    }

    if (replacements) {
        return <>{trans(value, replacements, fallback)}</>;
    }

    if (markdownify) {
        return (
            <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: parseMarkdown(trans(value, null, fallback)),
                }}
            />
        );
    }

    if (linkify || emojify) {
        return (
            <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: sanitizeLinkifyAndEmojifyString(trans(value, null, fallback)),
                }}
            />
        );
    }

    return <>{trans(value, null, fallback)}</>;
};

Translation.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    replacements: PropTypes.object,
    fallback: PropTypes.string,
    emojify: PropTypes.bool,
    linkify: PropTypes.bool,
    markdownify: PropTypes.bool,
    children: PropTypes.func,
};

Translation.defaultProps = {
    fallback: null,
    replacements: null,
    emojify: false,
    linkify: false,
    markdownify: false,
    children: undefined,
};

export default Translation;
