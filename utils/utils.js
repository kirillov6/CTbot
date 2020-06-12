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

    // Определить аргументы для команды Poll
    GetPollArgs: function(message) {

        let args = message.content.match(/"(\\.|[^"\\])*"/g); // Регулярное выражние - берем все подстроки в кавычках

        // Удаление кавычек из аргументов
        args.forEach(function(part, index) {
            args[index] = args[index].replace(/"/g, '');
        });

        return args;
    },

    // Проверить варианты ответов голосования
    CheckPollEmptyAnswers: function(answers) {

        let notEmptyCount = 0;

        // Удаление пустых ответов
        answers.forEach(function(part, index, object) {
            if (part.length)
                notEmptyCount++;
        });

        return notEmptyCount;
    },
}
