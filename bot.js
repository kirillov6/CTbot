"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./AppDiscord");
const discord_1 = require("@typeit/discord");
// Инициализируем переменные среды
require('dotenv').config();
async function run() {
    // Создание объекта-клиента
    const client = new discord_1.Client({
        classes: [
            `${__dirname}/*Discord.ts`,
            `${__dirname}/*Discord.js` // После компиляции расширение .ts сменится на .js
        ],
        variablesChar: ":" // Префикс для переменных в декораторах
    });
    // Подключение к серверу
    await client.login(process.env.DISCORD_TOKEN);
}
// Запуск бота
run();
