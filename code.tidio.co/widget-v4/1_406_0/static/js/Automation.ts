import { Dispatch } from 'redux';

import { getCurrentUrl } from './helpers';

import { botTrigger } from './store/actions';
import { getKeyFromStorage, saveKeyToStorage } from './store/savedState';
import { BotData } from './store/typings';
import runOnJudgeMeRatingClick from './triggers/runOnJudgeMeRatingClick';
import runOnJudgeMeReviewSent from './triggers/runOnJudgeMeReviewSent';

type BotToTriggerOnScroll = {
    id: number;
    url?: string;
    match?: string;
    scrollPercentage?: number;
};

export default class Automation {
    visitorId: string;

    dispatch: Dispatch;

    projectOnline: boolean;

    hideWhenOffline: boolean;

    isChatOnSite: boolean;

    automations: BotData[];

    botsToTriggerOnScroll: BotToTriggerOnScroll[] = [];

    windowLeft: ReturnType<typeof setTimeout> | undefined;

    constructor(
        // eslint-disable-next-line @typescript-eslint/default-param-last
        automations: BotData[] = [],
        visitorId: string,
        dispatch: Dispatch,
        projectOnline: boolean,
        hideWhenOffline: boolean,
        isChatOnSite: boolean,
    ) {
        this.automations = automations;
        this.visitorId = visitorId;
        this.projectOnline = projectOnline;
        this.hideWhenOffline = hideWhenOffline;
        this.isChatOnSite = isChatOnSite;
        this.inputChanged = this.inputChanged.bind(this);
        this.dispatch = dispatch;
        // eslint-disable-next-line no-console
        console.debug('Automation - initialized with params', this.automations, this.visitorId);
        this.initAutomations(this.automations);
    }

    setVisitorId(visitorId: string): void {
        if (this.visitorId !== visitorId) {
            // eslint-disable-next-line no-console
            console.debug(`Automation - visitorId changed from ${this.visitorId} to ${visitorId}`);
            this.visitorId = visitorId;
        }
    }

    getAutomationData = (triggerId: number): BotData | undefined =>
        this.automations.find((automation) => automation.trigger_id === triggerId);

    filterOfflineAutomations = (automationId: number): boolean => {
        const automation = this.getAutomationData(automationId);
        if (!automation) {
            return false;
        }
        return !automation.payload?.offline_disabled;
    };

