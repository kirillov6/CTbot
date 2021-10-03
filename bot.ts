import 'reflect-metadata';
import './AppDiscord';
import { Client } from '@typeit/discord';

// Инициализируем переменные среды
require('dotenv').config();

async function run() {
    // Создание объекта-клиента
    const client = new Client({
        classes: [
            `${__dirname}/*Discord.ts`,
            `${__dirname}/*Discord.js` // После компиляции расширение .ts сменится на .js
        ],
        variablesChar: ":"  // Префикс для переменных в декораторах
    });

    // Подключение к серверу
    await client.login(process.env.DISCORD_TOKEN);
}

// Запуск бота
run();