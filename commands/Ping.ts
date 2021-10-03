import {
    Command,
    CommandMessage
} from '@typeit/discord';


export abstract class Ping {
    @Command('ping')
    async ping(message: CommandMessage) {
        await message.reply('Pong');
    }
}