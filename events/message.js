//Обработчик события - получение сообщения

// Импорт конфига
const { prefix } = require('../config/config.json');

// Получим список всех команд
const ping = require('../commands/ping');


module.exports = (Client, message) => {
    if (message.content.startsWith(`${prefix}ping`)) {
        return ping(message)
    };
};