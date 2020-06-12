const FS = require('fs'); // File System

// Расположения файлов
const EventsPath = `${process.cwd()}/events`;
const CommandsPath = `${process.cwd()}/commands`;


module.exports = {

    // Подключение всех обработчиков событий
    LoadEvents: function(Client) {
        
        const eventFiles = FS.readdirSync(EventsPath).filter(file => file.endsWith('.js'));

        eventFiles.forEach(file => {
            const eventHandler = require(`${EventsPath}/${file}`); // Файл обработчика
            const eventName = file.split('.')[0]; // Имя обработчика
            Client.on(eventName, (...args) => eventHandler(Client, ...args)); // Подключение обработки события
        });
    },

    // Заполнение коллекции команд
    FillCommands: function(commands) {

        const commandFiles = FS.readdirSync(CommandsPath).filter(file => file.endsWith('.js'));

        commandFiles.forEach(file => {
            const command = require(`${CommandsPath}/${file}`); // Файл команды
	            commands.set(command.name, command); // Добавление команды в коллекцию
        });
    },
}
