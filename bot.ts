import 'reflect-metadata';
import { Intents } from 'discord.js';
import { Client } from 'discordx';
import { importx } from '@discordx/importer';
import { NotBot } from './guards/NotBot'

// Инициализируем переменные среды
import('dotenv').then(module => {module.config()});

const { prefix } = require('./config.json');

// Создаем клиента
const client = new Client({
    simpleCommand: {
        prefix: prefix
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        //Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    guards: [NotBot]
});

async function run() {
    // Импортируем все команды и события
    await importx(`${__dirname}/{events,commands}/**/*.{ts,js}`);

    // Подключаемся к серверу
    await client.login(process.env.DISCORD_TOKEN);
}

// Запускаем бота
run();