// Команда !linstatus отвечает за получение состояния Linux виртуалок

// Импорт
const Discord = require('discord.js');
const path = require('../utils/path');
const FS = require('fs');
const utils = require('../utils/utils');
const config = require('../json/config.json');


module.exports = {
    name: 'linstatus',
    description: 'Получить статус Linux виртуалок',
    args: false,

    execute(message, args) {
        
        // Скачаем файл о статусе занятости из гугл-диска
        utils.DownloadGoogleDriveFile(config.linStatusFileId, path.TMP_LINUXCARS_STATUS);

        // Получим данные о виртуалках из файлов
        let LinuxCars = JSON.parse(FS.readFileSync(path.LINUXCARS));
        let LinuxCarsStatus = JSON.parse(FS.readFileSync(path.TMP_LINUXCARS_STATUS));

        // Создадим блок с информацией
        const linEmbed = new Discord.MessageEmbed()
            .setColor('#DB97D9')
            .setTitle('Состояние виртуалок Linux')
            .setTimestamp();

        // Добавим поля в блок
        for (var key in LinuxCars) {
            if (LinuxCars.hasOwnProperty(key)) {
                let car = LinuxCars[key];
                let currentUser = LinuxCarsStatus[key].CurrentUser;
                let status = "";
                if (currentUser.ID)
                    status = `⛔️ Занята [${currentUser.Name}]`;
                else
                    status = '✅ Свободна';

                linEmbed.addField(`***[${car.ID}] ${car.Type} ${car.Ip}***`, status);
            };
        };

        // Отправим на канал
        message.channel.send({embed: linEmbed});
    }
};