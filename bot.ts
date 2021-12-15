import './AppDiscord';
import { Client } from '@typeit/discord';

// Инициализируем переменные среды
require('dotenv').config();

async function run() {
    // Создание объекта-клиента
    const client = new Client({
        classes: [
			`${__dirname}/*Discord.[jt]s`
		],
		variablesChar: ':'
    });

    // Подключение к серверу
    await client.login(process.env.DISCORD_TOKEN);
}

// Запуск бота
run();