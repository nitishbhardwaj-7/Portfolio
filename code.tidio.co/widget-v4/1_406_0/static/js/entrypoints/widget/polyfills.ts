if (typeof Promise === 'undefined') {
    // Rejection tracking prevents a common issue where React gets into an
    // inconsistent state due to an error, but it gets swallowed by a Promise,
    // and the user has no idea what causes React's erratic future behavior.
    // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
    require('promise/lib/rejection-tracking').enable();
    // eslint-disable-next-line import/extensions, @typescript-eslint/no-require-imports, global-require
    window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('whatwg-fetch');
