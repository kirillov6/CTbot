// Команда !linstatus отвечает за получение состояния Linux виртуалок

// Импорт
const Discord = require('discord.js');
const path = require('../utils/path');
const FS = require('fs');
const utils = require('../utils/utils');


module.exports = {
    name: 'linstatus',
    description: 'Получить статус Linux виртуалок',
    turnedOn: true,     // Включить/Выключить доступность команды
    args: false,        // Есть ли аргументы

    async execute(message, args) {
        
        // Получим данные о виртуалках из файла
        let LinuxCars = JSON.parse(FS.readFileSync(path.LINUXCARS));

        // Получим данные о состоянии занятости виртуалок из Google-таблицы
        let LinuxCurrentUsers = await utils.GetLinuxAllUsers();

        // Создадим блок с информацией
        const linEmbed = new Discord.MessageEmbed()
            .setColor('#DB97D9')
            .setTitle('Состояние виртуалок Linux')
            .setTimestamp();

        // Добавим поля в блок
        for (var key in LinuxCars) {
            if (LinuxCars.hasOwnProperty(key)) {
                let car = LinuxCars[key];

                let fieldText = "";
                if (car.Addition)
                    fieldText = `**(${car.Addition})**\n`;

                let currentUser = LinuxCurrentUsers[car.ID - 1];
                if (currentUser.userID)
                    fieldText += `⛔️ Занята [${currentUser.userName}]`;
                else
                    fieldText += '✅ Свободна';
                
                linEmbed.addField(`***[${car.ID}] ${car.Type} ${car.Ip}***`, fieldText);
            };
        };

        // Отправим на канал
        message.channel.send({embed: linEmbed});
    }
};