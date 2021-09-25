// Импорт библиотек
const Discord = require('discord.js');    // Discord API
const path = require('./utils/path');
const fs = require('fs');

// Инициализируем переменные среды
require('dotenv').config();

// Создание объекта-клиента
const Client = new Discord.Client();
Client.commands = new Discord.Collection();

// Подключение всех обработчиков событий
LoadEvents(Client);

// Заполнение коллекции команд
FillCommands(Client.commands);

// Подключение к серверу
Client.login(process.env.DISCORD_TOKEN);


// Подключение всех обработчиков событий
function LoadEvents(Client) {
    const eventFiles = fs.readdirSync(path.EVENTS).filter(file => file.endsWith('.js'));

    eventFiles.forEach(file => {
        const eventHandler = require(`${path.EVENTS}/${file}`); // Файл обработчика
        const eventName = file.split('.')[0]; // Имя обработчика
        Client.on(eventName, (...args) => eventHandler(Client, ...args)); // Подключение обработки события
    });
}

// Заполнение коллекции команд
function FillCommands(commands) {
    const commandFiles = fs.readdirSync(path.COMMANDS).filter(file => file.endsWith('.js'));

    commandFiles.forEach(file => {
        const command = require(`${path.COMMANDS}/${file}`); // Файл команды
        commands.set(command.name, command); // Добавление команды в коллекцию
    });
}