import { 
    Discord,
    SimpleCommand,
    SimpleCommandMessage
 } from 'discordx';


@Discord()
export abstract class Ping {
    @SimpleCommand('ping', { 
        description: "Отвечает Pong" 
    })
    ping(command: SimpleCommandMessage) {
        command.message.reply('Pong');
    }
}