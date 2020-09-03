// Команда !lininfo отвечает за получение информации о конкретной Linux виртуалке

// Импорт
const { isNull } = require('util');
const Discord = require('discord.js');
const str = require('../utils/str');
const utils = require('../utils/utils');
const config = require('../json/config.json');
const path = require('../utils/path');


module.exports = {
    name: 'lininfo',
    description: 'Получить информацию о конкретной Linux виртуалке',
    args: true,
    max_args: 1,

    execute(message, args) {
        
        // Проверим аргумент на корректность
        carID = Number(args[0]);
        if (isNaN(carID))
            return utils.MsgReplyAndDelete(message, str.COMMAND_BADFORMAT_ARGS);
        
        // Найдем виртуалку
        let car = utils.GetLinuxCar(args[0], path.LINUXCARS);

        // Проверим, есть ли такая виртуалка
        if (isNull(car))
            return utils.MsgReplyAndDelete(message, str.LININFO_BAD_ID);

        // Скачаем файл о статусе занятости из гугл-диска
        utils.DownloadGoogleDriveFile(config.linStatusFileId, path.TMP_LINUXCARS_STATUS);

        // Получим данные о занятости виртуалки
        let carStatus = utils.GetLinuxCar(args[0], path.TMP_LINUXCARS_STATUS);
        
        // Получим текущего пользователя
        currentUser = carStatus.CurrentUser;

        // Создадим блок с информацией
        const carEmbed = new Discord.MessageEmbed()
            .setColor('#ED685F')
            .setTitle(`**Виртуалка #${carID}**`)
            .setTimestamp();

        // Добавим поля в блок
        carEmbed.addFields(
            {
                name: '**Тип**',
                value: car.Type
            },
            {
                name: '**IP**',
                value: car.Ip
            },
            {
                name: '**Логин**',
                value: car.Login
            },
            {
                name: '**Пароль**',
                value: car.Password
            }
        );

        // Добавим состояние
        if (currentUser.ID)
            carEmbed.addField('**Состояние**', `Занята [${currentUser.Name}]`);
        else
            carEmbed.addField('**Состояние**', 'Свободна');

        // Отправим на канал
        message.channel.send({embed: carEmbed});
    }
};