    initAutomations(data: BotData[]): void {
        const leaveWindow = [];
        const leaveForm = [];
        let isJudgeMeRatingClickTrigger = false;
        let isJudgeMeReviewSentTrigger = false;

        // Parse socket automations to objects
        for (let i = 0; i < data.length; i += 1) {
            switch (data[i].type) {
                case 'onAbandonedForm':
                    leaveForm.push(data[i].trigger_id);
                    break;
                case 'onPointerLeftWindow':
                    leaveWindow.push(data[i].trigger_id);
                    break;
                case 'onJudgeMeRatingClick':
                    isJudgeMeRatingClickTrigger = true;
                    break;
                case 'onJudgeMeReviewSent':
                    isJudgeMeReviewSentTrigger = true;
                    break;
                case 'onScrollPercentage':
                    this.botsToTriggerOnScroll.push({
                        id: data[i].trigger_id,
                        url: data[i].payload?.url,
                        match: data[i].payload?.match,
                        scrollPercentage: data[i].payload?.percentage,
                    });
                    break;
                default:
                    break;
            }
        }

        /* leaveWindow */
        // TODO: check if this shouldn't reinitiate on status change
        this.runLeaveWindow(leaveWindow);

        this.runLeaveForm(leaveForm);

        this.runScrollWindow();

        if (isJudgeMeRatingClickTrigger) {
            runOnJudgeMeRatingClick(this.dispatch);
        }

        if (isJudgeMeReviewSentTrigger) {
            runOnJudgeMeReviewSent(this.dispatch);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    inputChanged(): void {
        // eslint-disable-next-line no-console
        console.debug('Automation - inputChanged');
        saveKeyToStorage('automation_formLeft', 1);
    }

    runLeaveForm(leaveFormIds: number[]): boolean {
        let ids = leaveFormIds;
        if (!this.projectOnline) {
            ids = leaveFormIds.filter(this.filterOfflineAutomations);
        }
        if (getKeyFromStorage('automation_formLeft') === 1 && ids.length > 0) {
            saveKeyToStorage('automation_formLeft', 0);
            this.execute(ids);
        } else {
            const forms = window.parent.document.querySelectorAll('form');

            for (let i = 0; i < forms.length; i += 1) {
                forms[i].addEventListener('submit', () =>
                    saveKeyToStorage('automation_formLeft', 0),
                );
                const notInputs = forms[i].querySelectorAll('textarea, select');
                for (let j = 0; j < notInputs.length; j += 1) {
                    notInputs[j].addEventListener('change', () => this.inputChanged());
                }
                const inputs = forms[i].querySelectorAll('input');
                for (let j = 0; j < inputs.length; j += 1) {
                    switch (inputs[j].type) {
                        case 'password':
                        case 'file':
                            // dont store its value in the future
                            inputs[j].addEventListener('change', () => this.inputChanged());
                            break;
                        case 'hidden':
                            break;
                        default:
                            inputs[j].addEventListener('change', () => this.inputChanged());
                            break;
                    }
                }
            }
        }
        return true;
    }

    runLeaveWindow(leaveWindowIds: number[]): boolean {
        let ids = leaveWindowIds;
        if (!this.projectOnline) {
            ids = leaveWindowIds.filter(this.filterOfflineAutomations);
        }
        let documentBody = null;
        if (document?.body) {
            documentBody = document.body;
        }
        if (window.parent?.document?.body) {
            documentBody = window.parent.document.body;
        }
        if (documentBody) {
            documentBody.addEventListener('mouseenter', () => {
                if (this.windowLeft) {
                    clearTimeout(this.windowLeft);
                }
            });
            documentBody.addEventListener('mouseout', (event) => {
                const to = event.relatedTarget as Node | null;
                if (!to || to.nodeName === 'HTML') {
                    if (ids.length > 0) {
                        if (this.windowLeft) {
                            clearTimeout(this.windowLeft);
                        }
                        this.windowLeft = setTimeout(() => {
                            this.execute(ids);
                        }, 5000);
                    }
                }
            });
        }
        return true;
    }

    runScrollWindow(): void {
        try {
            if (!this.projectOnline) {
                this.botsToTriggerOnScroll = this.botsToTriggerOnScroll.filter(({ id }) =>
                    this.filterOfflineAutomations(id),
                );
            }

            const parentWindow = window.parent?.window;
            const parentDocument = window.parent?.document;
            let scrollEndTimeout: ReturnType<typeof setTimeout> | undefined;

            const onScrollTriggerHandler = (): void => {
                if (scrollEndTimeout) {
                    clearTimeout(scrollEndTimeout);
                }
                scrollEndTimeout = setTimeout(() => {
                    const scrollTop = parentWindow.scrollY;
                    const docHeight = parentDocument.body.scrollHeight;
                    const winHeight = parentWindow.innerHeight;
                    const currentScrollPercent = (
                        (scrollTop / (docHeight - winHeight)) *
                        100
                    ).toFixed(0);

                    const botsToExecute = [];
                    const botsNotExecuted = [];
                    for (let i = 0; i < this.botsToTriggerOnScroll.length; i += 1) {
                        const currentBot = this.botsToTriggerOnScroll[i];
                        const { scrollPercentage, match, url } = currentBot;
                        let isUrlValid = true;
                        const currentUrl = getCurrentUrl();
                        if (
                            (url && match === 'partial' && currentUrl.indexOf(url) === -1) ||
                            (match === 'exact' && url !== currentUrl)
                        ) {
                            isUrlValid = false;
                        }
                        if (
                            typeof scrollPercentage !== 'undefined' &&
                            parseInt(currentScrollPercent, 10) > scrollPercentage &&
                            isUrlValid
                        ) {
                            botsToExecute.push(currentBot);
                        } else {
                            botsNotExecuted.push(currentBot);
                        }
                    }

                    if (botsToExecute.length) {
                        this.execute(botsToExecute.map(({ id }) => id));
                        this.botsToTriggerOnScroll = botsNotExecuted;
                    }
                    if (!botsNotExecuted.length) {
                        parentWindow.removeEventListener('scroll', onScrollTriggerHandler);
                    }
                }, 100);
            };

            if (parentWindow && parentDocument && this.botsToTriggerOnScroll.length) {
                parentWindow.addEventListener('scroll', onScrollTriggerHandler);
            }
        } catch {
            //
        }
    }

    // execute hook
    execute(ids: number[]): void {
        // stop executing botTrigger when project is offline and widget is hidden
        const shouldTrigger = !(this.hideWhenOffline && !this.projectOnline) || this.isChatOnSite;
        if (shouldTrigger) {
            // eslint-disable-next-line no-console
            console.debug('Automation - execute', ids);
            this.dispatch(botTrigger(ids));
        }
    }
}
