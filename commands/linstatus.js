// Команда !linstatus отвечает за получение состояния Linux виртуалок

// Импорт
const path    = require('../utils/path');
const Discord = require('discord.js');
const FS      = require('fs');


module.exports = {
    name: 'linstatus',
    description: 'Получить статус Linux виртуалок',
    args: false,

    execute(message, args) {
        
        // Получим данные из файла
        let LinuxCars = JSON.parse(FS.readFileSync(path.LINUXCARS));

        // Создадим блок с информацией
        const linEmbed = new Discord.MessageEmbed()
            .setColor('#DB97D9')
            .setTitle('Состояние виртуалок Linux')
            .setTimestamp();

        // Добавим поля в блок
        for (var key in LinuxCars) {
            if (LinuxCars.hasOwnProperty(key)) {
                let car = LinuxCars[key];
                let status = "";
                if (car.Free)
                    status = '✅ Свободна';
                else
                    status = `⛔️ Занята [${car.CurrentUser}]`;

                linEmbed.addField(`***[${car.ID}] ${car.Type} ${car.Ip}***`, status);
            };
        };

        // Отправим на канал
        message.channel.send({embed: linEmbed});
    }
};