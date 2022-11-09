import { 
    Discord,
    SimpleCommand,
    SimpleCommandMessage,
    Client,
    SimpleCommandOption
} from 'discordx';

import { Str } from "../utils/consts";
import { Helpers } from "../utils/helpers";
import fs = require('fs');

const { prefix } = require('../config.json');


interface HelpCommand {
    Format: number,
    UseCases: string[];
}

@Discord()
export abstract class Help {
    @SimpleCommand("help")
    help(
        @SimpleCommandOption("cmd", { type: "STRING" }) cmd: string | undefined,
        command: SimpleCommandMessage, client: Client
    ) {
        const simpleCommands = client.simpleCommands;
        
        if (cmd) {
            const simpleCommand = simpleCommands.find(val => val.name === cmd);
            if (!simpleCommand)
                return Helpers.msgReplyAndDelete(command.message, Str.COMMAND_NOT_SUPPORT);
            
            let commandInfo = `**${prefix}${simpleCommand.name}** - ${simpleCommand.description}\n`;

            const commandsHelp = <HelpCommand[]>JSON.parse(fs.readFileSync(`${__dirname}/../res/json/help.json`).toString());
            for (let key in commandsHelp) {
                if (commandsHelp.hasOwnProperty(key) && key == simpleCommand.name) {
                    let cmdHelp = commandsHelp[key];
                    commandInfo += `Формат: ${prefix}${cmdHelp.Format}\nПримеры использования:\n`;
                    cmdHelp.UseCases.forEach(uc => commandInfo += `\t* ${prefix}${uc}\n`);

                    command.message.channel.send(commandInfo);
                    return;
                }
            }

            commandInfo += `Формат: ${prefix}${simpleCommand.name}\nПример использования: ${prefix}${simpleCommand.name}`;

            command.message.channel.send(commandInfo);
        } else {
            let commandsInfo = "Список доступных команд:\n";

            simpleCommands.forEach(sc => {
                if (sc.name != "help")
                    commandsInfo += `**${prefix}${sc.name}** - ${sc.description}\n`;
            });

            commandsInfo += `\nДля подробной информации о команде используйте *${prefix}help {команда}*`

            command.message.channel.send(commandsInfo);
        }
    }
}