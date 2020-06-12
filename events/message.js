//Обработчик события - получение сообщения

// Импорт
const { prefix } = require('../config/config.json');
const str        = require('../utils/str');
const utils      = require('../utils/utils');


module.exports = (Client, message) => {
    // Проверка сообщения на валидность
    if (!message.content.startsWith(prefix) || message.author.bot) 
        return;

    // Получение всех аргументов сообщения (включая саму команду)
    var args = message.content.slice(prefix.length).split(/ +/);

    // Получение команды в нижнем регистре (при этом она удаляется из списка всех аргументов)
    const command = args.shift().toLowerCase();

    // Проверка, поддерживается ли такая команда
    if (!Client.commands.has(command)) {
        message.reply(str.COMMAND_NOT_SUPPORT);
        return;
    }

    // Для команды POLL переопределим аргументы, т.к. там аргументы в кавычках
    if (command === 'poll' && args.length) {
        args = utils.GetPollArgs(message);
    };
    
    // Выполнение команды
    try {
        Client.commands.get(command).execute(message, args);
    } 
    catch (error) {
        console.error(error);
        message.reply(COMMAND_ERROR);
    }
};