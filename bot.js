// Импорт библиотек и конфига
const Discord = require('discord.js');
const Config = require('./config.json');

// Создание экземпляра клиента
const Client = new Discord.Client();


// Обработчик события - подключение клиента на сервер
Client.on('ready', () => {
    console.log(`Logged in as ${Client.user.tag}!`);
});


// Обработчик события - отправка сообщений
Client.on('message', message => {
	if (message.content === `${Config.prefix}ping`) {
        message.channel.send('Pong');
    }
});


// Подключение к серверу
Client.login(Config.token);