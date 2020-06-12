// Запуск dotenv
require('dotenv').config();

// Импорт библиотек
const Discord = require('discord.js');

// Создание экземпляра клиента
const Client = new Discord.Client();


// Обработчик события - подключение клиента на сервер
Client.on('ready', () => {
    console.log(`Logged in as ${Client.user.tag}!`);
});


// Обработчик события - отправка сообщений
Client.on('message', message => {
	if (message.content === '!ping') {
        message.channel.send('Pong');
    }
});


// Подключение к серверу
Client.login(process.env.DISCORD_TOKEN);