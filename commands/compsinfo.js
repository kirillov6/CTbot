// Команда !compsinfo отвечает за получение информации о компонентах

// Импорт
const path    = require('../utils/path');
const file    = require('../utils/file');
const Discord = require('discord.js');


module.exports = {
    name: 'compsinfo',
    description: 'Получить информацию о компонентах',
    turnedOn: true,     // Включить/Выключить доступность команды
    args: true,         // Есть ли аргументы
    min_args: 1,        // Минимальное количество аргументов
    max_args: 1,        // Максимальное количество аргументов

    execute(message, args) {
        
        if (args[0] == "ver") {

            var listOfInstructions = {
                "1. Открываем компонент на редактирование:": file.COMPSINFO_VER_1,
                "2. Смотрим версию компонента:": file.COMPSINFO_VER_2,
                "3. Соотносим версию компонента с версией мастера:": file.COMPSINFO_VER_3
            }

            for (var key in listOfInstructions) {
                if (listOfInstructions.hasOwnProperty(key)) {
                    message.channel.send(key, new Discord.MessageAttachment(`${path.IMG}/${listOfInstructions[key]}`));
                }
            }
        }
        else
            return utils.MsgReplyAndDelete(message, str.COMMAND_BADFORMAT_ARGS);
    }
};