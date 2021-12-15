import {
    Command,
    CommandMessage
} from '@typeit/discord';


export abstract class Ping {
    @Command('ping')
    private ping(message: CommandMessage) {
        message.reply('Pong');
    }
}