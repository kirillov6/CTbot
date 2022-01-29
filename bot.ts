import 'reflect-metadata';
import { Intents, Interaction, Message } from 'discord.js';
import { Client } from 'discordx';
import { dirname, importx } from '@discordx/importer';
import { ActivityTypes } from 'discord.js/typings/enums';

// Инициализируем переменные среды
import('dotenv').then(module => {module.config()});


async function run() {
    // Создаем клиента
    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            //Intents.FLAGS.GUILD_VOICE_STATES,
        ]
    });
      
    client.once("ready", async () => {
        // await client.clearApplicationCommands();

        // await client.initApplicationCommands({
        //     guild: { log: true },
        //     global: { log: true }
        // });

        //await client.initApplicationPermissions(true);

        await client.user.setActivity("asd", { type: ActivityTypes.WATCHING })
    
        console.log("Bot started");
    });
    
    // client.on("interactionCreate", (interaction: Interaction) => {
    //     client.executeInteraction(interaction);
    // });

    client.on("messageCreate", (message: Message) => {
        client.executeCommand(message);
    });

    // Импортируем все команды и события
    await importx(dirname(import.meta.url) + '/{events,commands}/**/*.{ts,js}');

    // Подключаемся к серверу
    await client.login(process.env.DISCORD_TOKEN);
}

// Запускаем бота
run();