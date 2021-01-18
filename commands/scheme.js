// Команда !scheme отвечает за получение схемы работы при отсутствии задач

// Импорт
const path    = require('../utils/path');
const file    = require('../utils/file');
const Discord = require('discord.js');


module.exports = {
    name: 'scheme',
    description: 'Получить схему работы при отсутствии задач',
    turnedOn: true,   // Включить/Выключить доступность команды
    args: false,     // Есть ли аргументы

    execute(message, args) {
        
        // Создадим вложение
        const attach = new Discord.MessageAttachment(`${path.IMG}/${file.WI_SCHEME}`);

        // Отправим на канал
        message.channel.send(attach);
    }
};