import { Bot, BotData } from './typings';

const filterAndTransformAvailableBots = (bots: BotData[]): Bot[] =>
    bots
        .filter(
            (bot) =>
                bot.type === 'onConversationStart' &&
                bot.payload &&
                (bot.payload.disabled === false || typeof bot.payload.disabled === 'undefined'),
        )
        .sort((valueA, valueB) => {
            if (
                typeof valueA.payload?.position !== 'undefined' &&
                typeof valueB.payload?.position !== 'undefined'
            ) {
                return valueA.payload.position - valueB.payload.position;
            }
            return 0;
        })
        .map(
            (bot): Bot => ({
                triggerId: bot.trigger_id, // automation_trigger_id
                displayName: `${bot.payload?.display_name}`,
                offlineDisabled: Boolean(bot.payload?.offline_disabled),
                botAppIds: bot.payload?.bot_app_ids || [],
            }),
        );
export default filterAndTransformAvailableBots;
