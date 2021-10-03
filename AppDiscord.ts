import * as path from 'path';
import { Consts } from './utils/Const';
import { Utils } from './utils/Utils';

import {
    Discord,
    CommandMessage,
    CommandNotFound,
    Command
} from '@typeit/discord';


const { prefix } = require('./config.json');

@Discord(prefix, {
    import: [
        path.join(__dirname, 'commands', '*.ts'),
        path.join(__dirname, 'events', '*.ts')
    ]
})
export abstract class AppDiscord {
    @CommandNotFound()
    notFound(message: CommandMessage) {
        Utils.msgReplyAndDelete(message, Consts.Str.COMMAND_NOT_SUPPORT);
    }

    @Command("hello") 
    hello() {
        console.log(123);
    }
}