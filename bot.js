// Импорт библиотек
const Discord = require('discord.js');    // Discord API
const utils   = require('./utils/utils'); // Вспомогательные функции
const path    = require('./utils/path'); // Пути

// Импорт конфига
const config = require('./json/config.json');


// Создание объекта-клиента
const Client = new Discord.Client();
Client.commands = new Discord.Collection();

// Подключение всех обработчиков событий
utils.LoadEvents(Client);

// Заполнение коллекции команд
utils.FillCommands(Client.commands);

// Обновим файл со статусом виртуалок
utils.DownloadGoogleDriveFile(config.linStatusFileId, path.TMP_LINUXCARS_STATUS);

// Подключение к серверу
Client.login(config.token);