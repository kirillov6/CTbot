// Импорт библиотек
const Discord = require('discord.js');    // Discord API
const utils   = require('./utils/utils'); // Вспомогательные функции

// Инициализируем переменные среды
require('dotenv').config();

// Создание объекта-клиента
const Client = new Discord.Client();
Client.commands = new Discord.Collection();

// Подключение всех обработчиков событий
utils.LoadEvents(Client);

// Заполнение коллекции команд
utils.FillCommands(Client.commands);

// Подключение к серверу
Client.login(process.env.DISCORD_TOKEN);