import * as path from 'path';
import { Consts } from './utils/Const';
import { Utils } from './utils/Utils';

import {
    Discord,
    CommandMessage,
    CommandNotFound,
} from '@typeit/discord';


const { prefix } = require('./config.json');

@Discord(prefix, {
    import: [
        path.join(__dirname, 'commands', '*.[jt]s'),
		path.join(__dirname, 'events', '*.[jt]s')
    ]
})
export abstract class AppDiscord {
    @CommandNotFound()
    private notFound(message: CommandMessage) {
        Utils.msgReplyAndDelete(message, Consts.Str.COMMAND_NOT_SUPPORT);
    }
}