// Команда !lininfo отвечает за получение информации о конкретной Linux виртуалке

// Импорт
const str     = require('../utils/str');
const path    = require('../utils/path');
const utils   = require('../utils/utils');
const Discord = require('discord.js');
const FS      = require('fs');
const { isNull } = require('util');


module.exports = {
    name: 'lininfo',
    description: 'Получить информацию о конкретной Linux виртуалке',
    args: true,
    max_args: 1,

    execute(message, args) {
        
        // Проверим аргумент на корректность
        carID = Number(args[0]);
        if (isNaN(carID))
            return utils.MsgReplyAndDelete(message, str.COMMAND_BADFORMAT_ARGS, 6);
        
        // Найдем виртуалку
        let car = utils.GetLinuxCar(carID);

        // Проверим, есть ли такая виртуалка
        if (isNull(car))
            return utils.MsgReplyAndDelete(message, str.LININFO_BAD_ID, 6);

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
        if (car.Free)
            carEmbed.addField('**Состояние**', 'Свободна');
        else
            carEmbed.addField('**Состояние**', `Занята [${car.CurrentUser}]`);

        // Отправим на канал
        message.channel.send({embed: carEmbed});
    }
};