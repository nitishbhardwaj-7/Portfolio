// eslint-disable-next-line func-names
(function (): void {
    setTimeout(() => {
        // eslint-disable-next-line global-require,import/extensions, @typescript-eslint/no-require-imports
        require('./polyfills.ts');
        // eslint-disable-next-line global-require,import/extensions, @typescript-eslint/no-require-imports
        setTimeout(() => require('./widget.tsx'), 0);
    }, 0);
})();
