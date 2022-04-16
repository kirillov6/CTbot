import {
    Discord,
    On,
    Once,
    ArgsOf,
    Client
} from "discordx";
import { ActivityTypes } from 'discord.js/typings/enums';
import { Str } from '../utils/consts';

@Discord()
export abstract class BaseEvents {
    @Once("ready")
    onReady(
        []: ArgsOf<"ready">,
        client: Client
    ) {
        client.user.setActivity(Str.BOT_ACTIVITY, { type: ActivityTypes.WATCHING })
        console.log("Bot started");
    }

    @On("messageCreate")
    onMessageCreate(
        [message]: ArgsOf<"messageCreate">,
        client: Client
    ) {
        const msg = message.content.substring(1);
        if (client.simpleCommandByName.find((val) => val.name === msg))
            client.executeCommand(message);
        else
            message.reply(Str.COMMAND_NOT_SUPPORT)
                .then(reply => { setTimeout(() => reply.delete(), 6000)}) // Удалим ответ
                .then(() => { setTimeout(() => message.delete(), 6000)}) // Удалим команду
                .catch(error => { console.log(error); });
    }
}