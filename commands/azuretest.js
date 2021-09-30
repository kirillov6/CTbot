// Команда !azuretest

// Импорт
azdev = require('azure-devops-node-api');

module.exports = {
    name: 'azuretest',
    description: '',
    turnedOn: false,     // Включить/Выключить доступность команды
    args: false,        // Есть ли аргументы
    min_args: 1,        // Минимальное количество аргументов
    max_args: 1,        // Максимальное количество аргументов

    async execute(message, args) {
        
        let url = 'https://tfsprod.fsight.ru/Foresight';
        let token = process.env.AZURE_TOKEN;

        let authHandler = azdev.getPersonalAccessTokenHandler(token);
        let connection = new azdev.WebApi(url, authHandler);

        let connData = await connection.connect();
        message.channel.send(`Hello ${connData.authenticatedUser.providerDisplayName}`);
    }
};