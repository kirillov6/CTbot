// Импорт библиотек
const Discord = require('discord.js'); // Discord API
const FS = require('fs');              // File System

// Импорт конфига
const { token } = require('./config/config.json');

// Создание объекта-клиента
const Client = new Discord.Client();


// Подключение всех обработчиков событий
FS.readdir('./events/', (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`); // Файл обработчика
        const eventName = file.split('.')[0]; // Имя обработчика
        Client.on(eventName, (...args) => eventHandler(Client, ...args)); // Подключение обработки события
    });
});


// Подключение к серверу
Client.login(token);