import { ActivityTypes } from 'discord.js/typings/enums';
import { Client, Discord, On } from 'discordx';
import { Consts } from '../utils/const.js';

@Discord()
export abstract class Ready {
    @On('ready')
    private onReady(client: Client) {
        //console.log(`Logged in as ${client.user.tag}!`);

        // Установка активности
        //client.user.setActivity(Consts.Str.BOT_ACTIVITY, { type: ActivityTypes.WATCHING });
    }
}