import 'reflect-metadata';
import { Intents, Message } from 'discord.js';
import { ActivityTypes } from 'discord.js/typings/enums';
import { Client } from 'discordx';
import { importx } from '@discordx/importer';
import { Str } from './utils/consts';

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
    ]
});
  
client.once("ready", async () => {
    await client.user.setActivity(Str.BOT_ACTIVITY, { type: ActivityTypes.WATCHING })

    console.log("Bot started");
});

client.on("messageCreate", (message: Message) => {
    client.executeCommand(message);
});

async function run() {
    // Импортируем все команды и события
    await importx(`${__dirname}/{events,commands}/**/*.{ts,js}`);

    // Подключаемся к серверу
    await client.login(process.env.DISCORD_TOKEN);
}

// Запускаем бота
run();