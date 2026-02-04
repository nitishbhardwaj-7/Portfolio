import { WIDGET_URL, browserNameLowerCase } from './index';

const SOUND_CONFIG = {
    defaultSoundPath: `${WIDGET_URL}/tururu.mp3`,
    newSkinSoundPath: `${WIDGET_URL}/notification-sound.mp3`,
};

const notificationSound = new Audio();
notificationSound.src = SOUND_CONFIG.defaultSoundPath;
notificationSound.volume = 0.7;

export function tryToPlayNotificationSound(isNewSkin: boolean): void {
    if (isNewSkin) {
        notificationSound.src = SOUND_CONFIG.newSkinSoundPath;
    }

    try {
        notificationSound.volume = 0;
        const promise = notificationSound.play();
        if (browserNameLowerCase !== 'firefox') {
            notificationSound.pause();
            if (notificationSound.load) {
                notificationSound.load();
            }
        }
        if (typeof promise !== 'undefined') {
            promise.catch(() => {
                // ravenCaptureInfo('autoplay permissions cannot be granted');
            });
        }
    } catch {
        // INFO: Removed reporting of https://sentry-new.tidio.co/organizations/sentry/issues/184831/
        // ravenCaptureException(e);
    }
}

export function playSound(sound: HTMLAudioElement): void {
    try {
        // eslint-disable-next-line no-param-reassign
        sound.volume = 0.7;
        const promise = sound.play();
        if (typeof promise !== 'undefined') {
            promise.catch(() => {
                // ravenCaptureInfo(
                //     'autoplay permissions not granted yet, notification occurred before user clicked the widget',
                // );
            });
        }
    } catch {
        // INFO: Removed reporting of https://sentry-new.tidio.co/organizations/sentry/issues/184831/
        // ravenCaptureException(e);
    }
}
export function playNotificationSound(isNewSkin: boolean): void {
    if (isNewSkin) {
        notificationSound.src = SOUND_CONFIG.newSkinSoundPath;
    }
    playSound(notificationSound);
}
