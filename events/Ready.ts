//Обработчик события - подключение бота на сервер

import { 
    Client,
    On
} from '@typeit/discord';

import { Consts } from '../utils/Const';


export abstract class Ready {
    @On('ready')
    private onReady(client: Client) {
        console.log(`Logged in as ${client.user.tag}!`);

        // Установка активности
        client.user.setActivity(Consts.Str.BOT_ACTIVITY, { type: Consts.Str.BOT_ACTIVITY_TYPE});
    }
}