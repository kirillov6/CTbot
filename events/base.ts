import {
    Discord,
    On,
    Once,
    ArgsOf,
    Client,
    Guard
} from "discordx";

import { ActivityTypes } from "discord.js/typings/enums";
import { Str } from "../utils/consts";
import { Utils } from "../utils/utils";
import { Prefix } from "../guards/prefix";

const { prefix } = require('../config.json');

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

    @On("interactionCreate")
    onInteractionCreate(
        [interaction]: ArgsOf<"interactionCreate">,
        client: Client
    ) {
        try {
            client.executeInteraction(interaction);
        }
        catch (error) {
            console.error(error);
        }
    }

    @On("messageCreate")
    @Guard(Prefix(prefix))
    onMessageCreate(
        [message]: ArgsOf<"messageCreate">,
        client: Client
    ) {
        const command = message.content.split(/ +/)[0].substring(prefix.length);
        if (client.simpleCommandByName.find(val => val.name === command)) {
            try {
                client.executeCommand(message);
                setTimeout(() => message.delete(), 6000);
            }
            catch (error) {
                console.error(error);
                Utils.msgReplyAndDelete(message, Str.COMMAND_ERROR, 6, true);
            }
        }
        else
            Utils.msgReplyAndDelete(message, Str.COMMAND_NOT_SUPPORT, 6, true);
    }
}