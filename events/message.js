//Обработчик события - получение сообщения

// Импорт
const { prefix } = require('../config.json');
const str        = require('../utils/str');
const utils      = require('../utils/utils');


module.exports = async (Client, message) => {
    
    // Проверка сообщения на валидность
    if (!message.content.startsWith(prefix) || message.author.bot) 
        return;

    // Получение всех аргументов сообщения (включая саму команду)
    var args = message.content.slice(prefix.length).split(/ +/);

    // Получение наименования команды в нижнем регистре (при этом она удаляется из списка всех аргументов)
    const commandName = args.shift().toLowerCase();

    // Проверка, поддерживается ли такая команда
    if (!Client.commands.has(commandName))
        return utils.MsgReplyAndDelete(message, str.COMMAND_NOT_SUPPORT);

    // Получение команды
    const command = Client.commands.get(commandName);

    // Если выключена команда, то просто выходим
    if (!command.turnedOn)
        return utils.MsgReplyAndDelete(message, str.COMMAND_NOT_SUPPORT);

    // Для команды POLL переопределим аргументы, т.к. там аргументы в кавычках
    if (commandName === 'poll' && args.length) {
        pollArgs = utils.GetPollArgs(message);
        if (pollArgs)
            args = pollArgs;
        else
            return utils.MsgReplyAndDelete(message, str.COMMAND_BADFORMAT_ARGS);
    }

    // Проверка аргументов
    if (command.args) {
        if (args.length < command.min_args)
            return utils.MsgReplyAndDelete(message, str.COMMAND_NOTENOUGH_ARGS);
        if (args.length > command.max_args)
            return utils.MsgReplyAndDelete(message, str.COMMAND_OVERFLOW_ARGS);
    }
    else {
        if (args.length)
            return utils.MsgReplyAndDelete(message, str.COMMAND_EMPTY_ARGS);
    }
    
    // Выполнение команды
    try {
        await command.execute(message, args); // Выполним
        utils.MsgDelete(message, 6); // Удалим
    } 
    catch (error) {
        console.error(error);
        utils.MsgReplyAndDelete(message, str.COMMAND_ERROR);
    }
};