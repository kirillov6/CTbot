// Команда !repo отвечает за получение информации о репозитории

// Импорт
const path    = require('../utils/path');
const Discord = require('discord.js');
const FS      = require('fs');


module.exports = {
    name: 'repo',
    description: 'Получить информацию о репозитории',
    turnedOn: true,   // Включить/Выключить доступность команды
    args: false,     // Есть ли аргументы

    execute(message, args) {
        
        // Получим данные из файла
        let RepoInfo = JSON.parse(FS.readFileSync(path.REPO));

        // Создадим блок с информацией
        const repoEmbed = new Discord.MessageEmbed()
            .setColor('#F59E42')
            .setTitle('Информация о репозитории')
            .setTimestamp();

        // Добавим поля в блок
        repoEmbed.addFields(
            {
                name: '**БД**',
                value: RepoInfo.Database
            },
            {
                name: '**Сервер**',
                value: RepoInfo.Server
            },
            {
                name: '**Логин**',
                value: RepoInfo.Login
            },
            {
                name: '**Пароль**',
                value: RepoInfo.Password
            }
        );

        // Добавим чек "Учитывать регистр"
        if (RepoInfo.CheckRegister)
            repoEmbed.addField('Чек "Учитывать регистр"', '✅');
        else
            repoEmbed.addField('Чек "Учитывать регистр"', '⛔️');

        // Отправим на канал
        message.channel.send({embed: repoEmbed});
    }
};