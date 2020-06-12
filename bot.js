// Импорт библиотек
const Discord = require('discord.js');    // Discord API
const Utils   = require('./utils/utils'); // Вспомогательные функции

// Импорт конфига
const { token } = require('./config/config.json');

// Создание объекта-клиента
const Client = new Discord.Client();
Client.commands = new Discord.Collection();


// Подключение всех обработчиков событий
Utils.LoadEvents(Client);

// Заполнение коллекции команд
Utils.FillCommands(Client.commands);


// Подключение к серверу
Client.login(token);