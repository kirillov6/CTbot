import { 
    Discord,
    SimpleCommand,
    SimpleCommandMessage
 } from 'discordx';


@Discord()
export abstract class Ping {
    @SimpleCommand('ping')
    ping(command: SimpleCommandMessage) {
        command.message.reply('Pong');
    }
}