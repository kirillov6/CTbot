//Обработчик события - получение сообщения

// Импорт конфига
const { prefix } = require('../config/config.json');


module.exports = (Client, message) => {
    // Проверка сообщения на валидность
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Получение всех аргументов сообщения (включая саму команду)
    const args = message.content.slice(prefix.length).split(/ +/);

    // Получение команды в нижнем регистре (при этом она удаляется из списка всех аргументов)
    const command = args.shift().toLowerCase();

    // Проверка, поддерживается ли такая команда
    if (!Client.commands.has(command)) {
        message.reply('Данная команда не поддерживается');
        return;
    }
    
    // Выполнение команды
    try {
        Client.commands.get(command).execute(message, args);
    } 
    catch (error) {
        console.error(error);
        message.reply('При выполнении команды произошла ошибка!');
    }
};